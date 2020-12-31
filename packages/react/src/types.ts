import React, { ReactNode } from 'react'
import { FormApi, FormConfig, FieldState, FormState, FieldConfig } from '@formy/core'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type ForceUpdate = React.Dispatch<React.SetStateAction<{}>>

export type FormyValue = any

export interface FieldHandlers {
  handleBlur(e: React.FocusEvent<any>): Promise<any>
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : Promise<any>
  handleChange(e: React.ChangeEvent<any>): Promise<any>
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ):
    | (T extends React.ChangeEvent<any> ? void : (e: unknown | React.ChangeEvent<any>) => void)
    | Promise<any>
}

export interface FieldStates {
  [key: string]: FieldState
}

export interface FormProps<T = any> extends FormConfig<T> {
  hook?: FormApi

  children?: ReactNode
}

export interface FieldRegister {
  value: FormyValue
  // multiple?: boolean
  // checked?: boolean
  onChange: FieldHandlers['handleChange']
  onBlur: FieldHandlers['handleBlur']
}

export interface FormRegisterProps extends FormApi {}

export interface FieldRegisterProps<T = any> extends FieldRenderProps<T> {}

export interface FieldRenderProps<T = any> extends FieldState<T>, FieldHandlers {
  register: FieldRegister
  setFieldState: (fieldState: Partial<FieldState>) => void
}

export interface FieldSpyProps {
  name: string | string[]
  children: (...fieldStores: FieldState[]) => ReactNode
}

export interface FormSpyRenderProps extends FormState, FormApi {}

export interface FormSpyProps {
  children: (formSpyRenderProps: FormSpyRenderProps) => ReactNode
}

export interface FieldProps<T = any> extends FieldConfig<T> {
  name: string
  children?: ReactNode
}
