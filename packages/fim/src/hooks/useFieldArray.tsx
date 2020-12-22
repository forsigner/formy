import { FieldArrayFieldItem } from '../types'
import get from 'lodash.get'
import { useStore } from 'stook'
import { useFormContext } from '../formContext'

export function useFieldArray(name: string) {
  const { formName, values } = useFormContext()
  const storeKey = `${formName}-${name}`
  const value = get(values, name) as any[]
  const initialState = value.map((item, index) => ({ id: index, item }))
  const [state, setFieldArrayState] = useStore<FieldArrayFieldItem[]>(storeKey, initialState)

  return {
    state,
    setFieldArrayState,
  }
}
