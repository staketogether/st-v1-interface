import GiftsControl from '@/components/gifts/GiftsControl'
import LayoutTemplate from '@/components/shared/layout/LayoutTemplate'
import { Metatags } from '@/components/shared/meta/Metatags'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

type GiftsProps = {
  giftId: string
}

export default function Gifts({ giftId }: GiftsProps) {
  return (
    <LayoutTemplate>
      <Metatags />
      <GiftsControl giftId={giftId} />
    </LayoutTemplate>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const params = context?.params as { giftId: string | null }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'en', ['common'])),
      giftId: params?.giftId || ''
    }
  }
}
