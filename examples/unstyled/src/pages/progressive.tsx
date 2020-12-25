import React from 'react'
import { Box } from '@styli/react'
import { Form, Field } from 'fim'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName">
          {({ value, handleChange, handleBlur }) => (
            <div>
              <label>First Name</label>
              <input type="text" value={value} onChange={handleChange} onBlur={handleBlur} />
            </div>
          )}
        </Field>
        <Field name="lastName">
          {({ value, handleChange, handleBlur }) => (
            <div>
              <label>Last name</label>
              <input type="text" value={value} onChange={handleChange} onBlur={handleBlur} />
            </div>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Form>

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
    </Box>
  )
}
