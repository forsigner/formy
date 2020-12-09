import React, { FC, Fragment } from 'react'
import { Helper } from '../Helper'
import { isNative } from '../utils'
import { useFormContext } from '../hooks/useFormContext'

interface SubmitProps {}

export const Submit: FC<SubmitProps> = ({ children }) => {
  const { handleSubmit } = useFormContext()
  const { SubmitComponent } = Helper

  if (SubmitComponent) {
    return <SubmitComponent onSubmit={handleSubmit}>{children}</SubmitComponent>
  }

  if (isNative) {
    return <Fragment>Submit Component Not Register</Fragment>
  }

  return React.createElement(
    'button',
    {
      type: 'submit',
      onSubmit: handleSubmit,
    },
    'Submit',
  )
}
