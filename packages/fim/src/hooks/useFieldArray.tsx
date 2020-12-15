import get from 'lodash.get'
import { useStore } from 'stook'
import { useFormContext } from '../formContext'

export function useFieldArray(name: string) {
  const { formName = '', initialValues } = useFormContext()
  const storeKey = `${formName}-${name}`
  const value = get(initialValues, name) as any[]
  const initialState = value.map((item, index) => ({
    id: index,
    key: `${formName}-${name}[${index}]`,
    initialItem: item,
  }))
  const [state, setFieldArrayState] = useStore(storeKey, initialState)

  return {
    state,
    setFieldArrayState,
  }
}
