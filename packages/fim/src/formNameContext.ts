import { createContext, useContext } from 'react'

export const formNameContext = createContext<string>('')

export const FormNameProvider = formNameContext.Provider

export function useFormNameContext() {
  return useContext(formNameContext)
}
