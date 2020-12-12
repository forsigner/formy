import React, { Component, FunctionComponent, ReactNode } from 'react'
import { Dispatch, Action } from 'stook'
import { HelperBuilder } from './builders/HelperBuilder'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type Status = 'editable' | 'disabled' | 'preview'

export type FimValue = string | number | boolean | null | undefined | { [key: string]: any }

export type Schema<T = any> = {
  [K in keyof T]?: FieldSchema | FieldSchema | Schema
}

export interface FieldSchema<ComponentProps = any> {
  label?: React.ReactNode

  /** shoud show label */
  showLabel?: boolean

  /** field description */
  description?: ReactNode

  /** initial value */
  value?: any

  focused?: boolean

  /** initial display */
  display?: boolean

  /** initial visible */
  visible?: boolean

  /** initial status */
  status?: Status

  /** initial error */
  error?: string

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

  gql?: GqlConfig

  // transform?: Transform
  transform?(value: FimValue): FimValue

  [key: string]: any
}

export type Values<T = any> = {
  [K in keyof T]: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Values<T[K][number]>[]
      : any | any[]
    : T[K] extends Schema
    ? Values<T[K]>
    : any
}

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Errors<T[K][number]>[] | string | string[]
      : string | string[]
    : T[K] extends Schema
    ? Errors<T[K]>
    : string
}

export type Toucheds<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Toucheds<T[K][number]>[]
      : boolean
    : T[K] extends Schema
    ? Toucheds<T[K]>
    : boolean
}

export type Disableds<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Disableds<T[K][number]>[]
      : boolean
    : T[K] extends Schema
    ? Disableds<T[K]>
    : boolean
}

export type Statuses<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Statuses<T[K][number]>[]
      : Status
    : T[K] extends Schema
    ? Statuses<T[K]>
    : Status
}

export type Visibles<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Visibles<T[K][number]>[]
      : boolean
    : T[K] extends Schema
    ? Visibles<T[K]>
    : boolean
}

export type Penddings<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Penddings<T[K][number]>[]
      : boolean
    : T[K] extends Schema
    ? Penddings<T[K]>
    : boolean
}

export type Displays<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Displays<T[K][number]>[]
      : boolean
    : T[K] extends Schema
    ? Displays<T[K]>
    : boolean
}

export type Enums<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Enums<T[K][number]>[]
      : Enum
    : T[K] extends Schema
    ? Enums<T[K]>
    : Enum
}

export type FieldSchemas<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? FieldSchemas<T[K][number]>[]
      : FieldSchema
    : T[K] extends Schema
    ? FieldSchemas<T[K]>
    : FieldSchema
}

export type Datas<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Datas<T[K][number]>[]
      : any
    : T[K] extends Schema
    ? Datas<T[K]>
    : any
}

export type Components<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Components<T[K][number]>[]
      : ComponentType
    : T[K] extends Schema
    ? Components<T[K]>
    : ComponentType
}

export type Labels<T = any> = {
  [K in keyof T]?: T[K] extends Schema[]
    ? T[K][number] extends Schema
      ? Labels<T[K][number]>[]
      : ReactNode
    : T[K] extends Schema
    ? Labels<T[K]>
    : ReactNode
}

export interface ClassType<T = any> {
  new (...args: any[]): T
}

type HandleSubmit = (e?: React.FormEvent<HTMLFormElement>) => Promise<any>

export interface FieldState {
  label: ReactNode
  component: ComponentType
  value: any
  error: string | undefined
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

export interface FormState<T = any> {
  values: Values<T>
  labals: Labels<T>
  errors: Errors<T>
  toucheds: Toucheds<T>
  disableds: Disableds<T>
  visibles: Visibles<T>
  displays: Displays<T>
  statuses: Statuses<T>
  penddings: Penddings<T>
  enums: Enums<T>
  fieldSchemas: FieldSchemas<T>
  datas: Datas<T>
  components: Components<T>
  submitting: boolean
  validating: boolean
  dirty: boolean
  valid: boolean
  submitCount: number
  status: Status

  pathMetadata: PathMetadata

  formName?: string

  schema: Schema<T>

  validationSchema: any

