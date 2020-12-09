import React, { FC } from 'react'
import { RegisterFormProps } from 'fim'

export const Form: FC<RegisterFormProps> = ({ children, result }) => {
  return <form onSubmit={result.handleSubmit}>{children}</form>
}
