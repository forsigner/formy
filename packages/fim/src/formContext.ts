import { createContext, useContext } from 'react'
import { Result } from './types'

export const formContext = createContext({} as Result)

export const FormProvider = formContext.Provider

export function useFormContext<T = any>() {
  return useContext(formContext) as Result<T>
}
