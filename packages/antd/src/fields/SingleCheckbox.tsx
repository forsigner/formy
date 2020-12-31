import React, { FC } from 'react'
import { Checkbox } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from '@formy/core'

export const SingleCheckbox: FC<FieldRegisterProps> = (props) => {
  function onChange(e: any) {
    const checked = e.target.checked
    props.handleChange(checked)
  }
  return (
    <FormItem {...props}>
      <Checkbox checked={props.value} onChange={onChange}></Checkbox>
    </FormItem>
  )
}
