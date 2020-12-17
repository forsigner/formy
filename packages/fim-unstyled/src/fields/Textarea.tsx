import React from 'react'
import { View } from '@styli/react'
import { FieldRegisterProps } from 'fim'

export const Textarea = (props: FieldRegisterProps) => {
  const { value = '', label, error, touched, register } = props

  return (
    <div>
      <span>{label}</span>
      <textarea {...register} value={value}></textarea>
      {error && touched && <View red>{error}</View>}
    </div>
  )
}
