import React, { FC, Fragment } from 'react'
import { FormSpyProps } from '../types'
import { useFormState } from '../hooks/useFormState'
import { useFormContext } from '../formContext'

export const FormSpy: FC<FormSpyProps> = ({ children }) => {
  const context = useFormContext()
  const state = useFormState()
  return <Fragment>{children({ ...state, ...context })}</Fragment>
}
