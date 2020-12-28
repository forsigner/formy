import { useRef, useState } from 'react'
import { getIn } from '../utils'
import { FieldArrayFieldItem, FieldArrayRenderProps } from '../types'
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
    isFirst(index) {
      return index === 0
    },
    isLast(index) {
      return index === fields.length - 1
    },
    push: (obj: any) => {
      setFieldArray([...fields, { id: fields.length, item: obj }])
    },
    remove: (index: number) => {
      const newFields = fields
        .filter((field) => field.id !== index)
        .map((field) => ({
          ...field,
          id: field.id > index ? field.id - 1 : field.id, // 修改 id
        }))

      setFieldArray(newFields)

      // TODO: bug
      for (const key in formStore.fieldStates) {
        // not fieldArray store, skip TODO: 不严谨
        if (!key.startsWith(`${name}[`)) continue

        formStore.romveFieldState(key)
      }
    },
    swap: (indexA: number, indexB: number) => {
      console.log(indexA, indexB)
    },
    move: (from: number, to: number) => {
      console.log(from, to)
    },
    insert: (index: number, value: any) => {
      console.log(index, value)
    },
    unshift: (value: any) => {
      console.log('value:', value)
      return 0
    },
    pop: () => {
      return undefined
    },
    replace: (index: number, value: any) => {
      console.log(index, value)
    },
  } as FieldArrayRenderProps
}
