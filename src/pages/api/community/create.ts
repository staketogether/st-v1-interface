import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method !== 'POST') {
  //   return res.json({ message: 'Method not allowed' })
  // }
  const client = await CreateContentfulClient()
  console.log('env', client)

  client
  const mandatoryFields = {
    wallet: {
      'en-US': '0x1d930E421dFD2F02BBD9B0c3B877d0eD3FBd1343'
    },
    name: {
      'en-US': 'community-test'
    },
    category: {
      'en-US': {
        sys: {
          linkType: 'Entry',
          id: '2EQwSPqzj0hHe4cAPl7luf'
        }
      }
    }
  }

  const entry = await client.createEntry('pool', { fields: mandatoryFields })
  await entry.publish()
  res.send('ok')
}
