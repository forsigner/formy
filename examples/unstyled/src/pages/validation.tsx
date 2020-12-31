import React from 'react'
import { Box } from '@styli/react'
import { Form, Field } from '@formy/react'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onError={(e) => {
          console.log('e:', e)
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
              {error && touched && <span>{error}</span>}
            </div>
          )}
        </Field>
        <Field name="lastName" rules={{ pattern: [/foo/, 'should contain foo'] }}>
          {({ register, error, touched }) => (
            <div>
              <label>Last name</label>
              <input type="text" {...register} />
              {error && touched && <span>{error}</span>}
            </div>
          )}
        </Field>
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
