import React, { FC, Fragment } from 'react'
import { fim } from '../fim'
import { isNative } from '../utils'
import { useFormContext } from '../formContext'

interface SubmitProps {}

export const Submit: FC<SubmitProps> = ({ children }) => {
  const { handleSubmit } = useFormContext()
  const { Submit } = fim

  if (Submit) {
    return <Submit onSubmit={handleSubmit}>{children}</Submit>
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
