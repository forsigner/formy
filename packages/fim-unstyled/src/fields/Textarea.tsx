import React from 'react'
import { View } from '@styli/react'
import { useField } from 'fim'

export const Textarea = ({ name }: any) => {
  const { value, label, error, handleChange } = useField(name)

  return (
    <div>
      <span>{label}</span>
      <textarea name={name} value={value} onChange={handleChange}></textarea>
      {error && <View red>{error}</View>}
    </div>
  )
}
