import { useRef, useState } from 'react'
import { getIn } from '../utils'
import { FieldArrayFieldItem, FieldArrayRenderProps } from '../types'
import { useFormContext } from '../formContext'

function isArrayFiledName(name: string) {
  return /\[\d+\]\..+$/.test(name)
}

/**
 * get next fieldArray name
 * friends[1].firstName -> friends[2].firstName
 * @param name
 */
function getNextName(name: string): string {
  const arr = name.split('.')
  const arrItemKey = arr.length - 2
  const index = extractNameIndex(name)
  const item = arr[arrItemKey]
  arr[arrItemKey] = item.replace(/\[.*\]$/, `[${Number(index) + 1}]`)
  return arr.join('.')
}

/**
 * extract Index from Name path
 * friends[1].firstName -> 1
 * @param name
 */
function extractNameIndex(name: string): number {
  const arr = name.split('.')
  const arrItemKey = arr.length - 2
  const item = arr[arrItemKey]
  const result = item.match(/\[(.*)\]$/)
  const index = result?.[1] as string
  if (!index) throw new Error(`invalid name path: ${name}`)
  return Number(index)
}

export function useFieldArray(name: string) {
  const { initialValues, formStore } = useFormContext()
  const value = getIn(initialValues, name) as any[]

  const initialState = value?.map((item, index) => ({ id: index, item }))
  const [fields, setState] = useState<FieldArrayFieldItem[]>(initialState || [])

  const setFields = (state: FieldArrayFieldItem[]) => {
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
    push<T = any>(obj: T) {
      setFields([...fields, { id: fields.length, item: obj }])
    },
    remove(index: number) {
      /** next fields state */
      const newFields = fields
        .filter((field) => field.id !== index)
        .map((field) => ({
          ...field,
          id: field.id > index ? field.id - 1 : field.id, // 修改 id
        }))

      /** update field states */
      for (const key in formStore.fieldStates) {
        // not fieldArray store, skip it
        if (!isArrayFiledName(key)) continue

        const nameIndex = extractNameIndex(key)

        if (nameIndex < index) continue

        const nextKey = getNextName(key)

        if (formStore.fieldStates[nextKey]) {
          formStore.setFieldState(key, formStore.fieldStates[nextKey])
        } else {
          // delete last field state
          formStore.romveFieldState(key)
        }
      }

      // rerender <FieldArray>
      setFields(newFields)
    },
    swap(indexA: number, indexB: number) {
      console.log(indexA, indexB)
    },
    move(from: number, to: number) {
      console.log(from, to)
    },
    insert(index: number, value: any) {
      console.log(index, value)
    },
    unshift<T = any>(obj: T) {
      const newFields = fields.map((field) => ({
        ...field,
        id: field.id + 1,
      }))

      newFields.unshift({ id: 0, item: obj })

      setFields(newFields)

      for (const key in formStore.fieldStates) {
        // not fieldArray store, skip it
        if (!isArrayFiledName(key)) continue
      }
    },
    pop() {
      return undefined
    },
    replace(index: number, value: any) {
      console.log(index, value)
    },
  } as FieldArrayRenderProps
}
