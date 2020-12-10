import { useRef } from 'react'
import { entityStore } from '../stores'
import { uuid } from '../utils'
import { Options } from '../types'
import { isEntity } from '../utils/isEntity'

export function useFormName<T = any>(options: Options<T>): string {
  let entityName = ''
  if (isEntity(options.schema)) {
    entityName = entityStore.get(options.schema).name
  }

  const name = useRef(options.name || entityName || `entity_form_${uuid()}`)
  return name.current
}
