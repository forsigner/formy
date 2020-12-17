import { FieldArrayFieldItem, FormState } from '../types'
import get from 'lodash.get'
import { getState, useStore } from 'stook'
import { useFormNameContext } from '../formNameContext'

export function useFieldArray(name: string) {
  const formName = useFormNameContext()
  const { initialValues } = getState<FormState>(formName)
  const storeKey = `${formName}-${name}`
  const value = get(initialValues, name) as any[]
  const initialState = value.map((item, index) => ({ id: index, item }))
  const [state, setFieldArrayState] = useStore<FieldArrayFieldItem[]>(storeKey, initialState)

  return {
    state,
    setFieldArrayState,
  }
}
