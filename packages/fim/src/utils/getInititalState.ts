import set from 'lodash.set'
import { Options, FormState, Status, Schema, FieldSchema } from '../types'
import { isFieldSchema } from '.'

export function getInititalState(formName: string, options: Options): FormState {
  const { schema } = options
  let defaultState: FormState = {
    values: {} as any,
    labels: {},
    components: {},
    componentProps: {},
    toucheds: {},
    disableds: {},
    errors: {},
    visibles: {},
    displays: {},
    statuses: {},
    penddings: {},
    enums: {},
    fieldSchemas: {},
    datas: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    submitted: false,
    validating: false,
    status: 'editable' as Status,
    pathMetadata: [],
    formName,
    validationSchema: options.validationSchema,
    schema,
    options,
  }
  const newState = getStateBySchema(schema as any, defaultState, '')
  return newState
}

function setStateByFieldSchema(state: FormState, name: string, field: FieldSchema) {
  const visible = field.visible ?? true
  const { transform } = field
  set(state.values, name, field.value)
  set(state.visibles, name, field.visible ?? true)
  set(state.labels, name, field.label ?? null)
  set(state.components, name, field.component)
  set(state.componentProps, name, field.componentProps ?? {})
  set(state.displays, name, field.display ?? true)
  set(state.toucheds, name, field.touched ?? false)
  set(state.disableds, name, field.disabled ?? false)
  set(state.penddings, name, field.pendding ?? false)
  set(state.statuses, name, field.status ?? 'editable')
  set(state.enums, name, field.enum ?? [])
  set(state.datas, name, field.data ?? null)
  set(state.fieldSchemas, name, field)
  field.error && set(state.errors, name, field.error)
  state.pathMetadata.push({ path: name, visible, transform })
}

function getStateBySchema(schema: Schema, state: FormState, parentKey = '') {
  for (const key in schema) {
    const currentKey = parentKey ? `${parentKey}.${key}` : key
    const item = schema[key]
    if (Array.isArray(item)) {
      item.forEach((schemaItem, i) => {
        getStateBySchema(schemaItem, state, `${currentKey}[${i}]`)
      })
    } else if (isFieldSchema(item)) {
      setStateByFieldSchema(state, currentKey, item as FieldSchema)
    } else {
      getStateBySchema(item as Schema, state, currentKey)
    }
  }
  return state
}