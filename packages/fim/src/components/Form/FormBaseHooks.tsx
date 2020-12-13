import React, { FC, Fragment } from 'react'
import { Result, FormProps, Schema, FieldSchema } from '../../types'
import { FormField } from './FormField'
import { formContext } from '../../formContext'
import { Submit } from '../Submit'
// import { Reset } from '../Reset'
import { DefaultForm } from '../DefaultForm'
import { isFieldSchema } from '../../utils'

function getJSX(schema: Schema, result: Result, parent: string = '') {
  const keys = Object.keys(schema)
  return keys.map((key) => {
    const name = parent ? `${parent}.${key}` : key
    const item = schema[key] as FieldSchema

    if (Array.isArray(item)) {
      return item.map((schemaItem, i) => (
        <Fragment key={name + i}>{getJSX(schemaItem, result, `${name}[${i}]`)}</Fragment>
      ))
    }

    if (isFieldSchema(item)) {
      return <FormField key={name} name={name} result={result}></FormField>
    }

    return <Fragment key={name}>{getJSX(item, result, name)}</Fragment>
  })
}

export const FormBaseHooks: FC<FormProps> = ({ use }) => {
  if (!use) return null

  const { Provider } = formContext
  const { handleSubmit, schema } = use
  const jsxContent = getJSX(schema, use)

  return (
    <Provider value={use}>
      <DefaultForm onSubmit={handleSubmit}>
        {jsxContent}
        {/* {entityConfig.showResetButton && <Reset></Reset>} */}
        {/* {entityConfig.showSubmitButton && <Submit></Submit>} */}
        <Submit></Submit>
      </DefaultForm>
    </Provider>
  )
}
