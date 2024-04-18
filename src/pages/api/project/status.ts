import { CreateContentfulClient } from '@/config/contentful'
import { ethers } from 'ethers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    projectId,
    status,
    signatureMessage
  }: { projectId: string; status: string; signatureMessage: { signature: string; message: string } } = req.body
  const { signature, message } = signatureMessage

  if (!signatureMessage) {
    res.status(400).json({ message: 'signature not found' })
  }

  if (status !== 'approved' && status !== 'rejected') {
    res.status(400).json({ message: 'incorrect status' })
  }

  if (!projectId) {
    res.status(400).json({ message: 'sysId not found' })
  }

  const client = await CreateContentfulClient()

  if (!client) {
    res.status(400).json({ message: 'client not found' })
  }

  const messageBytes = ethers.toUtf8Bytes(message)
  const signatureWallet = ethers.verifyMessage(messageBytes, signature)

  const whitelist = await client.getEntries({
    content_type: 'panelWhiteList'
  })

  const wallet = whitelist.items.find(w => w.fields.wallet['en-US'].toLocaleLowerCase() === signatureWallet.toLocaleLowerCase())

  if (!wallet) {
    res.status(401).json({ message: 'not authorized' })
  }

  const entry = await client.getEntry(projectId)

  entry.fields.status = { 'en-US': status }
  entry.fields.approvalModalViewed = { 'en-US': false }
  const updateEntry = await entry.update()
  const sys = await updateEntry.publish()
  res.status(200).send(`Project updated success ${sys.sys.id} - ${sys.isPublished()}`)
}
