import React, { FC } from 'react'
import { DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import { FieldRegisterProps } from '@formy/react'
import { FormItem } from '../FormItem'

export const RangePicker: FC<FieldRegisterProps> = (props) => {
  const { RangePicker } = DatePicker
  const value = props.value.map((i: Date) => moment(i))

  function onChange(value: any) {
    const dateValue = value.map((i: Moment) => i.toDate())
    props.handleChange(dateValue)
  }
  return (
    <FormItem {...props}>
      <RangePicker value={value} onChange={onChange} />
    </FormItem>
  )
}
