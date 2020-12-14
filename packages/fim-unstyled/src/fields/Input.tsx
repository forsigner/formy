import React, { FC } from 'react'
import { RegisterFieldProps } from 'fim'
import { View, Text } from '@styli/react'

export const Input: FC<RegisterFieldProps> = ({ fieldState, name, handleChange }) => {
  const { value, error, label } = fieldState

  return (
    <View>
      <Text>{label}</Text>
      <input
        // {...componentProps}
        // type={componentProps.type || 'text'}
        name={name}
        type="text"
        value={value}
        onChange={handleChange}
      />
      {error && <View red>{error}</View>}
    </View>
  )
}
