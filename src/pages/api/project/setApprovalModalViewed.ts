import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { projectId }: { projectId: string } = req.body

  if (!projectId) {
    return res.status(400).json({ message: 'sysId not found' })
  }

  try {
    const client = await CreateContentfulClient()

    if (!client) {
      return res.status(400).json({ message: 'client not found' })
    }

    const entry = await client.getEntry(projectId)

    if (!entry) {
      return res.status(400).json({ message: 'project not found' })
    }

    if (!entry.fields?.approvalModalViewed?.['en-US']) {
      entry.fields.approvalModalViewed = { 'en-US': true }
      const updateEntry = await entry.update()
      await updateEntry.publish()
      return res.status(200).send(`Project updated success`)
    } else {
      return res.status(200).send(`project has already viewed the modal`)
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }
}
