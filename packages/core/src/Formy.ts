import {
  FormyPlugin,
  GetInitialFieldValue,
  OnFieldStateChange,
  OnFormStateChange,
  Validator,
} from './types'

export class Formy {
  static Form: any = null
  static Fields: any = {}
  static validators: Validator[] = []
  static rules: { [key: string]: any } = {}

  static onFormStateChangeCallbacks: OnFormStateChange[] = []
  static onFieldChangeCallbacks: OnFieldStateChange[] = []
  static getInitialFieldValue: GetInitialFieldValue = () => {}

  static use = (plugin: FormyPlugin) => {
    const { validator, Form, onFormStateChange, onFieldChange, getInitialFieldValue } = plugin
    if (Form) Formy.Form = Form

    Formy.Fields = {
      ...Formy.Fields,
      ...plugin.Fields,
    }

    Formy.rules = {
      ...Formy.rules,
      ...plugin.rules,
    }

    if (onFormStateChange) {
      Formy.onFormStateChangeCallbacks.push(onFormStateChange)
    }

    if (onFieldChange) {
      Formy.onFieldChangeCallbacks.push(onFieldChange)
    }

    if (getInitialFieldValue) {
      Formy.getInitialFieldValue = getInitialFieldValue
    }

    if (validator && !Formy.validators.includes(validator)) {
      Formy.validators.push(validator)
    }
  }
}

export const use = Formy.use
