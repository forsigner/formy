import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { FieldStates, FormState, useFormContext } from '@formy/core'

export interface DebugRenderProps<T = any> {
  formState: FormState
  fieldStates: FieldStates
  values: T
  // errors: any
}
export interface DebugProps {
  children?: (props: DebugRenderProps) => ReactNode
}

export function Debug(props: DebugProps) {
  const [, forceUpdate] = useState({})
  const ctx = useFormContext()
  const formState = ctx.getFormState()
  const { fieldStates } = ctx.formStore
  const values = ctx.getValues()

  useEffect(() => {
    const { commonUpdaterMap } = ctx.formStore
    if (!commonUpdaterMap.debug) commonUpdaterMap.debug = []
    commonUpdaterMap.debug.push(forceUpdate)

    return () => {
      const index = commonUpdaterMap.debug.indexOf(forceUpdate)
      commonUpdaterMap.debug.splice(index, 1)
    }
  }, [])

  if (typeof props?.children === 'function')
    return <Fragment>{props.children({ formState, fieldStates, values })}</Fragment>

  return <pre>{JSON.stringify({ values, formState, fieldStates }, null, 2)}</pre>
}
