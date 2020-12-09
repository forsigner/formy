import { Schema } from '../types'

export function isEntity(entityOrScheme: Schema): boolean {
  if (Array.isArray(entityOrScheme)) return false
  return true
}
