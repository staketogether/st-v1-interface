import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { globalConfig } from '@/config/global'

interface Order {
  amount: number
  formattedAmount: string
  createdAt: string
  expiresAt: string
  id: string
  rune: string
  mempoolTxId?: string
  maker: string
  makerReceiveAddress: string
  makerFeeBps: string
  price: number
  side: 'buy' | 'sell'
  status: string
  unitPrice: number
  formattedUnitPrice: string
}

// GET /api/runes/[symbol]
/*
  Obtain the list of active orders for a specific rune symbol
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
  }

  const { magicEden } = globalConfig
  const { symbol, sort } = req.query

  if (!symbol || Array.isArray(symbol)) {
    res.status(400).json({ message: 'Invalid symbol' })
  }

  const validSorts = ['unitPriceAsc', 'unitPriceDesc', 'createdAtAsc', 'createdAtDesc']

  const { data } = await axios.get<{ orders: Order[] }>(`${magicEden.baseUrl}/ord/btc/runes/orders/${symbol as string}`, {
    params: {
      sort: sort === undefined || Array.isArray(sort) || !validSorts.includes(sort) ? 'unitPriceAsc' : sort,
      side: 'sell',
      offset: 0,
    }
  })

  res.status(200).json(data)
}
