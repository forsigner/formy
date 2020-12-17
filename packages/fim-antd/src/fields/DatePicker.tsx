import React, { FC } from 'react'
import { DatePicker as AntdDatePicker } from 'antd'
import { FieldRegisterProps } from 'fim'
import moment from 'moment'
import { FormItem } from '../FormItem'

export const DatePicker: FC<FieldRegisterProps> = (props) => {
  function onChange(value: any) {
    props.handleChange(value.toDate())
  }
  return (
    <FormItem {...props}>
      <AntdDatePicker value={moment(props.value)} onChange={onChange}></AntdDatePicker>
    </FormItem>
  )
}
