import React, { FC } from 'react'
import { FormRegisterProps } from '@formy/core'

export const Form: FC<FormRegisterProps> = ({ children, handleSubmit }) => {
  return <form onSubmit={handleSubmit}>{children}</form>
}
