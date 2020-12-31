import React, { useMemo } from 'react'
import { FieldRegisterProps } from '@formy/core'
import { Box, Text } from '@styli/react'

export const Input = (props: FieldRegisterProps) => {
  const { value = '', disabled, label, error, touched, handleChange } = props
  const memoLabel = useMemo(() => label && <Text>{label}</Text>, [label])
  const memoError = useMemo(() => error && touched && <Box red50>{error}</Box>, [touched, error])
  return (
    <Box>
      {memoLabel}
      <input type="text" disabled={disabled} onChange={handleChange} value={value} />
      {memoError}
    </Box>
  )
}
