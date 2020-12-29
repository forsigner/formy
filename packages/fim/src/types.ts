import React, { Component, FunctionComponent, ReactNode } from 'react'
import { FormStore } from './stores/FormStore'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type Status = 'editable' | 'disabled' | 'preview'

export type ForceUpdate = React.Dispatch<React.SetStateAction<{}>>

export type Option = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Options = Option[]

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | 'Select'
  | 'Textarea'
  | ({} & string)
  | FunctionComponent
  | Component
  | ((...args: any[]) => JSX.Element)

export type FimValue = any

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Errors<T[K][number]>[] | string | string[]
      : string | string[]
    : T[K] extends object
    ? Errors<T[K]>
    : string
}

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

export interface FieldValidatorRules {
  /**
   * @example 
   ```jsx
    <Field name="email" rules={{required: "Email is Require"}}/>
   ```
   */
  required?: string

  min?: [number, string]

  max?: [number, string]

  minLength?: [string, string]

  maxLength?: [string, string]

  pattern?: [RegExp, string] | [RegExp, string][]

  arrayNotEmpty?: string

  equalTo?: [string, string]

  // validate?: any

  [key: string]: any
}

export interface OnValueChangeOptions<T> extends FieldState<T> {
  setFieldState: <T = any>(name: string, fieldState: Partial<FieldState<T>>) => void
}

export interface OnFieldInitOptions<T> extends FieldState<T> {
  setFieldState: <T = any>(name: string, fieldState: Partial<FieldState<T>>) => void
}

export interface FieldStates {
  [key: string]: FieldState
}

export interface FieldUpdaters {
  [key: string]: ForceUpdate[]
}

export interface CommonUpdaterMap {
  formSpy: ForceUpdate[]
  [key: string]: ForceUpdate[]
}

export interface Config<T = any> {
  /** form unique name, optional */
  name?: string

  initialValues?: T

  validationSchema?: any

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  context?: any

  /**
   * form-level validation
   * @param values current values
   */
  validate?(options: ValidatorOptions<T>): Errors<T>

  /**
   * callback when form submit
   * @param values current values
   */
  onSubmit?(values: T, formApi: FormApi): Promise<any> | any

  /**
   * callback when form error
   * @param errors current errors
   */
  onError?(errors: Errors<T>, formApi: FormApi): Promise<any> | any

  /**
   * callback when reset form
   */
  onReset?(formApi: FormApi): Promise<any> | any
}

export interface FormApi<T = any> {
  initialValues: T
  getValues: FormStore['getValues']
  getErrors: FormStore['getErrors']
  setFormState: FormStore['setFormState']
  getFormState: FormStore['getFormState']
  setSubmitting: FormStore['setSubmitting']
  setFieldState: FormStore['setFieldState']
  getFieldState: FormStore['getFieldState']
  validateForm: FormStore['validateForm']
  validateField: FormStore['validateField']
  handleSubmit: FormStore['handleSubmit']
  submitForm: FormStore['submitForm']
  resetForm: FormStore['resetForm']
  formStore: FormStore
}

export interface FormProps<T = any> extends Config<T> {
  hook?: FormApi

  children?: ReactNode
}

export interface FormState {
  submitting: boolean
  submitted: boolean
  submitCount: number

  validating: boolean
  dirty: boolean
  valid: boolean
  status: Status
}

export interface FieldRegister {
  value: FimValue
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

export interface FieldProps<T = any> extends Partial<FieldState<T>> {
  name: string
  children?: (props: FieldRenderProps) => ReactNode
}

export interface FieldState<T = any> {
  label: ReactNode
  component: ComponentType
  componentProps: any

  showLabel: boolean

  required: boolean

  description: ReactNode

  value: T

  error: string | undefined

  warnings: string | undefined

  touched: boolean

  disabled: boolean

  focused: boolean

  display: boolean

  visible: boolean

  status: Status

  pendding: boolean

  options: Options

  data: any

  // validate: FieldValidator<T>

  rules: FieldValidatorRules

  transform?(value: T): T

  onValueChange(options: OnValueChangeOptions<T>): Promise<any> | any

  onFieldInit(options: OnFieldInitOptions<T>): Promise<any> | any
}

export interface FieldSpyProps {
  name: string | string[]
  children: (...fieldStores: FieldState[]) => ReactNode
}

export interface FormSpyRenderProps extends FormState, FormApi {}

export interface FormSpyProps {
  children: (formSpyRenderProps: FormSpyRenderProps) => ReactNode
}

export interface FieldValidateOptions {
  fieldState: FieldState
  values: any
}

export interface ValidatorOptions<T = any> extends FormApi {
  validationSchema: any
  values: T
}

export type Validator<T = any> = (options: ValidatorOptions<T>) => Promise<Errors<T>>

export type OnFormStateChange = (formStore: FormStore) => any

export type GetInitialFieldValue<T = any> = (fieldProps: FieldProps, formStore: FormStore) => T

export interface FimPlugin {
  Fields?: {
    [key: string]: any
  }

  Form?: any

  validator?: Validator

  rules?: {
    [key: string]: (options: FieldValidateOptions, rule: any) => any | Promise<any>
  }

  getInitialFieldValue?: GetInitialFieldValue

  onFormStateChange?: OnFormStateChange

  onFieldChange?: OnFormStateChange
}
