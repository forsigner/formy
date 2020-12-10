import { Validator } from './types'

export class Fim {
  static FieldStore: any = {}
  static FormComponent: any
  static SubmitComponent: any
  static ResetComponent: any
  static Validators: Validator[] = []

  static registerValidator(validator: Validator) {
    if (Fim.Validators.includes(validator)) return
    Fim.Validators.push(validator)
  }

  static registerField(name: string, cmp: any) {
    Fim.FieldStore[name] = cmp
  }

  static registerForm(cmp: any) {
    Fim.FormComponent = cmp
  }

  static registerSubmit(cmp: any) {
    Fim.SubmitComponent = cmp
  }

  static registerReset(cmp: any) {
    Fim.ResetComponent = cmp
  }
}

export const registerField = Fim.registerField
export const registerForm = Fim.registerForm
export const registerSubmit = Fim.registerSubmit
export const registerReset = Fim.registerReset
export const registerValidator = Fim.registerValidator
