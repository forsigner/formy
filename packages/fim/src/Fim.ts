import { FimPlugin, GetInitialFieldValue, OnFormStateChange, Validator } from './types'

export class Fim {
  static Form: any = null
  static Fields: any = {}
  static validators: Validator[] = []
  static rules: { [key: string]: any } = {}

  static onFormStateChangeCallbacks: OnFormStateChange[] = []
  static onFieldChangeCallbacks: OnFormStateChange[] = []
  static getInitialFieldValue: GetInitialFieldValue = () => {}

  static use = (plugin: FimPlugin) => {
    const { validator, Form, onFormStateChange, onFieldChange, getInitialFieldValue } = plugin
    if (Form) Fim.Form = Form

    Fim.Fields = {
      ...Fim.Fields,
      ...(plugin.Fields || {}),
    }

    Fim.rules = {
      ...Fim.rules,
      ...(plugin.rules || {}),
    }

    if (onFormStateChange) {
      Fim.onFormStateChangeCallbacks.push(onFormStateChange)
    }

    if (onFieldChange) {
      Fim.onFieldChangeCallbacks.push(onFieldChange)
    }

    if (getInitialFieldValue) {
      Fim.getInitialFieldValue = getInitialFieldValue
    }

    if (validator && !Fim.validators.includes(validator)) {
      Fim.validators.push(validator)
    }
  }
}
