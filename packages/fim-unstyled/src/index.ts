import { Plugin } from 'fim'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'
import { RadioGroup } from './fields/RadioGroup'
import { CheckboxGroup } from './fields/CheckboxGroup'

export const fimUnstyled: Plugin = {
  Fields: {
    Input,
    Textarea,
    RadioGroup,
    CheckboxGroup,
  },
  Form,
}

export default fimUnstyled
