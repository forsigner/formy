---
id: onFieldInit
title: onFieldInit
sidebar_label: onFieldInit
---

```tsx
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field
    label="Colors"
    name="colors"
    component="CheckboxGroup"
    value={['green']}
    options={[]}
    onFieldInit={async ({ setField }) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setField('colors', (field) => {
        field.options = [
          { label: 'Red', value: 'red' },
          { label: 'Green', value: 'green' },
          { label: 'Blue', value: 'blue' },
        ]
      })
    }}
  />
  <button type="submit">Submit</button>
</Form>
```
