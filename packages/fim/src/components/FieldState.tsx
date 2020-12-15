import React, { FC, Fragment } from 'react'
import { FieldStateProps } from '../types'
import { useField } from '../hooks/useField'

export const FieldState: FC<FieldStateProps> = ({ name, children }) => {
  const fieldStore = useField(name)
  return <Fragment>{children(fieldStore)}</Fragment>
}
