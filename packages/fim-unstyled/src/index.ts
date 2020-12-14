import { Plugin } from 'fim'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'

export const fimUnstyled: Plugin = {
  Fields: {
    Input,
    Textarea,
  },
  Form,
}

export default fimUnstyled
