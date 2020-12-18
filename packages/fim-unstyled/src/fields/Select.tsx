import React from 'react'
import { FieldRegisterProps } from 'fim'
import { View, Box } from '@styli/react'

export const Select = (props: FieldRegisterProps) => {
  const { label, error, disabled, touched, options, register } = props
  console.log('options:', options, disabled)
  return (
    <View>
      {label && <Box>{label}</Box>}
      <select disabled={disabled} {...register}>
        {options.map((item, i) => (
          <option key={i + item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {error && touched && <View red>{error}</View>}
    </View>
  )
}
