import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== 'POST') {
  //   return res.json({ message: 'Method not allowed' })
  // }
  const client = await CreateContentfulClient()
  const entry = await client.getEntry('11Wa1puuBxd3nI4kkoMPak')
  console.log(entry.fields)
  entry.fields.name = { 'en-US': 'atualizado' }
  entry.fields.category = {
    'en-US': {
      sys: {
        linkType: 'Entry',
        id: '7n1bl4yPlc2HPZhUbPBaTG'
      }
    }
  }

  await entry.publish()
  res.send('ok')
}
