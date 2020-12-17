import React from 'react'
import { FieldRegisterProps } from 'fim'
import { View, Text } from '@styli/react'

export const Input = (props: FieldRegisterProps) => {
  const { value, label, error, touched, handleChange, handleBlur } = props
  return (
    <View>
      <Text>{label}</Text>
      <input type="text" value={value || ''} onChange={handleChange} onBlur={handleBlur} />
      {error && touched && <View red>{error}</View>}
    </View>
  )
}
