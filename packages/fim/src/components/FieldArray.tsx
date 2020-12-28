import React, { FC, Fragment } from 'react'
import { useFieldArray } from '../hooks/useFieldArray'
import { FieldArrayProps } from '../types'

export const FieldArray: FC<FieldArrayProps> = (props) => {
  const { name } = props
  const renderProps = useFieldArray(name)
  return <Fragment>{props.children(renderProps)}</Fragment>
}
