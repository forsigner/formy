import { FimPlugin } from 'fim'

export { Debug } from './Debug'

export const fimDebug: FimPlugin = {
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
