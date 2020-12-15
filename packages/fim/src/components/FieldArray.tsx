import React, { FC, Fragment } from 'react'
import { Storage } from 'stook'
import { original } from 'immer'
import { useFieldArray } from '../hooks/useFieldArray'
import { useFormContext } from '../formContext'
import { FieldArrayProps } from '../types'

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { name } = props
  const { formName = '' } = useFormContext()
  const { state, setFieldArrayState } = useFieldArray(name)
  console.log('state:', state)
  return (
    <Fragment>
      {props.children({
        fields: state,
        isFirst(index) {
          return index === 0
        },
        isLast(index) {
          return index === state.length - 1
        },
        push: (obj: any) => {
          for (const key in obj) {
          }

          setFieldArrayState((s) => {
            const key = `${formName}-${name}[${s.length}]`
            s.push({
              id: s.length,
              key,
              initialItem: obj,
            })
          })
        },
        remove: (index: number) => {
          const { key } = state[index]
          const { stores } = Storage

          for (const storeKey in stores) {
            if (storeKey.startsWith(key)) {
              delete stores[storeKey]
            }
          }

          setFieldArrayState((s) => {
            s.splice(index, 1)
          })
        },
        swap: (indexA: number, indexB: number) => {},
        move: (from: number, to: number) => {},
        insert: (index: number, value: any) => {},
        unshift: (value: any) => {
          return 0
        },
        pop: () => {
          return undefined
        },
        replace: (index: number, value: any) => {},
      })}
    </Fragment>
  )
}
