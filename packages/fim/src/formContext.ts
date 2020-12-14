import { createContext, useContext } from 'react'
import { UseFormReturn } from './types'

export const formContext = createContext({} as UseFormReturn)

export const FormProvider = formContext.Provider

export function useFormContext<T = any>() {
  return useContext(formContext) as UseFormReturn<T>
}
