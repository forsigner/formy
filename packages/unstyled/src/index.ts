import { FormyPlugin } from '@formy/core'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'
import { Checkbox } from './fields/Checkbox'
import { RadioGroup } from './fields/RadioGroup'
import { CheckboxGroup } from './fields/CheckboxGroup'
import { Select } from './fields/Select'

export const FormyUnstyled: FormyPlugin = {
  Fields: {
    Input,
    Textarea,
    Checkbox,
    RadioGroup,
    CheckboxGroup,
    Select,
  },
  Form,
}

export default FormyUnstyled
