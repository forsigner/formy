---
id: use-form
title: 'useForm()'
sidebar_label: 'useForm()'
---

import { UseFormExample } from '../src/components/UseFormExample'

<UseFormExample />

```jsx
const RegisterForm = () => {
  const registerForm = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Form use={registerForm}>
      <Field name="firstName" label="First Name" component="Input" />
      <Field name="lastName" label="Last Name" component="Input" />

      <Box spaceX-8>
        <button
          type="button"
          onClick={() => {
            registerForm.setFieldState('firstName', (field) => {
              field.value = Date.now()
            })
          }}
        >
          Update First Name
        </button>
        <button type="submit">Submit</button>
      </Box>
    </Form>
  )
}
```
