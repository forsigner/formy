import { Formy } from '../src/Formy'
import { FormyPlugin } from '../src/types'

test('required fail', () => {
  const Input = () => {}
  const Form = () => {}

  const MyPlugin: FormyPlugin = {
    Fields: {
      Input,
    },
    Form,
    rules: {
      equalToFoo: (value, msg) => {
        return value === 'foo' ? undefined : msg
      },
    },
    onFormStateChange: () => {},
    onFieldChange: () => {},
    getInitialFieldValue: () => {},
    async validator() {
      return {}
    },
  }

  Formy.use(MyPlugin)
  /** rules */
  expect(Object.keys(Formy.rules).length).toBe(1)
  expect(Object.keys(Formy.rules)[0]).toBe('equalToFoo')

  /** Fields */
  expect(Object.keys(Formy.Fields).length).toBe(1)
  expect(Object.keys(Formy.Fields)[0]).toBe('Input')

  expect(Object.keys(Formy.onFieldChangeCallbacks).length).toBe(1)
  expect(Object.keys(Formy.onFormStateChangeCallbacks).length).toBe(1)
  expect(Formy.validators.length).toBe(1)
  expect(typeof Formy.getInitialFieldValue).toBe('function')
})
