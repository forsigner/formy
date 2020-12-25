import { useRef, useState } from 'react'
import { getIn } from '../utils'
import { FieldArrayFieldItem } from '../types'
import { useFormContext } from '../formContext'

export function useFieldArray(name: string) {
  const { initialValues, formStore } = useFormContext()
  const value = getIn(initialValues, name) as any[]

  const initialState = value?.map((item, index) => ({ id: index, item }))
  const [fields, setState] = useState<FieldArrayFieldItem[]>(initialState || [])

  const setFieldArray = (state: FieldArrayFieldItem[]) => {
    formStore.fieldArrayStores[name] = state
    setState(state)
  }

  const inited = useRef(false)
  if (!inited.current) {
    formStore.fieldArrayStores[name] = fields
    inited.current = true
  }

  return {
    fields,
    setFieldArray,
  }
}
