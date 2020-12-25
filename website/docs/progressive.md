---
id: progressive
title: Progressive
sidebar_label: Progressive
---

First, import fim `<Form>` and `<Field>`:

```jsx
import { Form, Field } from 'fim'
```

The following live demo with code show the basic usage of fim:

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field name="firstName" component="input" placeholder="First Name" />
  <Field name="lastName" component="input" placeholder="Last name" />
  <button type="submit">Submit</button>
</Form>
```

## Use render props

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field name="firstName">
    {({ value, handleChange, handleBlur }) => (
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First Name"
        />
      </div>
    )}
  </Field>
  <Field name="lastName">
    {({ value, handleChange, handleBlur }) => (
      <div>
        <label>Last name</label>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Last name"
        />
      </div>
    )}
  </Field>
  <button type="submit">Submit</button>
</Form>
```

## Reducing boilerplate

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field name="firstName">
    {({ register }) => (
      <div>
        <label>First Name</label>
        <input type="text" {...register} />
      </div>
    )}
  </Field>
  <Field name="lastName">
    {({ register }) => (
      <div>
        <label>Last name</label>
        <input type="text" {...register} />
      </div>
    )}
  </Field>
  <button type="submit">Submit</button>
</Form>
```
