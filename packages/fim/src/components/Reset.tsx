import React, { FC, Fragment } from 'react'
import { fim } from '../fim'
import { isNative } from '../utils'
import { useFormContext } from '../formContext'

interface ResetProps {}

export const Reset: FC<ResetProps> = ({ children }) => {
  const { resetForm } = useFormContext()
  const { Reset } = fim
  if (Reset) {
    return <Reset resetForm={resetForm}>{children}</Reset>
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
