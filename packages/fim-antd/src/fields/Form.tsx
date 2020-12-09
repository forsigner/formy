import React, { FC } from 'react'
import { Form as AntdForm } from 'antd'
import { RegisterFormProps } from 'fim'

export const Form: FC<RegisterFormProps> = (props) => {
  const { formProps = {} } = props.result.entityConfig
  return (
    <AntdForm
      layout="vertical"
      {...props}
      {...formProps}
      onFinish={props.result.handleSubmit as any}
    >
      {props.children}
    </AntdForm>
  )
}
