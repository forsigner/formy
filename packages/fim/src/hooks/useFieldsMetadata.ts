import { getFieldMetadata } from '../utils'
import { fieldStore } from '../stores'
import { useRef } from 'react'
import { isEntity } from '../utils/isEntity'

export function useFieldsMetadata(entityOrSchema: any): any {
  const instanceRef = useRef(isEntity(entityOrSchema) ? new entityOrSchema() : null)

  if (instanceRef.current) {
    const instance = instanceRef.current
    const fields = fieldStore.get(instance)
    return getFieldMetadata(fields)
  }
  return entityOrSchema
}
