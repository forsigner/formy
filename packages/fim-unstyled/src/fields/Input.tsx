import React from 'react'
import { useField } from 'fim'
import { View, Text } from '@styli/react'

export const Input = ({ name }: any) => {
  const field = useField(name)
  const { value, label, error, handleChange } = field
  return (
    <View>
      <Text>{label}</Text>
      <input
        // {...componentProps}
        // type={componentProps.type || 'text'}
        name={name}
        type="text"
        value={value || ''}
        onChange={handleChange}
      />
      {error && <View red>{error}</View>}
    </View>
  )
}
