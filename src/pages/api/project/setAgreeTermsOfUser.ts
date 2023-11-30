import { CreateContentfulClient } from '@/config/contentful'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { projectId } = req.body

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

    entry.fields.acceptedTermsOfUse = { 'en-US': true }
    const updateEntry = await entry.update()
    await updateEntry.publish()
    return res.status(200).send(`Project updated success`)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }
}
