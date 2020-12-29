import { FimPlugin } from './types'

export const builtinPlugin: FimPlugin = {
  rules: {
    required({ fieldState }, ruleValue) {
      // TODO: need improve
      return !fieldState.value ? ruleValue : undefined
    },

    arrayNotEmpty({ fieldState: { value = [] } }, ruleValue) {
      return value.length > 0 ? undefined : ruleValue
    },
    pattern({ fieldState }, rule) {
      try {
        const [regex, msg] = rule
        return regex.test(fieldState.value) ? undefined : msg
      } catch (error) {
        return
      }
    },

    minLength({ fieldState }, [len, msg]) {
      return fieldState.value?.length >= len ? undefined : msg
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
