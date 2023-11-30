import { makeVar, useReactiveVar } from '@apollo/client'
import { useCallback } from 'react'

const reactiveVar = makeVar(false)

export default function useConfirmTermsModal() {
  const isOpen = useReactiveVar(reactiveVar)
  const setOpen = useCallback((value: boolean) => reactiveVar(value), [])
  return { isOpen, setOpen }
}
