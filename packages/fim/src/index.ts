export * from './components/Form'
export * from './components/FormSpy'
export * from './components/Field'
export * from './components/FieldSpy'
export * from './hooks/useForm'
export * from './formContext'
export * from './Fim'
export * from './utils'
export * from './types'

import { Fim } from './Fim'
import { builtinPlugin } from './builtinPlugin'

//init built-in plugin
Fim.use(builtinPlugin)
