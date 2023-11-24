import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { useWalletAddress } = req.query

  if (!useWalletAddress) {
    res.status(400).json({ message: 'wallet not found' })
  }

  const client = await CreateContentfulClient()

  if (!client) {
    res.status(400).json({ message: 'client not found' })
  }

  const whitelist = await client.getEntries({
    content_type: 'panelWhiteList'
  })

  const isWalletValid = whitelist.items.find(
    wallet => wallet.fields.wallet['en-US'].toLocaleLowerCase() === String(useWalletAddress).toLocaleLowerCase()
  )

  res.status(200).json(!!isWalletValid)
}