  options: Options<T>
}

export type PathMetadata = Array<{
  path: string
  transform: Transform | undefined
  visible: boolean
}>

export type ValuesFn<T> = Partial<T> | ((prev: T) => T) | ((prev: T) => void)

export type TouchedsFn<T> =
  | Toucheds<T>
  | ((toucheds: Toucheds<T>) => Toucheds<T>)
  | ((toucheds: Toucheds<T>) => void)

export type DisabledsFn<T> =
  | Disableds<T>
  | ((disableds: Disableds<T>) => Disableds<T>)
  | ((disableds: Disableds<T>) => void)

export type VisiblesFn<T> =
  | Visibles<T>
  | ((visibles: Visibles<T>) => Visibles<T>)
  | ((visibles: Visibles<T>) => void)

export type LabelsFn<T> =
  | Labels<T>
  | ((labels: Labels<T>) => Labels<T>)
  | ((labels: Labels<T>) => void)

export type ComponentsFn<T> =
  | Components<T>
  | ((components: Components<T>) => Components<T>)
  | ((components: Components<T>) => void)

export type DatasFn<T> = Datas<T> | ((datas: Datas<T>) => Datas<T>) | ((datas: Datas<T>) => void)

export type DisplaysFn<T> =
  | Displays<T>
  | ((datas: Displays<T>) => Displays<T>)
  | ((datas: Displays<T>) => void)

export type ErrorsFn<T> =
  | Errors<T>
  | ((errors: Errors<T>) => Errors<T>)
  | ((errors: Errors<T>) => void)

export type EnumsFn<T> = Enums<T> | ((enums: Enums<T>) => Enums<T>) | ((enums: Enums<T>) => void)

export interface Actions<T = any> {
  setValues(fn: ValuesFn<T>): void
  setValues<C>(fn: ValuesFn<C>): void

  setToucheds(fn: TouchedsFn<T>): void
  setToucheds<C>(fn: TouchedsFn<C>): void

  setDisableds(fn: DisabledsFn<T>): void
  setDisableds<C>(fn: DisabledsFn<C>): void

  setDisplays(fn: DisplaysFn<T>): void
  setDisplays<C>(fn: DisplaysFn<C>): void

  setDatas(fn: DatasFn<T>): void
  setDatas<C>(fn: DatasFn<C>): void

  setVisibles(fn: VisiblesFn<T>): void
  setVisibles<C = any>(fn: VisiblesFn<C>): void

  setErrors(fn: ErrorsFn<T>): void
  setErrors<C>(fn: ErrorsFn<C>): void

  setLabels(fn: LabelsFn<T>): void
  setLabels<C>(fn: LabelsFn<C>): void

  setCompnents(fn: ComponentsFn<T>): void
  setCompnents<C>(fn: ComponentsFn<C>): void

  setEnums(fn: EnumsFn<T>): void
  setEnums<C>(fn: EnumsFn<C>): void

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

export interface Handlers extends FieldHandlers {
  handleSubmit: HandleSubmit
}

export interface Helpers {
  getLabel: (name: string) => ReactNode
  getComponent: (name: string) => ComponentType
  getValue: (name: string) => any
  getError: (name: string) => any
  getVisible: (name: string) => boolean
  getTouched: (name: string) => boolean
  getEnum: (name: string) => Enum
  getDisabled: (name: string) => boolean
  getDisplay: (name: string) => boolean
  getStatus: (name: string) => any
  getPendding: (name: string) => boolean
  getData: (name: string) => any
  getFieldSchema: (name: string) => FieldSchema
  getFieldState: (name: string) => FieldState
  createArrayHelper: (key: string) => ArrayHelper
}

export interface HandlerBuilder {
  createSubmitHandler: () => (e?: any) => Promise<void>
  createBlurHandler: (name?: string) => (e?: any) => Promise<void>
  createChangeHandler: (name?: string) => (e?: any) => Promise<void>
}

export interface Result<T = any>
  extends Actions<T>,
    FormState<T>,
    Helpers,
    HandlerBuilder,
    Handlers {}

export interface ArrayHelper {
  push: (obj: any) => void
  swap: (indexA: number, indexB: number) => void
  move: (from: number, to: number) => void
  insert: (index: number, value: any) => void
  unshift: (value: any) => number
  remove: <T>(index: number) => T | undefined
  pop: <T>() => T | undefined
  replace: (index: number, value: any) => void
  isFirst: (index: number) => boolean
  isLast: (index: number) => boolean
}

export interface Options<T = any> {
  /** form unique name, optional */
  name?: string

  schema: T

  validationSchema?: any

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
  onSubmit?(values: Values<T>): any

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

export interface FormProps<T = any> extends Omit<Options<T>, 'schema'> {
  use?: Result<T>
  schema?: T
}

export interface Variables {
  [key: string]: any
}

export interface MapToEnum extends EnumItem {
  items?: string
}

export interface GqlConfig {
  query: string
  variables?: Variables | (() => Variables)
  initialValue?: (data: any) => any
  mapToEnum: MapToEnum | ((data: any) => Enum)
}

export interface EffectOptions<T = any> {
  value: any
  helpes: HelperBuilder<T>
  actions: Actions<T>
}

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | ({} & string)
  | FunctionComponent
  | Component

export type Transform = (value: FimValue) => FimValue

export interface RegisterProps extends Result {}

export interface RegisterFormProps extends RegisterProps {}

export interface RegisterFieldProps extends RegisterProps {
  name: string
  fieldState: FieldState
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

export interface FieldProps {
  name: string
  memo?: () => boolean
}
