---
id: async-options
title: Async Options
sidebar_label: Async Options
---

```jsx live
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
    onFieldInit={({ setField }) => {
      new Promise((resolve) => {
        setTimeout(() => {
          setField('colors', (field) => {
            field.options = [
              { label: 'Red', value: 'red' },
              { label: 'Green', value: 'green' },
              { label: 'Blue', value: 'blue' },
            ]
          })
          resolve()
        }, 2000)
      })
    }}
  />
  <button type="submit">Submit</button>
</Form>
```
