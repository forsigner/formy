import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, FieldSpy } from '@formy/react'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onSubmit={(values) => {
          console.log('values:', values)
        }}
      >
        <FieldSpy name="firstName">{({ value }) => <span>{value}</span>}</FieldSpy>
        <Field name="firstName" label="First Name" component="Input" />
        <Field name="lastName" label="Last Name" component="Input" />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
