import { getFieldMetadata, isClassSchema } from '../utils'
import { fieldStore } from '../stores'
import { useRef } from 'react'

export function useFieldsMetadata(entityOrSchema: any): any {
  const instanceRef = useRef(isClassSchema(entityOrSchema) ? new entityOrSchema() : null)

  if (instanceRef.current) {
    const instance = instanceRef.current
    const fields = fieldStore.get(instance)
    return getFieldMetadata(fields)
  }
  return entityOrSchema
}
