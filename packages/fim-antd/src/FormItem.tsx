import React, { FC } from 'react'
import { Form, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { FormItemProps } from 'antd/lib/form'
import { FieldRegisterProps } from 'fim'
import { getIn } from 'fim-utils'

interface ItemProps extends FieldRegisterProps {
  name: string
  type?: string
}

export const FormItem: FC<ItemProps> = (props) => {
  const { required, value, error, touched, visible, children, handleChange, handleBlur } = props

  const fieldProps = {} as any

  if (!getIn(children, 'props.onChange')) fieldProps.onChange = handleChange

  if (!getIn(children, 'props.onBlur')) fieldProps.onBlur = handleBlur

  if (children) fieldProps.value = value

  const itemProps = { required } as any
  if (props.showLabel)
    itemProps.label = (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {props.label}
        {props.description && (
          <>
            &nbsp;
            <Tooltip title={props.description}>
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        )}
      </span>
    )

  if (!children || visible === false) return null

  const validateProps = {} as FormItemProps

  if (error && touched) {
    validateProps.validateStatus = 'error'
    validateProps.help = error
  }

  if (!error && touched) {
    validateProps.validateStatus = 'success'
    validateProps.hasFeedback = true
  }

  return (
    <Form.Item {...validateProps} {...itemProps}>
      {React.cloneElement(children as any, fieldProps)}
    </Form.Item>
  )
}
