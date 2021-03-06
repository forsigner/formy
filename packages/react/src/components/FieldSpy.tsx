import React, { FC, Fragment, useEffect, useState } from 'react'
import { useFormContext } from '../formContext'
import { FieldSpyProps } from '../types'

export const FieldSpy: FC<FieldSpyProps> = ({ name, children }) => {
  const [, forceUpdate] = useState({})
  const names = Array.isArray(name) ? name : [name]

  const { formStore, getFieldState } = useFormContext()

  useEffect(() => {
    const { data } = formStore

    if (!data.fieldSpyUpdaterMap) data.fieldSpyUpdaterMap = new Map<string[], any>()
    data.fieldSpyUpdaterMap.set(names, forceUpdate)
    return () => {
      data.fieldSpyUpdaterMap.delete(names)
    }
  }, [])

  const states = names.map((name) => getFieldState(name))
  if (!states?.[0]) return null // TODO: don't reutrn null
  return <Fragment>{children(...states)}</Fragment>
}
