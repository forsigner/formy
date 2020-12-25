---
id: dependent-fields-options
title: Options
sidebar_label: Options
---

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field
    label="You like a cat or dog?"
    name="type"
    component="RadioGroup"
    options={[
      { label: 'Cat', value: 'cat' },
      { label: 'Dog', value: 'dog' },
    ]}
    onValueChange={({ value, setField }) => {
      setField('animal', (field) => {
        const cats = [
          { label: 'American Bobtai', value: 'American Bobtai' },
          { label: 'Bengal', value: 'Bengal' },
          { label: 'Oriental Shorthair', value: 'Oriental Shorthair' },
        ]
        const dogs = [
          { label: 'Husky', value: 'Husky' },
          { label: 'Golden Retriever', value: 'Golden Retriever' },
          { label: 'Corgi', value: 'Corgi' },
          { label: 'Akita Inu', value: 'Akita Inu' },
        ]
        setField('animal', (field) => {
          field.options = value === 'cat' ? cats : dogs
          field.disabled = !value
        })
      })
    }}
  />

  <Field label="Animal" name="animal" component="Select" disabled options={[]} />

  <button type="submit">Submit</button>
</Form>
```
