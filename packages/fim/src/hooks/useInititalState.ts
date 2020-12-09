import { useMemo } from 'react'
import produce from 'immer'
import set from 'lodash.set'
import { entityStore } from '../stores'
import { isEntity } from '../utils/isEntity'
import { fieldStore } from '../stores/fieldStore'
import { Schema, Config, FormState, FieldMetadata, Status, FieldsScheme } from '../types'

let defaultState: FormState = {
  values: {} as any,
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
  name: '',
  entityConfig: {} as any,
}

// TODO: need momoize
export function useInititalState(schema: Schema, config: Config, name: string): FormState {
  return useMemo(() => {
    let state: FormState = defaultState
    if (isEntity(schema)) {
      const { entityConfig } = entityStore.get(schema)
      const instance = new (schema as any)()
      return {
        ...getInitialStateByEntity(instance, config, state),
        entityConfig,
      }
    }

    return {
      ...getInitalStateBySchema(schema as any, state),
      name,
    }
  }, [config, schema])
}

function getInitalStateBySchema(schema: FieldsScheme, state: FormState) {
  return produce(state, (draft) => {
    for (const item of schema as FieldsScheme) {
      const visible = item.visible ?? true
      const { name, transform } = item
      set(draft.values, name, item.value)
      set(draft.visibles, name, visible)
      set(draft.displays, name, item.display)
      set(draft.toucheds, name, item.touched)
      set(draft.disableds, name, item.disabled)
      set(draft.penddings, name, item.pendding)
      set(draft.statuses, name, item.status)
      set(draft.errors, name, item.error)
      set(draft.enums, name, item.enumData)
      set(draft.metas, name, item.field)
      set(draft.datas, name, item.data)
      draft.pathMetadata.push({ path: name, visible, transform })
    }
  })
}

function getInitialStateByEntity<T = any>(instance: T, config: Config, state: FormState) {
  const fields = fieldStore.get(instance)
  const initialState = getStateByEntity(fields, state, '')
  if (config.initValues) {
    initialState.values = config.initValues(state.values)
  }

  return initialState
}

function getStateByEntity(fields: FieldMetadata[], state: FormState, parent = '') {
  for (const field of fields) {
    const name = parent ? `${parent}.${field.name}` : field.name
    if (!field.isRef) {
      const enumData = typeof field.enum === 'function' ? field.enum() : field.enum || []

      set(state.values, name, field.value)
      set(state.visibles, name, field.visible ?? true)
      set(state.displays, name, field.disabled ?? true)
      set(state.toucheds, name, field.touched ?? false)
      set(state.disableds, name, field.disabled ?? false)
      set(state.penddings, name, field.pendding ?? false)
      set(state.statuses, name, field.status ?? 'editable')
      set(state.errors, name, field.error ?? null)
      set(state.enums, name, enumData)
      set(state.metas, name, field)
      set(state.datas, name, field.data ?? null)

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
