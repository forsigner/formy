import React, { FC, Fragment } from 'react'
import { Storage } from 'stook'
import { useFieldArray } from '../hooks/useFieldArray'
import { FieldArrayProps, FieldState } from '../types'
import { last } from '../utils'
import { useFormNameContext } from '../formNameContext'

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { name } = props
  const formName = useFormNameContext()
  const { state, setFieldArrayState } = useFieldArray(name)
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
          setFieldArrayState((s) => {
            s.push({
              id: s.length,
              item: obj,
            })
          })
        },
        remove: (index: number) => {
          // const { key } = state[index]

          /** TODO: need improve */
          setFieldArrayState((state) => {
            for (const key in Storage.stores) {
              // not fieldArray store, skip
              if (!key.startsWith(`${formName}-${name}[`)) continue

              const store = Storage.get<FieldState>(key)

              for (const i of state) {
                if (key.includes(`[${i.id}]`)) {
                  // @example my_form-todos[0].title, get "title"
                  const prop = last(key.split('.'))
                  i.item[prop] = store.state.value
                }
              }

              delete Storage.stores[key]
            }

            state.splice(index, 1)

            for (const i of state) {
              if (i.id > index) i.id = i.id - 1
            }
          })
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
