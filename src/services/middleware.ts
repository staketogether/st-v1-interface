import { NextApiRequest, NextApiResponse } from 'next'
import { CorsRequest } from 'cors'

type CorsMiddlewareFunction = (req: CorsRequest, res: NextApiResponse, next: (err?: unknown) => unknown) => void

export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: CorsMiddlewareFunction) => {
  fn(req, res, err => {
    if (err) {
      res.status(500).json({ error: 'An error occurred' })
    }
  })
}
