import { Plugin, Validator } from './types'

class Fim {
  Form: any = null
  Fields: any = {}
  validators: Validator[] = []
  rules: { [key: string]: any } = {}

  use = (plugin: Plugin) => {
    if (plugin.Form) this.Form = plugin.Form

    this.Fields = {
      ...this.Fields,
      ...(plugin.Fields || {}),
    }

    this.rules = {
      ...this.rules,
      ...(plugin.rules || {}),
    }

    const { validator } = plugin

    if (validator && !this.validators.includes(validator)) {
      this.validators.push(validator)
    }
  }
}

export const fim = new Fim()
