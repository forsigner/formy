import React from 'react'
import { FieldRegisterProps } from 'fim'
import { View, Text } from '@styli/react'

export const Input = (props: FieldRegisterProps) => {
  const { value = '', disabled, label, error, touched, register } = props
  return (
    <View>
      {label && <Text>{label}</Text>}
      <input type="text" disabled={disabled} {...register} value={value} />
      {error && touched && <View red>{error}</View>}
    </View>
  )
}
