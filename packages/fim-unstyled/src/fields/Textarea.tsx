import React from 'react'
import { View } from '@styli/react'
import { FieldRegisterProps } from 'fim'

export const Textarea = (props: FieldRegisterProps) => {
  const { value, label, error, touched, handleChange, handleBlur } = props

  return (
    <div>
      <span>{label}</span>
      <textarea name={name} value={value} onBlur={handleBlur} onChange={handleChange}></textarea>
      {error && touched && <View red>{error}</View>}
    </div>
  )
}
