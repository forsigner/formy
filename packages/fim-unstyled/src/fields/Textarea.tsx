import React, { FC } from 'react'
import { View } from '@styli/react'
import { RegisterFieldProps } from 'fim'

export const Textarea: FC<RegisterFieldProps> = ({ field, result, name }) => {
  const { componentProps = {}, label } = field
  const error = result.getError(name)
  const value = result.getValue(name)

  return (
    <div>
      <span>{label}</span>
      <textarea
        {...componentProps}
        value={value}
        onChange={result.createChangeHandler(name)}
      ></textarea>
      {error && <View red>{error}</View>}
    </div>
  )
}
