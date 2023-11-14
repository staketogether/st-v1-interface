import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { projectId } = req.body

  if (!projectId) {
    res.status(400).json({ message: 'sysId not found' })
  }

  const client = await CreateContentfulClient()

  if (!client) {
    res.status(400).json({ message: 'client not found' })
  }

  const entry = await client.getEntry(projectId)
  console.log(entry)
  if (!entry.fields?.approvalModalViewed || !entry.fields?.approvalModalViewed['en-US']) {
    entry.fields.approvalModalViewed = { 'en-US': true }
    const updateEntry = await entry.update()
    await updateEntry.publish()
    res.send(`Project updated success`)
  }

  res.send(`project has already viewed the modal`)
}
