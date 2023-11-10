import { createClient } from 'contentful-management'

export async function CreateContentfulClient() {
  const contentfulClient = createClient({
    accessToken: `${process.env.NEXT_PUBLIC_CONTENTFUL_CMA_TOKEN}`
  })
  const space = await contentfulClient.getSpace(`${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE}`)
  const env = space.getEnvironment(`${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`)
  return env
}
