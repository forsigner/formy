import React, { FC } from 'react'
import get from 'lodash.get'
import { Form, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { FormItemProps } from 'antd/lib/form'
import { Result, FieldSchema } from 'fim'

interface ItemProps extends FormItemProps {
  name: string
  type?: string
  result: Result
  field: FieldSchema
  children: any // TODO: handle any
}

export const FormItem: FC<ItemProps> = (props) => {
  const { name, children, result, field = {} } = props
  const { createChangeHandler, createBlurHandler, values, visibles, errors, toucheds } = result

  const fieldProps = {} as any

  if (!get(children, 'props.onChange')) {
    fieldProps.onChange = createChangeHandler(name)
  }

  if (!get(children, 'props.onBlur')) {
    fieldProps.onBlur = createBlurHandler(name)
  }

  if (children && !Reflect.has(children.props, 'value')) {
    fieldProps.value = get(values, name)
  }

  const itemProps = { required: field.required } as ItemProps
  if (field.showLabel)
    itemProps.label = (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {field.label}
        {field.description && (
          <>
            &nbsp;
            <Tooltip title={field.description}>
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        )}
      </span>
    )

  const visible = get(visibles, name)

  if (!children || visible === false) return null

  const validateProps = {} as FormItemProps
  const error = get(errors, name)
  const touched = get(toucheds, name)

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
