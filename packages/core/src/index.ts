export * from './Formy'
export * from './FormStore'
export * from './types'

import { Formy } from './Formy'
import { builtinPlugin } from './builtinPlugin'

//init built-in plugin
Formy.use(builtinPlugin)
