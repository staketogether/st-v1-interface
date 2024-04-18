import { CreateContentfulClient } from '@/config/contentful'
import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { form, signatureMessage } = req.body
  const { signature, message } = signatureMessage

  if (!signatureMessage) {
    res.status(400).json({ message: 'signature not found' })
  }

  if (!form) {
    res.status(400).json({ message: 'form not found' })
  }

  if (!form.projectName) {
    res.status(400).json({ message: 'name not found' })
  }

  if (!form.logo.base64) {
    res.status(400).json({ message: 'logo not found' })
  }

  if (!form.category) {
    res.status(400).json({ message: 'category not found' })
  }

  if (!form.aboutProject) {
    res.status(400).json({ message: 'aboutProject not found' })
  }

  const messageBytes = ethers.toUtf8Bytes(message)
  const signatureWallet = ethers.verifyMessage(messageBytes, signature)

  if (signatureWallet.toLocaleLowerCase() != form.wallet.toLocaleLowerCase()) {
    res.status(400).json({ message: 'as carteiras não são iguais' })
  }

  const client = await CreateContentfulClient()
  const decodedImage = Buffer.from(form.logo.base64, 'base64')

  const logoUpload = await client.createAssetFromFiles({
    fields: {
      title: {
        'en-US': `${form.projectName}-logo.${form.logo.mimeType.split('/')[1]}`,
        pt: `${form.projectName}-logo.${form.logo.mimeType.split('/')[1]}`
      },
      description: {
        'en-US': '',
        pt: ''
      },
      file: {
        'en-US': {
          fileName: `${form.projectName}-logo.${form.logo.mimeType.split('/')[1]}`,
          file: decodedImage.buffer,
          contentType: form.logo.mimeType
        },
        pt: {
          fileName: `${form.projectName}-logo.${form.logo.mimeType.split('/')[1]}`,
          file: decodedImage.buffer,
          contentType: form.logo.mimeType
        }
      }
    }
  })

  const assetLogo = await logoUpload.processForAllLocales().then(res => res.publish())

  try {
    const mandatoryFields = {
      wallet: {
        'en-US': form.wallet.toLocaleLowerCase()
      },
      name: {
        'en-US': form.projectName
      },
      logo: {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: assetLogo.sys.id
          }
        },
        pt: {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: assetLogo.sys.id
          }
        }
      },
      category: {
        'en-US': {
          sys: {
            linkType: 'Entry',
            id: form.category
          }
        }
      },
      aboutProject: {
        'en-US': form.aboutProject
      },
      status: {
        'en-US': 'pending'
      },
      email: {
        'en-US': form.email
      },
      site: {
        'en-US': form.site
      },
      twitter: {
        'en-US': form.twitter
      },
      instagram: {
        'en-US': form.instagram
      },
      linkedin: {
        'en-US': form.linkedin
      },
      telegram: {
        'en-US': form.telegram
      },
      acceptedTermsOfUse: {
        'en-US': true
      }
    }

    const entry = await client.createEntry('pool', { fields: mandatoryFields })
    await entry.publish()

    res.send(`community created success`)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
