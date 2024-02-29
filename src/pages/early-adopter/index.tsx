import EarlyAdopterControl from '@/components/early-adopter/EarlyAdopterControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

export default function Home() {
  return (
    <LayoutTemplate>
      <Metatags />
      <EarlyAdopterControl />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common']))
    }
  }
}
