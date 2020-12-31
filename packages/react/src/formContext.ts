import { FormApi } from '@formy/core'
import { createContext, useContext } from 'react'

export const formContext = createContext({} as FormApi)

export const FormProvider = formContext.Provider

export function useFormContext() {
  return useContext(formContext) as FormApi
}
