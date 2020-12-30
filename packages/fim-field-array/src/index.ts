import { Fim } from 'fim'
import { last } from 'fim-utils'
export * from './FieldArray'
export * from './useFieldArray'
export * from './types'

Fim.use({
  getInitialFieldValue(field, formStore) {
    const { name } = field
    const defaultValue = formStore.getInitialFieldValue(field)
    const arrayKeyRegex = /\[\d+\]\.[a-z_$]+$/i

    // is child of ArrayField
    const isArrayKey = arrayKeyRegex.test(name)
    if (!isArrayKey) return defaultValue

    const arrayFieldKey = name.replace(arrayKeyRegex, '')

    const arrayFieldState: any[] = formStore.data.fieldArrayStores[arrayFieldKey]

    const find = arrayFieldState.find((_, index) => name.includes(`[${index}]`))
    const prop = last(name.split('.'))
    return find?.[prop]
  },
})
