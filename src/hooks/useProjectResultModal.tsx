import { makeVar, useReactiveVar } from '@apollo/client'
import { useCallback } from 'react'

const reactiveVar = makeVar(false)

export default function useProjectResultModal() {
  const isOpenProjectResultModal = useReactiveVar(reactiveVar)
  const setProjectResultModal = useCallback((value: boolean) => reactiveVar(value), [])
  return { isOpenProjectResultModal, setProjectResultModal }
}
