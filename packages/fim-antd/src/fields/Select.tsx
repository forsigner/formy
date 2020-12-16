import React, { FC } from 'react'
import { Select as AntdSelect } from 'antd'
import { FormItem } from '../FormItem'
import { RegisterFieldProps } from 'fim'

const { Option } = AntdSelect

export const Select: FC<RegisterFieldProps> = (props) => {
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
