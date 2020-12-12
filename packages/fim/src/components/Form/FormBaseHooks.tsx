import React, { FC } from 'react'
import { Result, FormProps, Schema, FieldSchema } from '../../types'
import { FormField } from './FormField'
import { formContext } from '../../formContext'
import { Submit } from '../Submit'
// import { Reset } from '../Reset'
import { DefaultForm } from '../DefaultForm'

function getJSX(schema: Schema, result: Result, parent: string = '') {
  const keys = Object.keys(schema)
  return keys.map((key) => {
    const name = parent ? `${parent}.${key}` : key
    const item = schema[key] as FieldSchema

    return <FormField key={name} name={name} field={item} result={result}></FormField>

    // if (!key.isRef) {
    //   return (
    //     <EntityField
    //       key={name}
    //       name={name}
    //       field={{ ...key, name }}
    //       result={result}
    //     ></EntityField>
    //   )
    // }

    // const isAry = Array.isArray(key.ref)
    // const Ref = isAry ? key.ref[0] : key.ref
    // const refFields = []
    // const parentName = isAry ? name + '[0]' : name
    // return <Fragment key={key.name}>{getJSX(refFields, result, parentName)}</Fragment>
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
