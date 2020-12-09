import React, { FC } from 'react'
import { Switch as AntdSwitch } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from 'fim'

export const Switch: FC<RegisterFieldProps> = props => {
  function onChange(checked: boolean) {
    props.result.createChangeHandler(props.name)(checked)
  }
  return (
    <FormItem {...props}>
      <AntdSwitch checked={props.value} onChange={onChange}></AntdSwitch>
    </FormItem>
  )
}
