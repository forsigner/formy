---
id: field-array
title: Field Array
sidebar_label: Field Array
---

```jsx live
<Form
  name="array"
  values={{
    friends: [
      {
        firstName: 'Bill',
        lastName: 'John',
      },
    ],
  }}
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2))
  }}
>
  <FieldArray name="friends">
    {({ fields, push, remove }) => (
      <Box>
        {fields.map((item, index) => (
          <Box key={index} left centerY spaceX-8>
            <Field
              label="First Name"
              name={`friends[${index}].firstName`}
              component="Input"
            ></Field>
            <Field label="Last Name" name={`friends[${index}].lastName`} component="Input"></Field>
            <button type="button" onClick={() => remove(index)}>
              -
            </button>
          </Box>
        ))}
        <button
          type="button"
          onClick={() => push({ firstName: `new Friend ${fields.length}`, lastName: '' })}
        >
          +
        </button>
      </Box>
    )}
  </FieldArray>

  <button type="submit">Submit</button>
</Form>
```
