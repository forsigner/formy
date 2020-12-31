export * from './components/Form'
export * from './components/FormSpy'
export * from './components/Field'
export * from './components/FieldSpy'
export * from './hooks/useForm'
export * from './formContext'
export * from './Formy'
export * from './utils'
export * from './types'

import { Formy } from './Formy'
import { builtinPlugin } from './builtinPlugin'

//init built-in plugin
Formy.use(builtinPlugin)
