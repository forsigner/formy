import { Plugin } from 'fim'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'
import { Checkbox } from './fields/Checkbox'
import { RadioGroup } from './fields/RadioGroup'
import { CheckboxGroup } from './fields/CheckboxGroup'

export const fimUnstyled: Plugin = {
  Fields: {
    Input,
    Textarea,
    Checkbox,
    RadioGroup,
    CheckboxGroup,
  },
  Form,
}

export default fimUnstyled
