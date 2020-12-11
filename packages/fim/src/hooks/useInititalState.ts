import { useMemo } from 'react'
import produce from 'immer'
import set from 'lodash.set'
import { isClassSchema } from '../utils'
import { fieldStore } from '../stores/fieldStore'
import { Options, FormState, FieldMetadata, Status, FieldsScheme } from '../types'

// TODO: need momoize
export function useInititalState(options: Options, formName: string): FormState {
  const { schema } = options
  let defaultState: FormState = {
    values: {} as any,
    labals: {},
    components: {},
    toucheds: {},
    disableds: {},
    errors: {},
    visibles: {},
    displays: {},
    statuses: {},
    penddings: {},
    enums: {},
    metas: {},
    datas: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    validating: false,
    status: 'editable' as Status,
    pathMetadata: [],
    formName,
    validationSchema: options.validationSchema,
    schema,
    options,
  }
  return useMemo(() => {
    let state: FormState = defaultState
    if (isClassSchema(schema)) {
      const instance = new (schema as any)()
      return getInitialStateByEntity(instance, options, state)
    }

    return getInitalStateBySchema(schema as any, state)
  }, [options, schema])
}

function getInitalStateBySchema(schema: FieldsScheme, state: FormState) {
  return produce(state, (draft) => {
    for (const item of schema as FieldsScheme) {
      const visible = item.visible ?? true
      const { name, transform } = item
      set(draft.values, name, item.value)
      set(draft.visibles, name, item.visible ?? true)
      set(draft.labals, name, item.label ?? null)
      set(draft.components, name, item.component)
      set(draft.displays, name, item.display ?? true)
      set(draft.toucheds, name, item.touched ?? false)
      set(draft.disableds, name, item.disabled ?? false)
      set(draft.penddings, name, item.pendding ?? false)
      set(draft.statuses, name, item.status ?? 'editable')
      set(draft.enums, name, item.enumData ?? [])
      set(draft.datas, name, item.data ?? null)
      set(draft.metas, name, item.field)
      item.error && set(draft.errors, name, item.error)

      draft.pathMetadata.push({ path: name, visible, transform })
    }
  })
}

function getInitialStateByEntity<T = any>(instance: T, options: Options, state: FormState) {
  const fields = fieldStore.get(instance)
  const initialState = getStateByEntity(fields, state, '')
  if (options.initValues) {
    initialState.values = options.initValues(state.values)
  }

  return initialState
}

function getStateByEntity(fields: FieldMetadata[], state: FormState, parent = '') {
  for (const field of fields) {
    const name = parent ? `${parent}.${field.name}` : field.name
    if (!field.isRef) {
      const enumData = typeof field.enum === 'function' ? field.enum() : field.enum || []

      set(state.values, name, field.value)
      set(state.labals, name, field.label ?? null)
      set(state.components, name, field.component)
      set(state.visibles, name, field.visible ?? true)
      set(state.displays, name, field.disabled ?? true)
      set(state.toucheds, name, field.touched ?? false)
      set(state.disableds, name, field.disabled ?? false)
      set(state.penddings, name, field.pendding ?? false)
      set(state.statuses, name, field.status ?? 'editable')
      set(state.enums, name, enumData ?? [])
      set(state.datas, name, field.data ?? null)
      set(state.metas, name, field)
      field.error && set(state.errors, name, field.error)

      state.pathMetadata = [
        ...state.pathMetadata,
        {
          path: name,
          visible: field.visible ?? true,
          transform: field.transform,
        },
      ]
      continue
    }

    const isAry = Array.isArray(field.ref)
    const Ref = isAry ? field.ref[0] : field.ref
    const refFields = fieldStore.get(new Ref())
    const parentName = isAry ? name + '[0]' : name
    getStateByEntity(refFields, state, parentName)
  }
  return state
}
