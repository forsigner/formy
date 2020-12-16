import { useRef } from 'react'
import { uuid } from '../utils'
import { Config } from '../types'

export function useFormName<T = any>(config: Config<T>): string {
  const name = useRef(config.name || `fim_${uuid()}`)
  return name.current
}
