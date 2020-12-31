import React, { FC, Fragment, useEffect, useState } from 'react'
import { FormSpyProps, FormSpyRenderProps } from '../types'
import { useFormContext } from '../formContext'

export const FormSpy: FC<FormSpyProps> = ({ children }) => {
  const [, forceUpdate] = useState({})
  const ctx = useFormContext()
  const formState = ctx.getFormState()
  const renderProps: FormSpyRenderProps = { ...formState, ...ctx } as any

  useEffect(() => {
    const { data } = ctx.formStore
    if (!data.formSpyUpdaters) data.formSpyUpdaters = []
    data.formSpyUpdaters.push(forceUpdate)
    return () => {
      const index = data.formSpyUpdaters.indexOf(forceUpdate)
      data.formSpyUpdaters.splice(index, 1)
    }
  }, [])

  return <Fragment>{children(renderProps)}</Fragment>
}
