import React from 'react'
import { FieldRegisterProps } from 'fim'
import { Box } from '@styli/react'

export const Checkbox = (props: FieldRegisterProps) => {
  const { label, error, touched, register } = props

  return (
    <Box>
      <Box left centerY>
        {label && <Box mr-8>{label}</Box>}
        <input type="checkbox" {...register} />
      </Box>

      {error && touched && <Box red>{error}</Box>}
    </Box>
  )
}
