import deepmerge from 'deepmerge'
import isPromise from 'is-promise'
import set from 'lodash.set'
import get from 'lodash.get'
import {
  Config,
  FormState,
  FieldState,
  ForceUpdate,
  Status,
  Errors,
  ValidatorOptions,
  FieldArrayStores,
  FieldUpdaters,
  FieldStates,
} from '../types'
import { fim } from '../fim'
import { checkValid, validateField } from '../utils'

/**
 * Form Store
 */
export class FormStore {
  constructor(public config: Config, public rerenderForm: ForceUpdate) {
    this.validationSchema = this.config.validationSchema
  }

  fieldStates: FieldStates = {}

  /**
   * For reset form
   * @type {FieldStates}
   * @memberof FormStore
   */
  fieldInitialStates: FieldStates = {}

  fieldUpdaters: FieldUpdaters = {}

  fieldArrayStores: FieldArrayStores = {}

  fieldSpyMap: Map<string[], ForceUpdate> = new Map()

  formSpyUpdaters: ForceUpdate[] = []

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

  setFieldUpdater = (name: string, updater: ForceUpdate) => {
    if (!this.fieldUpdaters[name]) this.fieldUpdaters[name] = []
    this.fieldUpdaters[name].push(updater)
  }

  getFormState = () => {
    return this.formState
  }

  rerenderFormSpy = () => {
    for (const updater of this.formSpyUpdaters) {
      updater({})
    }
  }

  setFormState = (formPartialState: Partial<FormState>) => {
    this.formState = {
      ...this.formState,
      ...formPartialState,
    }
    this.rerenderFormSpy()
  }

  setSubmitting = (submitting: boolean) => {
    this.formState.submitting = submitting
    this.rerenderFormSpy()
  }

  addFieldState = (name: string, fieldState: FieldState) => {
    this.fieldStates = {
      ...this.fieldStates,
      [name]: fieldState,
    }
  }

  addFieldInitialState = (name: string, fieldState: FieldState) => {
    this.fieldInitialStates = {
      ...this.fieldInitialStates,
      [name]: fieldState,
    }
  }

  getFieldState = (name: string) => {
    return this.fieldStates[name]
  }

  setFieldState = (name: string, fieldState: Partial<FieldState>) => {
    this.fieldStates = {
      ...this.fieldStates,
      [name]: {
        ...this.fieldStates[name],
        ...fieldState,
      },
    }

    for (const updater of this.fieldUpdaters[name]) {
      updater({}) // rerender field
    }

    // render FieldSpy
    for (const key of this.fieldSpyMap.keys()) {
      if (key.includes(name)) this.fieldSpyMap.get(key)?.({})
    }
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
      const { name, error } = state

      set(errors, name, error)
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

      const { name, value, transform } = state
      const finalValue = transform && typeof transform === 'function' ? transform(value) : value

      set(values, name, finalValue)
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
    const promises = fim.validators.map((validtor) => validtor(options))

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
    const error = fieldError || get(validatorErrors, name)

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
        set(errors, state.name, error)
        this.setFieldState(key, { error })
      }
    }

    return errors
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
      submitting: true,
      dirty: true,
      submitCount: this.formState.submitCount + 1,
    })
  }

  submitForm = this.handleSubmit

  resetForm = () => {
    this.fieldStates = this.fieldInitialStates
    this.formState = this.initialFormState
    this.rerenderForm({})
    this.config?.onReset?.(this.getFormApi())
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
}
