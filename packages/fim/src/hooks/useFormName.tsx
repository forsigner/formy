import { useRef } from 'react'
import { entityStore } from '../stores'
import { uuid } from '../utils'
import { Options, EntityType } from '../types'
import { isEntity } from '../utils/isEntity'

export function useFormName<T = any>(Entity: EntityType<T>, options: Options<T> = {}): string {
  let entityName = ''
  if (isEntity(Entity)) {
    entityName = entityStore.get(Entity).name
  }

  const name = useRef(options.name || entityName || `entity_form_${uuid()}`)
  return name.current
}
