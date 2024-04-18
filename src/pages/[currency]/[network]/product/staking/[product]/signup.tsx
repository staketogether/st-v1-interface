import { ContactForm } from '@/components/contact/contactForm'
import LayoutClean from '@/components/shared/layout/LayoutClean'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function SignUp() {
  return (
    <LayoutClean>
      <ContactForm />
    </LayoutClean>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common']))
    }
  }
}
