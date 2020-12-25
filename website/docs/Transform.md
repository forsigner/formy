---
id: transform
title: Transform
sidebar_label: Transform
---

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field
    name="firstName"
    label="First Name"
    component="Input"
    value=""
    transform={(value) => {
      return value + 'posfix'
    }}
  />
  <Field name="lastName" label="Last Name" component="Input" />
  <button type="submit">Submit</button>
</Form>
```
