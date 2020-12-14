import React, { Component, FunctionComponent, ReactNode } from 'react'
import { Dispatch, Action } from 'stook'

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

  memo?: () => boolean

  [key: string]: any
}

type HandleSubmit = (e?: React.FormEvent<HTMLFormElement>) => Promise<any>

export interface FieldState {
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
}

export interface FieldStore extends FieldState {
  setFieldState: any
}

export interface Actions<T = any> {
  setFormState: Dispatch<Action<FormState<T>>>
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

export interface UseFormReturn<T = any> extends Actions<T>, FormState<T> {
  handleSubmit: HandleSubmit
}

export interface Options<T = any> {
  /** form unique name, optional */
  name?: string

  validationSchema?: any

  validationMode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched'

  context?: any

  /**
   * Set form initialValues, it will override field initial value
   * @param defaultValues default values from field config
   */
  initValues?(defaultValues: T): T

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
}

export interface FormState<T = any> {
  values: T
  errors: Errors<T>

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

export interface RegisterProps extends UseFormReturn {}

export interface RegisterFormProps extends RegisterProps {}

export interface RegisterFieldProps extends RegisterProps {
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

export interface ValidatorOptions<T = any> extends FormState<T> {}

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
