import React, { FC } from 'react'
import { Input as AntdInput } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from '@formy/react'

export const Input: FC<FieldRegisterProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdInput></AntdInput>
    </FormItem>
  )
}
