import { useMemo, useState } from 'react'
import arrayMove from 'array-move'
import { getIn, last, setIn } from '@formy/utils'
import { FieldState } from '@formy/core'
import { useFormContext } from '@formy/react'
import { FieldArrayItem, FieldArrayRenderProps } from './types'

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

  const setFields = (nextFields: FieldArrayItem[]) => {
    setIn(formStore.data, `fieldArrayStores[${name}]`, nextFields)
    setState(nextFields)
  }

  useMemo(() => {
    setIn(formStore.data, `fieldArrayStores[${name}]`, fields)
  }, [])

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

  const getNestedFieldStates = () => {
    let nested: any = {}
    eachFieldStates(({ key, state }) => {
      setIn(nested, key, state)
    })
    return nested
  }

  const move = (from: number, to: number) => {
    if (!isValidIndex(from, to)) return
    const nested = getNestedFieldStates()

    const moved = { [name]: arrayMove(nested[name], from, to) }

    eachFieldStates(({ key }) => {
      formStore.fieldStates[key] = getIn(moved, key)
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
        formStore.fieldStates[key] = formStore.fieldStates[nextKey]
      } else {
        // delete last field state
        formStore.romveFieldState(key)
      }
    }

    fields.splice(index, 1)
    setFields([...fields])
  }

  const unshift = (value: any) => {
    const newFields = [value, ...fields]

    for (const key of Object.keys(formStore.fieldStates).reverse()) {
      // not fieldArray store, skip it
      if (!isArrayFiledName(key)) continue

      const nextKey = getNextName(key)
      const nameIndex = extractNameIndex(key)

      formStore.fieldStates[nextKey] = formStore.fieldStates[key]

      // 最后一个 field 同步value状态
      if (nameIndex + 2 === newFields.length) {
        const prop = getProp(key)
        newFields[newFields.length - 1][prop] = formStore.fieldStates[key].value
      }

      if (nameIndex === 0) {
        formStore.fieldStates[key] = { ...formStore.fieldStates[key], value: value[getProp(key)] }
      }
    }

    setFields(newFields)
  }

  const insert = (index: number, value: any) => {
    const nested = getNestedFieldStates()
    const list = nested[name]

    /** preset item for insert */
    const presetItem = { ...list[0] }
    for (const key in presetItem) {
      presetItem[key].value = value[key]
    }

    list.splice(index, 0, presetItem)

    const handled = { [name]: list }

    console.log('handled:', handled)

    eachFieldStates(({ key }) => {
      const nextKey = getNextName(key)
      formStore.fieldStates[key] = getIn(handled, key)
      if (!formStore.getFieldState(nextKey)) {
        formStore.fieldStates[nextKey] = getIn(handled, key)
      }
    })

    fields.splice(index, 0, value)
    setFields([...fields])
  }

  return {
    fields,
    isFirst(index) {
      return index === 0
    },
    isLast(index) {
      return index === fields.length - 1
    },
    push<T = any>(value: T) {
      setFields([...fields, value])
    },
    unshift,
    remove,
    move,
    swap: move,
    insert,
  } as FieldArrayRenderProps
}
