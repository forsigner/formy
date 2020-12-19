import React, { FC, Fragment } from 'react'
import { FormSpyProps } from '../types'
import { useFormState } from '../hooks/useFormState'

export const FormSpy: FC<FormSpyProps> = ({ children }) => {
  const state = useFormState()
  return <Fragment>{children(state)}</Fragment>
}
