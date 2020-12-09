import { registerField, registerForm } from 'fim'
import { Form } from './Form'
import { Input } from './fields/Input'
import { Textarea } from './fields/Textarea'
// export { entity, field, Form, Field, useForm } from 'fim'

export function registerAll() {
  registerForm(Form)

  // 注册表单控件
  registerField('Input', Input)
  registerField('Textarea', Textarea)
}
