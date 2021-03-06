---
id: custom-field
title: Custom Field
sidebar_label: Custom Field
---

## Why need to custom Field

```js live
function App() {
  return (
    <Form
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <Field label="First Name" name="firstName" component={Input} />
      <Field label="Last Name" name="lastName" component={Input} />
      <button type="submit">Submit</button>
    </Form>
  )
}
```

## How to custom Field

```jsx
import { FieldRegisterProps } from '@formy/react'
function Input(props: FieldRegisterProps) {
  const { label, error, touched, value = '', register } = props
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...register} value={value} />
      {error && touched && <span className="error">{error}</span>}
    </div>
  )
}
```
