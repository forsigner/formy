import { useRef, useState } from 'react'
import { FormStore } from '../stores/FormStore'
import { Config, FormApi } from '../types'

export function useForm<T = any>(config: Config<T>): FormApi {
  const [, rerenderForm] = useState({})
  const { current } = useRef(new FormStore(config, rerenderForm))
  return current.getFormApi()
}
