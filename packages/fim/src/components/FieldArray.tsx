import React, { FC, Fragment } from 'react'
import { useFieldArray } from '../hooks/useFieldArray'
import { FieldArrayProps } from '../types'
import { useFormContext } from '../formContext'

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { name } = props
  const ctx = useFormContext()
  const { formStore } = ctx
  const { fields, setFieldArray } = useFieldArray(name)

  return (
    <Fragment>
      {props.children({
        fields: fields,
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
      })}
    </Fragment>
  )
}
