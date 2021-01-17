import React, { FC } from 'react'
import { Select as AntdSelect } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from '@formy/react'

const { Option } = AntdSelect

export const Select: FC<FieldRegisterProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdSelect>
        {props.options.map((item, i) => (
          <Option key={i} value={item.value}>
            {item.label}
          </Option>
        ))}
      </AntdSelect>
    </FormItem>
  )
}
