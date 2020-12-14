import React, { FC } from 'react'
import { RegisterFormProps } from 'fim'

export const Form: FC<RegisterFormProps> = ({ children, handleSubmit }) => {
  return <form onSubmit={handleSubmit}>{children}</form>
}
