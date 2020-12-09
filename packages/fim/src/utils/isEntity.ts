import { EntityOrScheme } from '../types'

export function isEntity(entityOrScheme: EntityOrScheme): boolean {
  if (Array.isArray(entityOrScheme)) return false
  return true
}
