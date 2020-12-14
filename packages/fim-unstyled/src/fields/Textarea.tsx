import React, { FC } from 'react'
import { View } from '@styli/react'
import { RegisterFieldProps } from 'fim'

export const Textarea: FC<RegisterFieldProps> = ({ fieldState, name, handleChange }) => {
  const { value, error, label } = fieldState

  return (
    <div>
      <span>{label}</span>
      <textarea name={name} value={value} onChange={handleChange}></textarea>
      {error && <View red>{error}</View>}
    </div>
  )
}
