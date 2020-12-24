import { FimPlugin } from './types'

export const builtinPlugin: FimPlugin = {
  rules: {
    required({ fieldState }, rule) {
      // TODO: need improve
      return !fieldState.value ? rule : undefined
    },

    arrayNotEmpty({ fieldState: { value = [] } }, rule) {
      return value.length > 0 ? undefined : rule
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
