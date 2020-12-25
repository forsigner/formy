---
id: dependent-fields-self
title: Depend Self
sidebar_label: Depend Self
---

### Comment

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field
    label="Comment"
    name="comment"
    component="Textarea"
    value=""
    onValueChange={({ value, setFieldState }) => {
      if (!value.includes('foo')) return
      setFieldState('comment', {
        value: value.replace(/foo/, '***'),
      })
    }}
  />

  <button type="submit">Submit</button>
</Form>
```

## Disabled

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field
    label="First Name (disabled if length>6)"
    name="firstName"
    component="Input"
    value=""
    onValueChange={({ value, setField }) => {
      setField('firstName', (field) => {
        field.disabled = value.length > 6
      })
    }}
  />

  <button type="submit">Submit</button>
</Form>
```

## Format

```tsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field
    name="firstName"
    label="First Name"
    component="Input"
    onValueChange={({ setField }) => {
      setField('firstName', (field) => {
        field.value = field.value.toUpperCase()
      })
    }}
  />
  <button type="submit">Submit</button>
</Form>
```
