import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { runMiddleware } from '@/services/middleware'
import { ethers } from 'ethers'

const cors = Cors({
  methods: ['POST', 'HEAD']
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors)

  const { form, signatureMessage } = req.body
  const { signature, message } = signatureMessage

  if (!signatureMessage) {
    res.status(400).json({ message: 'signature not found' })
  }

  if (!form) {
    res.status(400).json({ message: 'form not found' })
  }
  const messageBytes = ethers.toUtf8Bytes(message)
  const signatureWallet = ethers.verifyMessage(messageBytes, signature)

  if (signatureWallet.toLocaleLowerCase() != form.wallet.toLocaleLowerCase()) {
    res.status(400).json({ message: 'as carteiras não são iguais' })
  }

  const client = await CreateContentfulClient()
  console.log(form.logo.buffer)
  const imageUpload = await client.createAssetFromFiles({
    fields: {
      title: {
        'en-US': Date.now().toString()
      },
      description: {
        'en-US': ' '
      },
      file: {
        'en-US': {
          fileName: `${Date.now().toString()}.${form.logo.mimeType.split('/')[1]}`,
          file: form.logo.buffer.data,
          contentType: form.logo.mimeType
        }
      }
    }
  })

  const asset = await imageUpload.processForAllLocales().then(res => res.publish())

  try {
    const mandatoryFields = {
      wallet: {
        'en-US': form.wallet.toLocaleLowerCase()
      },
      name: {
        'en-US': form.name
      },
      category: {
        'en-US': {
          sys: {
            linkType: 'Entry',
            id: form.category
          }
        }
      },
      logo: {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: asset.sys.id
          }
        }
      }
    }

    const entry = await client.createEntry('pool', { fields: mandatoryFields })
    await entry.publish()

    res.send(`community created success`)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
