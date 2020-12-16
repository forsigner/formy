import React from 'react'
import { useField } from 'fim'
import { View, Text } from '@styli/react'

export const Input = ({ name }: any) => {
  const field = useField(name)
  const { value, label, error, touched, handleChange, handleBlur } = field
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
