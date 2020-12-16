import React, { FC } from 'react'
import { Form as AntdForm } from 'antd'
import { RegisterFormProps } from 'fim'

export const Form: FC<RegisterFormProps> = (props) => {
  const { handleSubmit, ...rest } = props
  return (
    <AntdForm layout="vertical" {...rest} onFinish={props.handleSubmit as any}>
      {props.children}
    </AntdForm>
  )
}
