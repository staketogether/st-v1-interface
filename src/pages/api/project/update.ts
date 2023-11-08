import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { form, signatureMessage } = req.body
  const { signature, message } = signatureMessage
  const projectId = form.projectId
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
    res.status(400).json({ message: 'as carteiras não são iguais' })
  }

  // const decodedImage = Buffer.from(form.logo.base64, 'base64')

  // const logoUpload = await client.createAssetFromFiles({
  //   fields: {
  //     title: {
  //       'en-US': `${form.projectName}-logo.${form.logo.mimeType.split('/')[1]}`,
  //       pt: `${form.projectName}-logo.${form.logo.mimeType.split('/')[1]}`
  //     },
  //     description: {
  //       'en-US': '',
  //       pt: ''
  //     },
  //     file: {
  //       'en-US': {
  //         fileName: `${form.projectName}-logo.${form.logo.mimeType.split('/')[1]}`,
  //         file: decodedImage.buffer,
  //         contentType: form.logo.mimeType
  //       }
  //     }
  //   }
  // })

  // const assetLogo = await logoUpload.processForAllLocales().then(res => res.publish())

  const entry = await client.getEntry(projectId)
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
  entry.fields.twitter = { 'en-US': form.twitter, pt: form.twitter }
  entry.fields.instagram = { 'en-US': form.instagram, pt: form.instagram }
  entry.fields.linkedin = { 'en-US': form.linkedin, pt: form.linkedin }
  entry.fields.telegram = { 'en-US': form.telegram, pt: form.telegram }
  entry.fields.email = { 'en-US': form.email, pt: form.email }
  entry.fields.aboutProject = { 'en-US': form.aboutProject, pt: form.aboutProject }
  entry.fields.video = { 'en-US': form.videoEn, pt: form.videoPt }

  const updateEntry = await entry.update()
  await updateEntry.publish()
  res.send(`project updated success`)
}
