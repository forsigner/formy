---
id: validation
title: Validation
sidebar_label: Validation
---

## Validation Rule

```jsx live
<Form
  onError={(errors) => {
    console.log('errors:', errors)
  }}
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <Field name="firstName" rules={{ required: 'Username is required' }}>
    {({ register, error, touched }) => (
      <div>
        <label>First Name</label>
        <input type="text" {...register} />
        {error && touched && <span className="error">{error}</span>}
      </div>
    )}
  </Field>
  <Field name="lastName" rules={{ pattern: [/foo/, 'should contain foo'] }}>
    {({ register, error, touched }) => (
      <div>
        <label>Last name</label>
        <input type="text" {...register} />
        {error && touched && <span className="error">{error}</span>}
      </div>
    )}
  </Field>
  <button type="submit">Submit</button>
</Form>
```
