import React, { FC } from 'react'
import { Slider as AntdSlider } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from 'fim'

export const Slider: FC<RegisterFieldProps> = props => {
  function onChange(value: any) {
    props.result.createChangeHandler(props.name)(value)
  }
  return (
    <FormItem {...props}>
      <AntdSlider value={props.value} onChange={onChange}></AntdSlider>
    </FormItem>
  )
}
