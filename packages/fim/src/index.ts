export * from './components/Form'
export * from './components/FormSpy'
export * from './components/Field'
export * from './components/FieldSpy'
export * from './components/FieldArray'
export * from './hooks/useForm'
export * from './hooks/useFieldArray'
export * from './fim'
export * from './utils'
export * from './types'

import { fim } from './fim'
import { builtinPlugin } from './builtinPlugin'

//init built-in plugin
fim.use(builtinPlugin)
