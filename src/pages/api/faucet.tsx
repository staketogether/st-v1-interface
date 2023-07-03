import chainConfig from '@/config/chain'
import axios from 'axios'
import { ethers } from 'ethers'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (
    !process.env.NEXT_PUBLIC_FAUCET_PRIVATE_KEY ||
    !process.env.NEXT_PUBLIC_FAUCET_AMOUNT ||
    !process.env.NEXT_PUBLIC_FAUCET_PASSCODE
  ) {
    return res.status(500).json({ message: 'Faucet is not configured' })
  }

  const chain = chainConfig()
  const correctPasscode = process.env.NEXT_PUBLIC_FAUCET_PASSCODE
  const faucetWallet = new ethers.Wallet(process.env.NEXT_PUBLIC_FAUCET_PRIVATE_KEY, chain.provider)

  const { address, passcode } = req.body

  if (!address) {
    return res.status(400).json({ message: 'Address is required' })
  }

  if (!passcode) {
    return res.status(400).json({ message: 'Passcode is required' })
  }

  if (!ethers.isAddress(address)) {
    return res.status(400).json({ message: 'Invalid address' })
  }

  if (passcode !== correctPasscode) {
    return res.status(400).json({ message: 'Invalid passcode' })
  }

  const hasAlreadySendFaucet = await hasSentEtherToAddress(
    faucetWallet.address,
    address,
    chain.alchemyApiUrl
  )

  if (hasAlreadySendFaucet) {
    return res.status(400).json({ message: 'Address has already received faucet' })
  }

  const transaction = await faucetWallet.sendTransaction({
    to: address,
    value: ethers.parseEther(process.env.NEXT_PUBLIC_FAUCET_AMOUNT)
  })

  return res.status(200).json({ transactionHash: transaction.hash })
}

async function hasSentEtherToAddress(
  senderAddress: string,
  targetAddress: string,
  alchemyApiUrl: string
) {
  const params = {
    id: '1',
    jsonrpc: '2.0',
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromAddress: senderAddress,
        toAddress: targetAddress,
        category: ['external']
      }
    ]
  }

  const response = await axios.post(alchemyApiUrl, params)

  const transactions = response.data.result?.transfers

  return transactions.length > 0
}
