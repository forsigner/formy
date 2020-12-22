import { FieldArrayFieldItem, UseFormState } from '../types'
import get from 'lodash.get'
import { getState, useStore } from 'stook'
import { useFormContext } from '../formContext'
import { getFormStateKey } from '../utils'

export function useFieldArray(name: string) {
  const { formName } = useFormContext()
  const key = getFormStateKey(formName)
  const { initialValues } = getState<UseFormState>(key)
  const storeKey = `${formName}-${name}`
  const value = get(initialValues, name) as any[]
  const initialState = value.map((item, index) => ({ id: index, item }))
  const [state, setFieldArrayState] = useStore<FieldArrayFieldItem[]>(storeKey, initialState)

  return {
    state,
    setFieldArrayState,
  }
}
