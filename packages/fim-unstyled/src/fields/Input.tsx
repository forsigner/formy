import React, { FC } from 'react'
import { RegisterFieldProps } from 'fim'
import { View, Text } from '@styli/react'

export const Input: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {}, label } = field
  const error = result.getError(name)
  const value = result.getValue(name)

  return (
    <View>
      <Text>{label}</Text>
      <input
        {...componentProps}
        type={componentProps.type || 'text'}
        value={value}
        onChange={result.createChangeHandler(name)}
      />
      {error && <View red>{error}</View>}
    </View>
  )
}
