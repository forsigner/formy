import { fim } from 'fim'

import { fimUnstyled } from 'fim-unstyled'
import { fimYupValidator } from 'fim-yup-validator'
import { fimDebug } from 'fim-debug'
import './global.less'

fim.use(fimUnstyled)
fim.use(fimYupValidator)
fim.use(fimDebug)
