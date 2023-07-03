import chainConfig from '@/config/chain'
import { creatorPasscodeConverter } from '@/types/CreatorPasscode'
import { ethers } from 'ethers'
import { firestore } from '../../../firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (!process.env.NEXT_PUBLIC_FAUCET_PRIVATE_KEY) {
    return res.status(500).json({ message: 'Faucet wallet is not configured' })
  }

  const chain = chainConfig()
  const creatorPasscodes = (
    await firestore.collection('creators').withConverter(creatorPasscodeConverter).get()
  ).docs.map(doc => {
    return { id: doc.id, ...doc.data() }
  })

  const faucetWallet = new ethers.Wallet(process.env.NEXT_PUBLIC_FAUCET_PRIVATE_KEY, chain.provider)

  const { address, passcode } = req.body

  const userIp =
    (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || req.socket.remoteAddress

  if (!address) {
    return res.status(400).json({ message: 'Address is required' })
  }

  if (!passcode) {
    return res.status(400).json({ message: 'Passcode is required' })
  }

  if (!ethers.isAddress(address)) {
    return res.status(400).json({ message: 'Invalid address' })
  }

  if (creatorPasscodes.length === 0) {
    return res.status(500).json({ message: 'No passcodes found' })
  }

  const foundPasscode = creatorPasscodes.find(creator => creator.passcode === passcode)

  if (foundPasscode === undefined) {
    return res.status(400).json({ message: 'Invalid passcode' })
  }

  const canSendEth =
    Number(foundPasscode.amountToSend) * foundPasscode.accountsDistributed.length <
    Number(foundPasscode.ethLimit)

  const faucetWalletBalance = await chain.provider.getBalance(faucetWallet.address)

  if (!canSendEth || faucetWalletBalance === 0n) {
    return res.status(400).json({ message: 'Faucet is empty' })
  }

  const hasAlreadySendFaucet = foundPasscode.accountsDistributed.includes(address)

  if (hasAlreadySendFaucet) {
    return res.status(400).json({ message: 'Address has already received faucet' })
  }

  const transaction = await faucetWallet.sendTransaction({
    to: address,
    value: ethers.parseEther(foundPasscode.amountToSend)
  })

  firestore
    .collection('creators')
    .doc(foundPasscode.id)
    .update({
      accountsDistributed: [...foundPasscode.accountsDistributed, address],
      ipsUsed: [...foundPasscode.ipsUsed, userIp]
    })

  return res.status(200).json({ transactionHash: transaction.hash })
}
