import React, { FC, Fragment } from 'react'
import { FormStateProps } from '../types'
import { useFormContext } from '../formContext'

export const FormState: FC<FormStateProps> = ({ children }) => {
  const context = useFormContext()
  return <Fragment>{children(context)}</Fragment>
}
