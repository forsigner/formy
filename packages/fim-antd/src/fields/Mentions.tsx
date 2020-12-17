import React, { FC } from 'react'
import { Mentions as AntdMentions } from 'antd'
import { FormItem } from '../FormItem'
import { FieldRegisterProps } from 'fim'

const { Option } = AntdMentions

export const Mentions: FC<FieldRegisterProps> = (props) => {
  return (
    <FormItem {...props}>
      <AntdMentions>
        {props.options.map((item) => (
          <Option key={item.label} value={item.value}>
            {item.label}
          </Option>
        ))}
      </AntdMentions>
    </FormItem>
  )
}
