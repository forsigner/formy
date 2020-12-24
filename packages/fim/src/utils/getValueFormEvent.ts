import { ChangeEvent } from 'react'
export function getValueFormEvent(e: ChangeEvent<HTMLInputElement>): any {
  if (e && typeof e === 'object' && e.target) {
    const { value, type, checked } = e.target
    return type === 'checkbox' ? checked : value
  }
  return e
}
