import { Formy, FormyPlugin } from '@formy/core'
export { Debug } from './Debug'

export const FormyDebug: FormyPlugin = {
  onFormStateChange(formStore) {
    const debugUpdaters: any[] = formStore.data?.debugUpdaters || []
    for (const updater of debugUpdaters) {
      updater({})
    }
  },

  onFieldChange(_, formStore) {
    const debugUpdaters: any[] = formStore.data?.debugUpdaters || []
    for (const updater of debugUpdaters) {
      updater({})
    }
  },
}

Formy.use(FormyDebug)
