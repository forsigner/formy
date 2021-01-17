import React, { FC } from 'react'
import { Radio as AntdRadio } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from '@formy/react'

export const Radio: FC<FieldRegisterProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdRadio.Group>
        {props.options.map((item, index) => (
          <AntdRadio key={index} value={item.value}>
            {item.label}
          </AntdRadio>
        ))}
      </AntdRadio.Group>
    </FormItem>
  )
}
