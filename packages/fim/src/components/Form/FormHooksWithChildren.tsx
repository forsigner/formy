import React, { FC } from 'react'
import { FormProps } from '../../types'
import { formContext } from '../../formContext'
import { DefaultForm } from '../DefaultForm'

export const FormHooksWithChildren: FC<FormProps> = ({ use, children }) => {
  if (!use) return null
  const { Provider } = formContext

  return (
    <Provider value={use}>
      <DefaultForm onSubmit={use.handleSubmit}>{children}</DefaultForm>
    </Provider>
  )
}
