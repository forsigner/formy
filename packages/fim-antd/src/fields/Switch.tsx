import React, { FC } from 'react'
import { Switch as AntdSwitch } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from 'fim'

export const Switch: FC<RegisterFieldProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdSwitch checked={props.value} onChange={props.handleChange}></AntdSwitch>
    </FormItem>
  )
}
