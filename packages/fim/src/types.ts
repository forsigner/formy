import React, { Component, FunctionComponent, ReactNode, Dispatch } from 'react'
import { Action as StookAction } from 'stook'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type Status = 'editable' | 'disabled' | 'preview'

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | 'Textarea'
  | ({} & string)
  | FunctionComponent
  | Component

export type FimValue = string | number | boolean | null | undefined | { [key: string]: any }

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Errors<T[K][number]>[] | string | string[]
      : string | string[]
    : T[K] extends object
    ? Errors<T[K]>
    : string
}

export interface FieldProps<ComponentProps = any> {
  name: string

  label?: React.ReactNode

  /** shoud show label */
  showLabel?: boolean

  /** field description */
  description?: ReactNode

  /** initial value */
  value?: any

  /** initial error */
  error?: string | undefined

  warnings?: string | undefined

  focused?: boolean

  /** initial display */
  display?: boolean

  /** initial visible */
  visible?: boolean

  /** initial status */
  status?: Status

  /** initial  touched*/
  touched?: boolean

  /** initial  disabled*/
  disabled?: boolean

  /** initial pendding */
  pendding?: boolean

  /** initial enum */
  enum?: Enum | (() => Enum)

  /** initial data */
  data?: any

  /** required for ui */
  required?: boolean

  order?: number

  component?: ComponentType

  componentProps?: ComponentProps

  // transform?: Transform
  transform?(value: FimValue): FimValue
  memo?(): boolean

  onFieldChange?(options: OnFieldChangeOptions): any

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
export interface FieldArrayData extends ArrayHelper {
  fields: FieldArrayFieldItem[]
}

export interface FieldArrayProps {
  name: string

  children: (data: FieldArrayData) => ReactNode
}

export interface OnFieldChangeOptions {
  fieldState: FieldStateTypes
  setFieldState: SetFieldState
}

export interface FormStateProps {
  children: (context: UseFormReturn) => ReactNode
}

export interface FieldStateProps {
  name: string
  children: (fieldStore: FieldStore) => ReactNode
}

type HandleSubmit = (e?: React.FormEvent<HTMLFormElement>) => Promise<any>

export interface FieldStateTypes {
  name: string
  label: ReactNode
  component: ComponentType
  value: any
  error: string | undefined
  warnings: string | undefined
  touched: boolean
  disabled: boolean
  visible: boolean
  focused?: boolean
  display: boolean
  status: Status
  pendding: boolean
  enum: Enum
  fieldSchema: any
  data: any
  onFieldChange?(options: OnFieldChangeOptions): any
}

export type SetFieldState = (
  name: string,
  nextStateOrSetState: (state: FieldStateTypes) => any,
) => any

export interface FieldStore extends FieldStateTypes {
  setFieldState: Dispatch<StookAction<FieldStateTypes>>
}

export interface FormStateTypes<T = any> {
  initialValues: T

  values: T

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

  options: Options<T>
}

export type PathMetadata = Array<{
  path: string
  transform: Transform | undefined
  visible: boolean
}>

export type Transform = (value: FimValue) => FimValue

export interface Actions<T = any> {
  setFormState: Dispatch<StookAction<FormStateTypes<T>>>
  setFieldState: SetFieldState
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

export interface HandlerBuilder {
  createSubmitHandler: () => (e?: any) => Promise<void>
  createBlurHandler: (name?: string) => (e?: any) => Promise<void>
  createChangeHandler: (name?: string) => (e?: any) => Promise<void>
}

export interface UseFormReturn<T = any> extends Actions<T>, FormStateTypes<T> {
  handleSubmit: HandleSubmit
  getValues: () => T
}

export interface Options<T = any> {
  /** form unique name, optional */
  name?: string

  initialValues: T

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

export interface FormProps<T = any> extends Options<T> {
  use?: UseFormReturn<T>

  children?: React.ReactNode
}

export interface RegisterProps extends UseFormReturn {}

export interface RegisterFormProps extends RegisterProps {}

export interface RegisterFieldProps {
  name: string
}

export type EnumItem = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type Enum = EnumItem[]

export interface ValidatorOptions<T = any> extends FormStateTypes<T> {
  values: T
}

export type Validator<T = any> = (options: ValidatorOptions<T>) => Promise<Errors<T>>

export interface Plugin {
  Fields?: {
    [key: string]: any
  }

  Form?: any
  Submit?: any
  Reset?: any

  validator?: Validator

  rules?: {
    [key: string]: any
  }
}
