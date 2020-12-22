import React, { useMemo } from 'react'
import { FieldRegisterProps } from 'fim'
import { Box } from '@styli/react'

export const Checkbox = (props: FieldRegisterProps) => {
  const { label, error, touched, register } = props

  const memoLabel = useMemo(() => label && <Box mr-8>{label}</Box>, [label])
  const memoError = useMemo(() => error && touched && <Box red>{error}</Box>, [touched, error])
  return (
    <Box>
      <Box left centerY>
        {memoLabel}
        <input type="checkbox" {...register} />
      </Box>
      {memoError}
    </Box>
  )
}
