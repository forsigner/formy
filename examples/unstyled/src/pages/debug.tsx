import React from 'react'
import { Box } from '@styli/react'
import { Form, Field } from '@formy/react'
import { Debug } from '@formy/debug'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onError={(e) => {
          console.log('e:', e)
        }}
        onSubmit={(values) => {
          console.log('values:', values)
        }}
      >
        <Debug>{({ values }) => <pre>{JSON.stringify(values, null, 2)}</pre>}</Debug>
        <Field label="First Name" name="firstName" component="Input" />
        <Field label="Last Name" name="lastName" component="Input" />
        <button type="submit">Submit</button>
      </Form>

      <Form
        onError={(e) => {
          console.log('e:', e)
        }}
        onSubmit={(values) => {
          console.log('values:', values)
        }}
      >
        <Debug></Debug>
        <Field label="First Name" name="firstName" component="Input" />
        <Field label="Last Name" name="lastName" component="Input" />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
