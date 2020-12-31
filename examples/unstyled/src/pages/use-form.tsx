import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, useForm } from '@formy/core'

export default () => {
  const registerForm = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <Form hook={registerForm}>
      <Field name="firstName" label="First Name" component="Input" />
      <Field name="lastName" label="Last Name" component="Input" />

      <Box spaceX-8>
        <button
          type="button"
          onClick={() => {
            registerForm.setFieldState('firstName', { value: Date.now() })
          }}
        >
          Update firstName
        </button>
        <button type="submit">Submit</button>
      </Box>
    </Form>
  )
}
