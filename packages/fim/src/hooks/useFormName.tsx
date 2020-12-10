import { useRef } from 'react'
import { uuid } from '../utils'
import { Options } from '../types'

export function useFormName<T = any>(options: Options<T>): string {
  const name = useRef(options.name || `entity_form_${uuid()}`)
  return name.current
}
