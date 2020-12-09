import React, { FC, Fragment } from 'react'
import { Helper } from '../Helper'
import { isNative } from '../utils'
import { useFormContext } from '../hooks/useFormContext'

interface ResetProps {}

export const Reset: FC<ResetProps> = ({ children }) => {
  const { resetForm } = useFormContext()
  const { ResetComponent } = Helper
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
