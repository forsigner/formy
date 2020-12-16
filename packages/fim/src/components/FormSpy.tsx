import React, { FC, Fragment } from 'react'
import { FormSpyProps } from '../types'
import { useFormContext } from '../formContext'

export const FormSpy: FC<FormSpyProps> = ({ children }) => {
  const context = useFormContext()
  return <Fragment>{children(context)}</Fragment>
}
