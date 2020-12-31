import React, { FC } from 'react'
import { Form as AntdForm } from 'antd'
import { FormRegisterProps } from '@formy/core'

export const Form: FC<FormRegisterProps> = (props) => {
  const { handleSubmit, ...rest } = props
  return (
    <AntdForm layout="vertical" {...rest} onFinish={props.handleSubmit as any}>
      {props.children}
    </AntdForm>
  )
}
