import { NextApiRequest, NextApiResponse } from 'next'
import { globalConfig } from '@/config/global'
import axios from 'axios'

interface BuyRunesData {
  invalidOrders: string[]
  psbtBase64: string
}

// POST /api/runes/buy
/*
  Buy orders for a specific rune symbol
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const { magicEden } = globalConfig
  const { symbol, orderIds, paymentAddress, receiverAddress, publicKey } = req.body

  if (!symbol || Array.isArray(symbol)) {
    res.status(400).json({ message: 'Invalid symbol' })
  }

  if (!paymentAddress || Array.isArray(paymentAddress)) {
    res.status(400).json({ message: 'Invalid amount' })
  }

  if (!receiverAddress || Array.isArray(receiverAddress)) {
    res.status(400).json({ message: 'Invalid wallet' })
  }

  if (!publicKey || Array.isArray(publicKey)) {
    res.status(400).json({ message: 'Invalid wallet' })
  }

  if (orderIds === undefined || !Array.isArray(orderIds) || orderIds.length === 0) {
    res.status(400).json({ message: 'Invalid order IDs' })
  }

  const { data } = await axios.post<BuyRunesData>(`${magicEden.baseUrl}/ord/btc/runes/orders/${symbol as string}`, {
    runeSymbol: symbol,
    orderIds,
    takerPaymentAddress: paymentAddress,
    takerPublicKey: publicKey,
    takerReceiveAddress: receiverAddress,
  })

  res.status(200).json(data)
}