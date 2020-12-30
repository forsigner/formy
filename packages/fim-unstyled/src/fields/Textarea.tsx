import React from 'react'
import { Box } from '@styli/react'
import { FieldRegisterProps } from 'fim'

export const Textarea = (props: FieldRegisterProps) => {
  const { value = '', disabled, label, error, touched, register } = props

  return (
    <div>
      {label && <Box>{label}</Box>}
      <textarea disabled={disabled} {...register} value={value}></textarea>
      {error && touched && <Box red50>{error}</Box>}
    </div>
  )
}
