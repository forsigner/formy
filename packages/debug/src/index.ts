import { Formy, FormyPlugin } from '@formy/core'
export { Debug } from './Debug'

export const FormyDebug: FormyPlugin = {
  onFormStateChange(formStore) {
    const debugUpdaters: any[] = formStore.commonUpdaterMap.debug || []
    for (const fn of debugUpdaters) {
      fn({})
    }
  },

  onFieldChange(formStore) {
    const debugUpdaters: any[] = formStore.commonUpdaterMap.debug || []
    for (const fn of debugUpdaters) {
      fn({})
    }
  },
}

Formy.use(FormyDebug)
