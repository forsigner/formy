import React, { FC } from 'react'
import { FormRegisterProps } from 'fim'

export const Form: FC<FormRegisterProps> = ({ children, handleSubmit }) => {
  return <form onSubmit={handleSubmit}>{children}</form>
}
