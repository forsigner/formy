import { createContext, useContext } from 'react'
import { FormContext } from './types'

export const formContext = createContext({} as FormContext)

export const FormProvider = formContext.Provider

export function useFormContext<T = any>() {
  return useContext(formContext) as FormContext<T>
}
