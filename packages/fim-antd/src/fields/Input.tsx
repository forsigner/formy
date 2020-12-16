import React, { FC } from 'react'
import { Input as AntdInput } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from 'fim'

export const Input: FC<RegisterFieldProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdInput></AntdInput>
    </FormItem>
  )
}
