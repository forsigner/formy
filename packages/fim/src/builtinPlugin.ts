import { FimPlugin } from './types'

export const builtinPlugin: FimPlugin = {
  rules: {
    required(value, msg) {
      // TODO: need improve
      return !value ? msg : undefined
    },

    arrayNotEmpty(value: any[], msg) {
      return value.length > 0 ? undefined : msg
    },

    pattern(value, [regex, msg]: [RegExp, string]) {
      return regex.test(value) ? undefined : msg
    },

    min(value, [base, msg]) {
      return value >= base ? undefined : msg
    },

    max(value, [base, msg]) {
      return value <= base ? undefined : msg
    },

    minLength(value, [len, msg]) {
      return value?.length >= len ? undefined : msg
    },

    maxLength(value, [len, msg]) {
      return value?.length <= len ? undefined : msg
    },

    equalTo(value, rule, { values }) {
      const [prop, msg] = rule
      return values?.[prop] === value ? undefined : msg
    },
  },
}
