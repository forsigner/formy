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
  onSubmit?(values: T): any

  /**
   * callback when form error
   * @param errors current errors
   */
  onError?(errors: Errors<T>): any

  /**
   * callback when reset form
   */
  onReset?(): any
}

export interface FieldState<T = any> {
  name: string
  label: ReactNode
  component: ComponentType
  componentProps?: any

  /** shoud show label */
  showLabel?: boolean

  /** required for ui */
  required?: boolean

  /** field description */
  description?: ReactNode

  /** initial value */
  value?: T

  /** initial error */
  error?: string | undefined

  warnings: string | undefined

  /** initial  touched*/
  touched?: boolean

  disabled: boolean

  focused?: boolean

  /** initial display */
  display?: boolean

  /** initial visible */
  visible?: boolean

  /** initial status */
  status?: Status

  pendding: boolean

  options: Options

  data: any

  onFieldChange?(options: OnFieldChangeOptions): Promise<any> | any

  validate?: FieldValidator<T>

  rules?: FieldValidatorRules
}

export interface FieldProps<T = any> extends Partial<FieldState<T>> {
  name: string
  transform?(value: FimValue): FimValue

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

export interface OnFieldChangeOptions extends FieldState {
  setField: SetField
}

export interface FormSpyProps {
  children: (context: UseFormReturn) => ReactNode
}

export interface FieldSpyProps {
  name: string | string[]
  children: (...fieldStores: FieldStore[]) => ReactNode
}

type HandleSubmit = (e?: React.FormEvent<HTMLFormElement>) => Promise<any>

export type SetField = (name: string, nextStateOrSetState: (state: FieldState) => any) => any

export interface FieldStore extends FieldState, FieldHandlers {
  register: FieldRegister
  setFieldState: Dispatch<StookAction<FieldState>>
}

export interface FormState<T = any> {
  initialValues?: T

  submitting: boolean
  submitted: boolean
  submitCount: number

  validating: boolean
  dirty: boolean
  valid: boolean
  status: Status

  pathMetadata: PathMetadata

  formName: string

  validationSchema?: any

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  context?: any

  config: Config<T>
}

export type PathMetadata = Array<{
  path: string
  transform: Transform | undefined
  visible: boolean
}>

export type Transform = (value: FimValue) => FimValue

export interface Actions<T = any> {
  setFormState: Dispatch<StookAction<FormState<T>>>
  setFieldState: SetField
  setSubmitting(isSubmitting: boolean): void
  resetForm(): void
  submitForm(): void
  validateForm(): Promise<Errors<T>>
  validateField(name: string): Promise<boolean>
}

export interface UseFormReturn<T = any> extends Actions<T>, FormState<T> {
  handleSubmit: HandleSubmit
  getValues: () => T
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
  use?: UseFormReturn<T>

  children?: React.ReactNode
}

export interface FieldRegister {
  value: FimValue
  multiple?: boolean
  checked?: boolean
  onChange: FieldHandlers['handleChange']
  onBlur: FieldHandlers['handleBlur']
}

export interface FormRegisterProps extends UseFormReturn {}

export interface FieldRegisterProps extends FieldStore {}

export interface FieldChildrenProps extends FieldStore {}

export interface FieldValidateOptions {
  fieldState: FieldState
  values: any
}

export interface ValidatorOptions<T = any> extends FormState<T> {
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
