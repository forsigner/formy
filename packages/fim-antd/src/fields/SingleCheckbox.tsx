import React, { FC } from 'react'
import { Checkbox } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from 'fim'

export const SingleCheckbox: FC<RegisterFieldProps> = (props) => {
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
