import { useMemo } from 'react'
import produce from 'immer'
import set from 'lodash.set'
import { Options, FormState, Status, Schema, FieldSchema } from '../types'

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

    return getInitalStateBySchema(schema as any, state)
  }, [options, schema])
}

function getInitalStateBySchema(schema: Schema, state: FormState) {
  return produce(state, (draft) => {
    for (const name of Object.keys(schema)) {
      const item = schema[name] as FieldSchema
      const visible = item.visible ?? true
      const { transform } = item
      set(draft.values, name, item.value)
      set(draft.visibles, name, item.visible ?? true)
      set(draft.labals, name, item.label ?? null)
      set(draft.components, name, item.component)
      set(draft.displays, name, item.display ?? true)
      set(draft.toucheds, name, item.touched ?? false)
      set(draft.disableds, name, item.disabled ?? false)
      set(draft.penddings, name, item.pendding ?? false)
      set(draft.statuses, name, item.status ?? 'editable')
      set(draft.enums, name, item.enum ?? [])
      set(draft.datas, name, item.data ?? null)
      set(draft.metas, name, item)
      item.error && set(draft.errors, name, item.error)

      draft.pathMetadata.push({ path: name, visible, transform })
    }
  })
}
