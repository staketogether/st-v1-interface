import { CreateContentfulClient } from '@/config/contentful'
import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { form, signatureMessage } = req.body
  const { signature, message }: { signature: string; message: string } = signatureMessage
  const projectId: string = form.projectId
  if (!projectId) {
    res.status(400).json({ message: 'sysId not found' })
  }

  const client = await CreateContentfulClient()

  if (!signatureMessage) {
    res.status(400).json({ message: 'signature not found' })
  }

  if (!form) {
    res.status(400).json({ message: 'form not found' })
  }

  if (!form.projectName) {
    res.status(400).json({ message: 'name not found' })
  }

  if (!form.category) {
    res.status(400).json({ message: 'category not found' })
  }

  const messageBytes = ethers.toUtf8Bytes(message)
  const signatureWallet = ethers.verifyMessage(messageBytes, signature)

  if (signatureWallet.toLocaleLowerCase() != form.wallet.toLocaleLowerCase()) {
    res.status(400).json({ message: 'wallets are not equals' })
  }

  const entry = await client.getEntry(projectId)

  if (form.logo?.base64 && form.logo.mimeType) {
    const decodedImage = Buffer.from(form.logo.base64 as string, 'base64')
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
          }
        }
      }
    })
    const assetLogo = await logoUpload.processForAllLocales().then(r => r.publish())
    entry.fields.logo = {
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
    }
  }

  if (form.cover?.base64 && form.cover.mimeType && !form.videoEn && !form.videoPt) {
    const decodedImage = Buffer.from(form.cover.base64 as string, 'base64')
    const coverUpload = await client.createAssetFromFiles({
      fields: {
        title: {
          'en-US': `${form.projectName}-cover.${form.cover.mimeType.split('/')[1]}`,
          pt: `${form.projectName}-logo.${form.cover.mimeType.split('/')[1]}`
        },
        description: {
          'en-US': '',
          pt: ''
        },
        file: {
          'en-US': {
            fileName: `${form.projectName}-logo.${form.cover.mimeType.split('/')[1]}`,
            file: decodedImage.buffer,
            contentType: form.cover.mimeType
          },
          pt: {
            fileName: `${form.projectName}-logo.${form.cover.mimeType.split('/')[1]}`,
            file: decodedImage.buffer,
            contentType: form.cover.mimeType
          }
        }
      }
    })

    const assetCover = await coverUpload.processForAllLocales().then(r => r.publish())
    entry.fields.cover = {
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: assetCover.sys.id,
          contentType: form.logo.mimeType
        }
      },
      pt: {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: assetCover.sys.id,
          contentType: form.logo.mimeType
        }
      }
    }
    entry.fields.video = { 'en-US': '', pt: '' }
  }
  if (form.removeCover) {
    const assetIdEn: string = entry.fields.cover['en-US'].sys.id

    const asset = await client.getAsset(assetIdEn)
    const assetUnpublish = await asset.unpublish()
    await assetUnpublish.delete()

    entry.fields.cover['en-US'] = null
    entry.fields.cover.pt = null
  }

  if (form.headerCover?.base64 && form.headerCover.mimeType) {
    const decodedImage = Buffer.from(form.headerCover.base64 as string, 'base64')
    const headerCoverUpload = await client.createAssetFromFiles({
      fields: {
        title: {
          'en-US': `${form.projectName}-headerCover.${form.headerCover.mimeType.split('/')[1]}`,
          pt: `${form.projectName}-headerCover.${form.headerCover.mimeType.split('/')[1]}`
        },
        description: {
          'en-US': '',
          pt: ''
        },
        file: {
          'en-US': {
            fileName: `${form.projectName}-img.${form.headerCover.mimeType.split('/')[1]}`,
            file: decodedImage.buffer,
            contentType: form.headerCover.mimeType
          },
          pt: {
            fileName: `${form.projectName}-img.${form.headerCover.mimeType.split('/')[1]}`,
            file: decodedImage.buffer,
            contentType: form.headerCover.mimeType
          }
        }
      }
    })

    const assetHeaderCover = await headerCoverUpload.processForAllLocales().then(r => r.publish())
    entry.fields.image = {
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: assetHeaderCover.sys.id,
          contentType: form.logo.mimeType
        }
      },
      pt: {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: assetHeaderCover.sys.id,
          contentType: form.logo.mimeType
        }
      }
    }
  }

  if (form.removeHeaderCover && entry.fields.image) {
    const assetIdEn: string = entry.fields.image['en-US'].sys.id

    const asset = await client.getAsset(assetIdEn)
    const assetUnpublish = await asset.unpublish()
    await assetUnpublish.delete()

    entry.fields.image['en-US'] = null
    entry.fields.image.pt = null
  }

  entry.fields.name = { 'en-US': form.projectName, pt: form.projectName }
  entry.fields.category = {
    'en-US': {
      sys: {
        linkType: 'Entry',
        id: form.category
      }
    }
  }

  entry.fields.description = { 'en-US': form.descriptionEn, pt: form.descriptionPt }
  entry.fields.site = { 'en-US': form.site, pt: form.site }
  entry.fields.youtube = { 'en-US': form.youtube, pt: form.youtube }
  entry.fields.twitter = { 'en-US': form.twitter, pt: form.twitter }
  entry.fields.instagram = { 'en-US': form.instagram, pt: form.instagram }
  entry.fields.linkedin = { 'en-US': form.linkedin, pt: form.linkedin }
  entry.fields.telegram = { 'en-US': form.telegram, pt: form.telegram }
  if (form.videoEn || form.videoPt) {
    entry.fields.video = { 'en-US': form.videoEn, pt: form.videoPt }
  }

  const updateEntry = await entry.update()
  const publishEntry = await updateEntry.unpublish()
  await publishEntry.publish()
  res.send(`Project updated success`)
}
