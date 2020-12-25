import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, useForm } from 'fim'

export const UseFormExample = () => {
  const registerForm = useForm({
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Form hook={registerForm}>
      <Field name="firstName" label="First Name" component="Input" />
      <Field name="lastName" label="Last Name" component="Input" />

      <Box spaceX-8 mb-20>
        <button
          type="button"
          onClick={() => {
            registerForm.setFieldState('firstName', {
              value: Date.now(),
            })
          }}
        >
          Update First Name
        </button>
        <button type="submit">Submit</button>
      </Box>
    </Form>
  )
}
