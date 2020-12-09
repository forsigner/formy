import { useRef } from 'react'
import set from 'lodash.set'
import { entityStore } from '../stores'
import { isEntity } from '../utils/isEntity'
import { fieldStore } from '../stores/fieldStore'
import { Schema, Config, FormState, FieldMetadata, Status, FieldsScheme } from '../types'

let defaultState = {
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
  name: '',
  entityConfig: {} as any,
}

export function useInititalState(entityOrScheme: Schema, config: Config, name: string): FormState {
  let state: FormState = defaultState
  if (isEntity(entityOrScheme)) {
    const { entityConfig } = entityStore.get(entityOrScheme)
    const instance = new (entityOrScheme as any)()
    state = {
      ...getInitialState(instance, config),
      entityConfig,
    }
  } else {
    // TODO: should handle nested
    for (const item of entityOrScheme as FieldsScheme) {
      const { name } = item
      set(state.values, name, item.value)
      set(state.visibles, name, item.visible)
      set(state.displays, name, item.display)
      set(state.toucheds, name, item.touched)
      set(state.disableds, name, item.disabled)
      set(state.penddings, name, item.pendding)
      set(state.statuses, name, item.status)
      set(state.errors, name, item.error)
      set(state.enums, name, item.enumData)
      set(state.metas, name, item.field)
      set(state.datas, name, item.data)
    }
  }
  return {
    ...useRef(state).current,
    name,
  }
}

export function getInitialState<T = any>(instance: T, config: Config) {
  const state: FormState<T> = defaultState
  const fields = fieldStore.get(instance)
  const initialState = getState(fields, state, '')
  if (config.initValues) {
    initialState.values = config.initValues(state.values)
  }

  return initialState
}

function getState(fields: FieldMetadata[], state: FormState, parent = '') {
  for (const field of fields) {
    const name = parent ? `${parent}.${field.name}` : field.name
    if (!field.isRef) {
      const enumData = typeof field.enum === 'function' ? field.enum() : field.enum || []
      const visible = Reflect.has(field, 'visible') ? field.visible : true
      const display = Reflect.has(field, 'display') ? field.display : true
      const touched = Reflect.has(field, 'touched') ? field.touched : false
      const disabled = Reflect.has(field, 'disabled') ? field.disabled : false
      const pendding = Reflect.has(field, 'pendding') ? field.pendding : false
      const status = Reflect.has(field, 'status') ? field.status : 'editable'
      const error = Reflect.has(field, 'error') ? field.error : null
      const data = Reflect.has(field, 'data') ? field.data : null

      set(state.values, name, field.value)
      set(state.visibles, name, visible)
      set(state.displays, name, display)
      set(state.toucheds, name, touched)
      set(state.disableds, name, disabled)
      set(state.penddings, name, pendding)
      set(state.statuses, name, status)
      set(state.errors, name, error)
      set(state.enums, name, enumData)
      set(state.metas, name, field)
      set(state.datas, name, data)
      continue
    }

    const isAry = Array.isArray(field.ref)
    const Ref = isAry ? field.ref[0] : field.ref
    const refFields = fieldStore.get(new Ref())
    const parentName = isAry ? name + '[0]' : name
    getState(refFields, state, parentName)
  }
  return state
}
