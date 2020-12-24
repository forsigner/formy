import { createContext, useContext } from 'react'
import { FormApi } from './types'

export const formContext = createContext({} as FormApi)

export const FormProvider = formContext.Provider

export function useFormContext() {
  return useContext(formContext) as FormApi
}
