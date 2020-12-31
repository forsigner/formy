import React, { FC } from 'react'
import { Checkbox as AntdCheckbox } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from '@formy/core'

const { Group } = AntdCheckbox

export const Checkbox: FC<FieldRegisterProps> = (props) => {
  return (
    <FormItem {...props}>
      <Group value={props.value} onChange={props.handleChange}>
        {props.options.map((item) => (
          <AntdCheckbox key={item.value.toString()} value={item.value}>
            {item.label}
          </AntdCheckbox>
        ))}
      </Group>
    </FormItem>
  )
}
