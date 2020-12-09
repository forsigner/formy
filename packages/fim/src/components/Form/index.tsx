import React, { FC } from 'react'
import { FormProps } from '../../types'
import { FormBaseEntity } from './FormBaseSchema'
import { FormBaseHooks } from './FormBaseHooks'
import { FormEntityWithChildren } from './FormSchemaWithChildren'
import { FormHooksWithChildren } from './FormHooksWithChildren'

export const Form: FC<FormProps> = (props) => {
  const { use, schema, children, ...rest } = props
  if (use && schema) {
    throw new Error('can only configure one prop: use or entity ')
  }

  // has children
  if (children) {
    if (use) {
      return (
        <FormHooksWithChildren use={use} {...rest}>
          {children}
        </FormHooksWithChildren>
      )
    }
    if (schema) {
      return (
        <FormEntityWithChildren schema={schema} {...rest}>
          {children}
        </FormEntityWithChildren>
      )
    }

    throw new Error('required use or entity props')
  }

  if (use) return <FormBaseHooks use={use} {...rest}></FormBaseHooks>
  if (schema) return <FormBaseEntity schema={schema} {...rest}></FormBaseEntity>
  throw new Error('required use or entity props')
}
