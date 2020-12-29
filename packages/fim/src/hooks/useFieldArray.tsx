import { useRef, useState } from 'react'
import { getIn, last, setIn } from '../utils'
import { FieldArrayItem, FieldArrayRenderProps, FieldState } from '../types'
import { useFormContext } from '../formContext'

function arrayMoveMutate(array: any[], from: number, to: number) {
  const startIndex = from < 0 ? array.length + from : from

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to

    const [item] = array.splice(from, 1)
    array.splice(endIndex, 0, item)
  }
}

function arrayMove(array: any, from: number, to: number) {
  array = [...array]
  arrayMoveMutate(array, from, to)
  return array
}

function isArrayFiledName(name: string) {
  return /\[\d+\]\..+$/.test(name)
}

function getProp(key: string): string {
  return last(key.split('.'))
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
  const [fields, setState] = useState<FieldArrayItem[]>(value || [])

  const setFields = (state: FieldArrayItem[]) => {
    formStore.fieldArrayStores[name] = state
    setState(state)
  }

  const inited = useRef(false)
  if (!inited.current) {
    formStore.fieldArrayStores[name] = fields
    inited.current = true
  }

  const isValidIndex = (...args: number[]) => {
    return !args.some((i) => i < 0 || i > fields.length)
  }

  const eachFieldStates = (fn: (item: { key: string; state: FieldState }) => void) => {
    for (const key in formStore.fieldStates) {
      // not fieldArray store, skip it
      if (!isArrayFiledName(key)) continue
      fn({ key, state: formStore.getFieldState(key) })
    }
  }

  const move = (from: number, to: number) => {
    if (!isValidIndex(from, to)) return
    let obj: any = {}

    eachFieldStates(({ key, state }) => {
      setIn(obj, key, state)
    })

    const moved = { [name]: arrayMove(obj[name], from, to) }

    eachFieldStates(({ key }) => {
      formStore.addFieldState(key, getIn(moved, key))
    })

    setFields(arrayMove(fields, from, to))
  }

  const remove = (index: number) => {
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

    fields.splice(index, 1)
    setFields([...fields])
  }

  const unshift = (obj: any) => {
    const newFields = [obj, ...fields]

    for (const key of Object.keys(formStore.fieldStates).reverse()) {
      // not fieldArray store, skip it
      if (!isArrayFiledName(key)) continue

      const nextKey = getNextName(key)
      const nameIndex = extractNameIndex(key)

      formStore.addFieldState(nextKey, formStore.fieldStates[key])

      // 最后一个 field 同步value状态
      if (nameIndex + 2 === newFields.length) {
        const prop = getProp(key)
        newFields[newFields.length - 1][prop] = formStore.fieldStates[key].value
      }

      if (nameIndex === 0) {
        formStore.addFieldState(key, { ...formStore.fieldStates[key], value: obj[getProp(key)] })
      }
    }

    setFields(newFields)
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
      setFields([...fields, obj])
    },
    unshift,
    remove,
    move,
    swap: move,
    insert(index: number, value: any) {
      console.log(index, value)
    },
    replace(index: number, value: any) {
      console.log(index, value)
    },
  } as FieldArrayRenderProps
}
