import React, { Component, FunctionComponent, ReactNode, Dispatch } from 'react'
import { Action as StookAction } from 'stook'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type Status = 'editable' | 'disabled' | 'preview'

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

export type FieldValidator<T = any> = (
  value: any,
  values: T,
) => string | void | Promise<string | void>

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

  validate?: any

  [key: string]: any
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
  onSubmit?(values: T extends object ? T : any, formApi: FormContext): Promise<any> | any

  /**
   * callback when form error
   * @param errors current errors
   */
  onError?(errors: Errors<T>, formApi: FormContext): Promise<any> | any

  /**
   * callback when reset form
   */
  onReset?(formApi: FormContext): Promise<any> | any
}

export interface FieldState<T = any> {
  name: string
  label: ReactNode
  component: ComponentType
  componentProps: any

  /** shoud show label */
  showLabel: boolean

  /** required for ui */
  required: boolean

  /** field description */
  description: ReactNode

  /** initial value */
  value: T

  /** initial error */
  error: string | undefined

  warnings: string | undefined

  /** initial  touched*/
  touched: boolean

  disabled: boolean

  focused: boolean

  /** initial display */
  display: boolean

  /** initial visible */
  visible: boolean

  /** initial status */
  status: Status

  pendding: boolean

  options: Options

  data: any

  validate: FieldValidator<T>

  rules: FieldValidatorRules

  onFieldChange(options: OnFieldChangeOptions<T>): Promise<any> | any

  onFieldInit(options: OnFieldInitOptions<T>): Promise<any> | any

  transform?(value: T): T
}

export interface FieldProps<T = any> extends Partial<FieldState<T>> {
  name: string

  children?: (data: FieldChildrenProps) => ReactNode

  [key: string]: any
}

export interface ArrayHelper {
  push: (obj: any) => void
  swap: (indexA: number, indexB: number) => void
  move: (from: number, to: number) => void
  insert: (index: number, value: any) => void
  unshift: (value: any) => number
  remove: (index: number) => any
  pop: <T = any>() => T | undefined
  replace: (index: number, value: any) => void
  isFirst: (index: number) => boolean
  isLast: (index: number) => boolean
}

export interface FieldArrayFieldItem {
  id: number
  item: {
    [key: string]: any
  }
}
export interface FieldArrayChildrenProps extends ArrayHelper {
  fields: FieldArrayFieldItem[]
}

export interface FieldArrayProps {
  name: string

  children: (props: FieldArrayChildrenProps) => ReactNode
}

export interface OnFieldChangeOptions<T> extends FieldState<T> {
  setField: <T = any>(name: string, nextStateOrSetState: (field: FieldState<T>) => any) => any
}

export interface OnFieldInitOptions<T> extends FieldState<T> {
  setField: <T = any>(name: string, nextStateOrSetState: (field: FieldState<T>) => any) => any
}

export interface FormSpyProps {
  children: (props: FormState & FormContext) => ReactNode
}

export interface FieldSpyProps {
  name: string | string[]
  children: (...fieldStores: UseFieldReturn[]) => ReactNode
}

type HandleSubmit = (e?: React.FormEvent<HTMLFormElement>) => Promise<any>

export type SetFieldState = Dispatch<StookAction<FieldState>>

export interface UseFieldReturn extends FieldState, FieldHandlers {
  register: FieldRegister
  setFieldState: SetFieldState
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

export type Transform = (value: FimValue) => FimValue

export interface FormContext<T = any> {
  formName: string
  initialValues?: T

  validationSchema?: any

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  context?: any

  config: Config<T>
  handleSubmit: HandleSubmit
  getValues: () => T

  setFormState: Dispatch<StookAction<FormState>>
  setFieldState: <T = any>(name: string, nextStateOrSetState: (field: FieldState<T>) => any) => any
  setSubmitting(isSubmitting: boolean): void
  resetForm(): void
  submitForm(): void
  validateForm(): Promise<Errors<T>>
  validateField(name: string): Promise<boolean>
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

export interface FormProps<T = any> extends Config<T> {
  use?: FormContext<T>

  children?: React.ReactNode
}

export interface FieldRegister {
  value: FimValue
  multiple?: boolean
  checked?: boolean
  onChange: FieldHandlers['handleChange']
  onBlur: FieldHandlers['handleBlur']
}

export interface FormRegisterProps extends FormContext {}

export interface FieldRegisterProps extends UseFieldReturn {}

export interface FieldChildrenProps extends UseFieldReturn {}

export interface FieldValidateOptions {
  fieldState: FieldState
  values: any
}

export interface ValidatorOptions<T = any> extends FormContext {
  values: T
}

export type Validator<T = any> = (options: ValidatorOptions<T>) => Promise<Errors<T>>

export interface Plugin {
  Fields?: {
    [key: string]: any
  }

  Form?: any

  validator?: Validator

  rules?: {
    [key: string]: (options: FieldValidateOptions, rule: any) => any | Promise<any>
  }
}
