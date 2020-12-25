---
id: FormSpy
title: FormSpy
sidebar_label: FormSpy
---

```jsx live
<Form
  onSubmit={(values, { setSubmitting }) => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      alert(JSON.stringify(values, null, 2))
    }, 2000)
  }}
>
  <Field name="firstName" label="First Name" component="Input" />
  <Field name="lastName" label="Last Name" component="Input" />
  <FormSpy>
    {({ submitting }) => (
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting' : 'Submit'}
      </button>
    )}
  </FormSpy>
</Form>
```
