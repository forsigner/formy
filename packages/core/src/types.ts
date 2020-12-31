import { FormStore } from './FormStore'

export type Status = 'editable' | 'disabled' | 'preview'

export type ForceUpdate = any

export type Option = {
  value: any
  label: any
  disabled?: boolean
  data?: any
  [key: string]: any
}

export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'RadioGroup'
  | 'Select'
  | 'Textarea'
  | ({} & string)
  // | FunctionComponent
  // | Component
  | ((...args: any[]) => JSX.Element)

export type Options = Option[]

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends any[]
    ? T[K][number] extends object
      ? Errors<T[K][number]>[] | string | string[]
      : string | string[]
    : T[K] extends object
    ? Errors<T[K]>
    : string
}

export interface FormConfig<T = any> {
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

export interface FormState {
  submitting: boolean
  submitted: boolean
  submitCount: number

  validating: boolean
  dirty: boolean
  valid: boolean
  status: Status
}

export interface FieldStates {
  [key: string]: FieldState
}
export interface FieldUpdaters {
  [key: string]: ForceUpdate[]
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

export interface ValidationRules {
  /**
   * @example 
   ```jsx
    <Field name="email" rules={{required: "Email is Require"}}/>
   ```
   */
  required?: string

  min?: [number, string]

  max?: [number, string]

  minLength?: [number, string]

  maxLength?: [number, string]

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

export interface FieldState<T = any> {
  label: any
  component: ComponentType
  componentProps: any

  showLabel: boolean

  required: boolean

  description: any

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

  rules: ValidationRules

  transform?(value: T): T

  onValueChange(options: OnValueChangeOptions<T>): Promise<any> | any

  onFieldInit(options: OnFieldInitOptions<T>): Promise<any> | any
}

export interface FieldValidateOptions {
  fieldState: FieldState
  values: any
}

export interface FieldConfig<T = any> extends Partial<FieldState<T>> {}

export type ValidationRuleFn<T = any, K = any> = (
  value: T,
  ruleValue: K,
  options: FieldValidateOptions,
) => any | Promise<any>

export interface ValidatorOptions<T = any> extends FormApi {
  validationSchema: any
  values: T
}

export type Validator<T = any> = (options: ValidatorOptions<T>) => Promise<Errors<T>>

export type OnFormStateChange = (formStore: FormStore) => any
export type OnFieldStateChange = (changedName: string, formStore: FormStore) => any

export type GetInitialFieldValue<T = any> = (
  name: string,
  fieldConfig: FieldConfig,
  formStore: FormStore,
) => T

export interface FormyPlugin {
  Fields?: {
    [key: string]: any
  }

  Form?: any

  validator?: Validator

  rules?: {
    [key: string]: ValidationRuleFn
  }

  getInitialFieldValue?: GetInitialFieldValue

  onFormStateChange?: OnFormStateChange

  onFieldChange?: OnFieldStateChange
}
