import React, { FC } from 'react'
import { InputNumber as AntdInputNumber } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from 'fim'

export const InputNumber: FC<FieldRegisterProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdInputNumber></AntdInputNumber>
    </FormItem>
  )
}
