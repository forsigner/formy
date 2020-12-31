import deepmerge from 'deepmerge'
import isPromise from 'is-promise'
import { getIn, setIn } from '@formy/utils'
import {
  FormConfig,
  FormState,
  FieldState,
  Status,
  Errors,
  ValidatorOptions,
  FieldStates,
  FieldConfig,
  CommonUpdaterMap,
  IFields,
  ForceUpdate,
} from './types'
import { Formy } from './Formy'
import { checkValid } from './checkValid'
import { validateField } from './validateField'

/**
 * Form Store
 */
export class FormStore {
  constructor(public config: FormConfig, public rerenderForm: any) {
    this.validationSchema = this.config.validationSchema
  }

  fields: IFields = {}

  get fieldStates(): FieldStates {
    const states: FieldStates = {}
    for (const name in this.fields) {
      states[name] = this.fields[name].state
    }
    return states
  }

  fieldSpyMap: Map<string[], ForceUpdate> = new Map()

  commonUpdaterMap: CommonUpdaterMap = {
    formSpy: [],
  }

  initialFormState: FormState = {
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    submitted: false,
    validating: false,
    status: 'editable' as Status,
  }

  formState: FormState = this.initialFormState

  validationSchema: any

  getField = (name: string) => {
    return this.fields[name]
  }

  getFieldState = (name: string) => {
    return this.fields[name]?.state
  }

  registerField(name: string, updater: any, config: Partial<FieldConfig> = {}) {
    if (this.fields[name]) {
      this.fields[name].updaters.push(updater)
    } else {
      const initialState = this.extractInitialFieldState({ ...config, name })
      this.fields[name] = {
        state: initialState,
        initialState,
        updaters: [updater],
        change: (value: any) => this.change(name, value),
        blur: () => this.blur(name),
      }
    }
  }

  getFormState = () => {
    return this.formState
  }

  rerenderFormSpy = () => {
    for (const updater of this.commonUpdaterMap.formSpy) {
      updater({})
    }
  }

  setFormState = (formPartialState: Partial<FormState>) => {
    this.formState = {
      ...this.formState,
      ...formPartialState,
    }
    this.rerenderFormSpy()

    for (const fn of Formy.onFormStateChangeCallbacks) {
      fn(this)
    }
  }

  setSubmitting = (submitting: boolean) => {
    this.formState.submitting = submitting
    this.rerenderFormSpy()
  }

  runFieldUpdaters = (name: string) => {
    const { updaters } = this.getField(name)
    for (const updater of updaters) {
      updater({}) // rerender field
    }
  }

  setFieldState = (name: string, fieldState: Partial<FieldState>) => {
    this.fields[name].state = {
      ...this.fields[name].state,
      ...fieldState,
    }

    this.runFieldUpdaters(name)

    // // render FieldSpy
    // for (const key of this.fieldSpyMap.keys()) {
    //   if (key.includes(name)) this.fieldSpyMap.get(key)?.({})
    // }

    // for (const fn of Formy.onFieldChangeCallbacks) {
    //   fn(this)
    // }
  }

  romveFieldState = (name: string) => {
    delete this.fieldStates[name]
  }

  getErrors = () => {
    const { fieldStates } = this
    let errors: any = {}
    for (const key in fieldStates) {
      const state = fieldStates[key]
      if (!state.visible) continue // skip invisible field
      const { error } = state

      setIn(errors, key, error)
    }
    return errors
  }

  getValues = () => {
    const { fieldStates } = this

    let values: any = {}
    for (const key in fieldStates) {
      const state = fieldStates[key]
      // if (Array.isArray(state)) continue // skip FieldArray state
      if (!state.visible) continue // skip invisible field

      const { value, transform } = state
      const finalValue = transform && typeof transform === 'function' ? transform(value) : value

      setIn(values, key, finalValue)
    }
    return values
  }

  userValidator = async (validatorOptions: ValidatorOptions): Promise<Errors> => {
    const { config: options } = this
    if (!options?.validate) return {}

    // function validate
    let validateFnErrors = options?.validate?.(validatorOptions)

    // sync validate
    if (!isPromise(validateFnErrors)) return validateFnErrors

    try {
      return (await validateFnErrors) as any
    } catch {
      return {}
    }
  }

  runValidators = async (options: ValidatorOptions): Promise<Errors> => {
    const promises = Formy.validators.map((validtor) => validtor(options))

    // run validate function
    promises.push(this.userValidator(options))

    const errorsArray = await Promise.all(promises)

    const errors = deepmerge.all(errorsArray)

    return errors
  }

  validateForm = async () => {
    const values = this.getValues()

    const [validatorErrors, fieldErrors] = await Promise.all([
      this.runValidators({
        ...this.getFormApi(),
        validationSchema: this.validationSchema,
        values,
      }),
      this.validateAllFields(),
    ])

    const errors = deepmerge(validatorErrors, fieldErrors) as any
    return errors
  }

