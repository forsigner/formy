import { Formy } from '@formy/core'

export * from './components/Form'
export * from './components/FormSpy'
export * from './components/Field'
export * from './components/FieldSpy'
export * from './hooks/useForm'
export * from './formContext'
export * from './utils'
export * from './types'

Formy.use({
  onFieldChange(name, formStore) {
    const fieldSpyUpdaterMap = formStore.data?.fieldSpyUpdaterMap
    if (fieldSpyUpdaterMap) {
      // render FieldSpy
      for (const key of fieldSpyUpdaterMap.keys()) {
        if (key.includes(name)) fieldSpyUpdaterMap.get(key)?.({})
      }
    }
  },

  onFormStateChange(formStore) {
    const formSpyUpdaters: any[] = formStore.data.formSpyUpdaters || []
    for (const updater of formSpyUpdaters) {
      updater({})
    }
  },
})
