import React from 'react'
import { FieldRegisterProps } from 'fim'
import { View, Text } from '@styli/react'

export const Input = (props: FieldRegisterProps) => {
  const { value = '', label, error, touched, register } = props
  return (
    <View>
      <Text>{label}</Text>
      <input type="text" {...register} value={value} />
      {error && touched && <View red>{error}</View>}
    </View>
  )
}
