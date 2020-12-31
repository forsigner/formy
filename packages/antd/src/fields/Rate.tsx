import React, { FC } from 'react'
import { Rate as AntdRate } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from '@formy/core'

export const Rate: FC<FieldRegisterProps> = props => {
  
  return (
    <FormItem {...props}>
      <AntdRate />
    </FormItem>
  )
}