  validateField = async (name: string): Promise<false | string> => {
    const state = this.getFieldState(name)
    const values = this.getValues()

    const [validatorErrors, fieldError] = await Promise.all([
      this.runValidators({
        ...this.getFormApi(),
        validationSchema: this.validationSchema,
        values,
      }),
      validateField({ fieldState: state, values }),
    ])

    const prevError = state.error
    const error = fieldError || getIn(validatorErrors, name)

    if (error === prevError || !error) return false

    return error
  }

  // TODO: handle nested
  setFieldErrors(errors: any) {
    for (const key in errors) {
      this.setFieldState(key, { error: errors[key] })
    }
  }

  touchAll = () => {
    for (const key in this.fieldStates) {
      const state = this.fieldStates[key]
      if (Array.isArray(state)) continue
      if (!state.touched) {
        this.setFieldState(key, { touched: true })
      }
    }
  }

  validateAllFields = async (): Promise<any> => {
    let errors: any = {}
    const values = {}
    for (const key in this.fieldStates) {
      const state = this.fieldStates[key]
      if (Array.isArray(state)) continue
      const error = await validateField({ fieldState: state, values })

      if (error && error !== state.error) {
        setIn(errors, key, error)
        this.setFieldState(key, { error })
      }
    }

    return errors
  }

  getInitialFieldValue = (field: FieldConfig) => {
    const { name } = field
    const initialValue = getIn(this.config.initialValues, name)
    return initialValue ?? field?.value
  }

  extractInitialFieldState = (field: FieldConfig) => {
    const value = Formy.getInitialFieldValue
      ? Formy.getInitialFieldValue(field, this)
      : this.getInitialFieldValue(field)
    const state = {
      value,
      visible: field.visible ?? true,
      label: field.label ?? null,
      showLabel: field.showLabel ?? true,
      required: field.required ?? false,
      description: field.description,
      focused: field.focused ?? false,
      component: field.component,
      componentProps: field.componentProps ?? {},
      display: field.display ?? true,
      touched: field.touched ?? false,
      disabled: field.disabled ?? false,
      pendding: field.pendding ?? false,
      status: field.status ?? 'editable',
      options: field.options ?? [],
      data: field.data ?? null,
      // validate: field.validate,
      rules: field.rules ?? {},
    } as FieldState

    if (field.error) state.error = field.error
    if (field.warnings) state.warnings = field.warnings
    if (field.onValueChange) state.onValueChange = field.onValueChange
    if (field.onFieldInit) state.onFieldInit = field.onFieldInit
    if (field.transform) state.transform = field.transform

    return state as FieldState
  }

  onFieldInit = (name: string) => {
    const fieldState = this.getFieldState(name)
    fieldState?.onFieldInit?.({
      ...fieldState,
      setFieldState: (name, fieldState) => {
        this.setFieldState(name, fieldState)
      },
    })
  }

  handleSubmit = async (e?: any) => {
    if (e && e.preventDefault) e.preventDefault()
    const { config } = this

    let valid: boolean = true
    const values = this.getValues()

    this.touchAll() // make all fields touched

    const errors = await this.validateForm()

    valid = checkValid(errors)

    if (valid) {
      config?.onSubmit?.(values, this.getFormApi())
    } else {
      this.setFieldErrors(errors)
      config?.onError?.(errors, this.getFormApi())
    }

    this.setFormState({
      valid,
      dirty: true,
      submitCount: this.formState.submitCount + 1,
    })
  }

  submitForm = this.handleSubmit

  resetForm = () => {
    // TODO:
    // this.fieldStates = this.fieldInitialStates
    this.formState = this.initialFormState
    this.rerenderForm({})
    this.config?.onReset?.(this.getFormApi())
  }

  blur = async (name: string) => {
    const error = await this.validateField(name)
    if (error) this.setFieldState(name, { touched: true, error })
  }

  change = async (name: string, value: any) => {
    this.setFieldState(name, { value }) // sync value

    const values = this.getValues()
    const fieldState = this.getFieldState(name)
    const fieldError = await validateField({ fieldState, values })
    const prevError = fieldState.error
    const error = fieldError || undefined

    if (prevError !== error) this.setFieldState(name, { error })

    /** field change callback, for Dependent fields  */
    fieldState?.onValueChange?.({
      ...fieldState,
      setFieldState: (name, fieldState) => {
        // make it async
        setTimeout(() => {
          this.setFieldState(name, fieldState)
        }, 0)
      },
    })
  }

  getFormApi = () => {
    return {
      initialValues: this.config.initialValues,
      getValues: this.getValues,
      getErrors: this.getErrors,
      setFormState: this.setFormState,
      getFormState: this.getFormState,
      setSubmitting: this.setSubmitting,
      setFieldState: this.setFieldState,
      getFieldState: this.getFieldState,
      validateForm: this.validateForm,
      validateField: this.validateField,
      handleSubmit: this.handleSubmit,
      submitForm: this.submitForm,
      resetForm: this.resetForm,
      formStore: this as FormStore,
    }
  }

  /**
   * extension data
   *
   * @type {*}
   * @memberof FormStore
   */
  data: any = {}
}
