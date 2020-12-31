import React, { FC, Fragment } from 'react'
import { FieldArrayProps } from './types'
import { useFieldArray } from './useFieldArray'

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { name } = props
  const renderProps = useFieldArray(name)
  return <Fragment>{props.children(renderProps)}</Fragment>
}
