import React from 'react'
import { Box } from '@styli/react'
import { Form, Field } from '@formy/core'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          name="firstName"
          label="First Name"
          component="Input"
          value=""
          transform={(value) => {
            return value + 'posfix'
          }}
        />
        <Field name="lastName" label="Last Name" component="Input" />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
