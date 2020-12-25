---
id: dependent-fields-visible
title: Visible
sidebar_label: Visible
---

```jsx live
<Form
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field
    label="Have some advice?"
    name="advice"
    component="Checkbox"
    value={false}
    onValueChange={({ value, setField }) => {
      setField('myAdvice', (field) => {
        field.visible = value
      })
    }}
  />
  <Field label="My advice:" name="myAdvice" component="Textarea" value="" visible={false} />
  <button type="submit">Submit</button>
</Form>
```
