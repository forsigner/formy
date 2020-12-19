export * from './hooks/useForm'
export * from './hooks/useField'
export * from './formContext'
export * from './components/Form'
export * from './components/Field'
export * from './components/FieldSpy'
export * from './components/FormSpy'
export * from './components/FieldArray'
export * from './components/FormValues'
export * from './types'
export * from './fim'
export { isNative } from './utils'

import { fim } from './fim'
import { builtinPlugin } from './builtinPlugin'

//init built-in plugin
fim.use(builtinPlugin)
