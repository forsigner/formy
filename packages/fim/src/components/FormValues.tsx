import { Storage } from 'stook'
import React, { FC, Fragment } from 'react'
import { useFormContext } from '../formContext'
import { FieldState } from '../types'
import { useField } from '../hooks/useField'
import set from 'lodash.set'

export const FormValues: FC<any> = ({ children }) => {
  const { formName } = useFormContext()
  const { stores } = Storage
  let keys: string[] = []
  let values: any = {}

  for (const key in stores) {
    if (!key.startsWith(`${formName}-`)) continue
    const { state } = Storage.get<FieldState>(key)
    if (!state.visible) continue
    keys.push(key.replace(`${formName}-`, ''))
  }

  const states = keys.map((i) => useField(i))

  for (const state of states) {
    set(values, state.name, state.value)
  }

  return <Fragment>{children(values)}</Fragment>
}
