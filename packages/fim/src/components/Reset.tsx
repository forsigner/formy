import React, { FC, Fragment } from 'react'
import { Fim } from '../Fim'
import { isNative } from '../utils'
import { useFormContext } from '../formContext'

interface ResetProps {}

export const Reset: FC<ResetProps> = ({ children }) => {
  const { resetForm } = useFormContext()
  const { ResetComponent } = Fim
  if (ResetComponent) {
    return <ResetComponent resetForm={resetForm}>{children}</ResetComponent>
  }

  if (isNative) {
    return <Fragment>Reset Component Not Register</Fragment>
  }

  return React.createElement(
    'button',
    {
      type: 'reset',
      onClick: resetForm,
    },
    'Reset',
  )
}
