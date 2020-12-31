import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, FormSpy } from '@formy/core'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onSubmit={(values) => {
          console.log('values:', values)
        }}
      >
        <FormSpy>{({ submitCount }) => <span>submitCount:{submitCount}</span>}</FormSpy>
        <Field name="firstName" label="First Name" component="Input" />
        <Field name="lastName" label="Last Name" component="Input" />

        <button type="submit">Submit</button>
      </Form>

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
    </Box>
  )
}
