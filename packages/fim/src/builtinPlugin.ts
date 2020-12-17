import { Plugin } from './types'

export const builtinPlugin: Plugin = {
  rules: {
    required({ fieldState }, rule) {
      // TODO: need improve
      return !fieldState.value ? rule : undefined
    },
    pattern({ fieldState }, rule) {
      try {
        const [regex, msg] = rule
        return regex.test(fieldState.value) ? undefined : msg
      } catch (error) {
        return
      }
    },

    equalTo({ fieldState, values }, rule) {
      try {
        const [prop, msg] = rule
        return values[prop] === fieldState.value ? undefined : msg
      } catch (error) {
        return
      }
    },
  },
}
