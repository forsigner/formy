import React, { FC } from 'react'
import { Switch as AntdSwitch } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from '@formy/react'

export const Switch: FC<FieldRegisterProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdSwitch checked={props.value} onChange={props.handleChange}></AntdSwitch>
    </FormItem>
  )
}
