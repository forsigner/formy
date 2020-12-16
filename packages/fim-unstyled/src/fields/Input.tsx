import React from 'react'
import { RegisterFieldProps } from 'fim'
import { View, Text } from '@styli/react'

export const Input = (props: RegisterFieldProps) => {
  const { value, label, error, touched, handleChange, handleBlur } = props
  return (
    <View>
      <Text>{label}</Text>
      <input
        // type={componentProps.type || 'text'}
        name={name}
        type="text"
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && touched && <View red>{error}</View>}
    </View>
  )
}
