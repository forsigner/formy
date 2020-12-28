import { FimPlugin, OnFormStateChange, Validator } from './types'

class Fim {
  Form: any = null
  Fields: any = {}
  validators: Validator[] = []
  rules: { [key: string]: any } = {}

  onFormStateChangeCallbacks: OnFormStateChange[] = []
  onFieldChangeCallbacks: OnFormStateChange[] = []

  use = (plugin: FimPlugin) => {
    const { validator, Form, onFormStateChange, onFieldChange } = plugin
    if (Form) this.Form = Form

    this.Fields = {
      ...this.Fields,
      ...(plugin.Fields || {}),
    }

    this.rules = {
      ...this.rules,
      ...(plugin.rules || {}),
    }

    if (onFormStateChange) {
      this.onFormStateChangeCallbacks.push(onFormStateChange)
    }

    if (onFieldChange) {
      this.onFieldChangeCallbacks.push(onFieldChange)
    }

    if (validator && !this.validators.includes(validator)) {
      this.validators.push(validator)
    }
  }
}

export const fim = new Fim()
