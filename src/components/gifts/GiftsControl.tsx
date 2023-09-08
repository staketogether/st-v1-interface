import React from 'react'

type giftsControlProps = {
  giftId: string
}

export default function GiftsControl({ giftId }: giftsControlProps) {
  return <div>giftsControl{giftId}</div>
}
