import GiftEmpty from '@/components/gifts/GiftEmpty'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

export default function Gifts() {
  return (
    <LayoutTemplate>
      <Metatags />
      <GiftEmpty />
    </LayoutTemplate>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common']))
    }
  }
}
