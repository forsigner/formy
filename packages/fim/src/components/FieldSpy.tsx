import React, { FC, Fragment } from 'react'
import { FieldSpyProps } from '../types'
import { useField } from '../hooks/useField'

export const FieldSpy: FC<FieldSpyProps> = ({ name, children }) => {
  const names = Array.isArray(name) ? name : [name]
  const states = names.map((i) => useField(i))
  return <Fragment>{children(...states)}</Fragment>
}
