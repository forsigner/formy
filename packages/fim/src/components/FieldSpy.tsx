import React, { FC, Fragment } from 'react'
import { FieldSpyProps } from '../types'
import { useField } from '../hooks/useField'

export const FieldSpy: FC<FieldSpyProps> = ({ name, children }) => {
  const fieldStore = useField(name)
  return <Fragment>{children(fieldStore)}</Fragment>
}
