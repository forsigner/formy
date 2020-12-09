import { useRef } from 'react'
import { entityStore } from '../stores'
import { uuid } from '../utils'
import { Config, EntityType } from '../types'
import { isEntity } from '../utils/isEntity'

export function useFormName<T = any>(Entity: EntityType<T>, config: Config<T> = {}): string {
  let entityName = ''
  if (isEntity(Entity)) {
    entityName = entityStore.get(Entity).name
  }

  const name = useRef(config.name || entityName || `entity_form_${uuid()}`)
  return name.current
}
