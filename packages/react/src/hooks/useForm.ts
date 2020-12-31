import { useRef, useState } from 'react'
import { FormStore, FormConfig, FormApi } from '@formy/core'

export function useForm<T = any>(config: FormConfig<T>): FormApi {
  const [, forceUpdate] = useState({})
  const { current } = useRef(new FormStore(config, forceUpdate))
  return current.getFormApi()
}
