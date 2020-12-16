import React, { FC } from 'react'
import { Slider as AntdSlider } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from 'fim'

export const Slider: FC<RegisterFieldProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdSlider value={props.value} onChange={props.handleChange}></AntdSlider>
    </FormItem>
  )
}
