import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, FormSpy } from '@formy/core'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        initialValues={{
          firstName: 'Bill',
          lastName: 'John',
        }}
        onSubmit={(values) => {
          console.log('values:', values)
        }}
        onReset={() => {
          console.log('onReset....')
        }}
      >
        <FormSpy>{({ submitCount }) => <span>{submitCount}</span>}</FormSpy>
        <Field
          name="firstName"
          label="First Name"
          component="Input"
          rules={{ required: 'required First Name' }}
        />
        <Field name="lastName" label="Last Name" component="Input" />
        <button type="submit">Submit</button>
        <FormSpy>
          {({ resetForm }) => (
            <button type="reset" onClick={resetForm}>
              Reset
            </button>
          )}
        </FormSpy>
      </Form>
    </Box>
  )
}
