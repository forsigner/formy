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
        <Field
          label="Comment"
          name="comment"
          component="Textarea"
          value=""
          onValueChange={({ value, setFieldState }) => {
            if (!value.includes('foo')) return
            setFieldState('comment', {
              value: value.replace(/foo/, '***'),
            })
          }}
        />

        <button type="submit">Submit</button>
      </Form>

      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="First Name (disabled if length>6)"
          name="firstName"
          component="Input"
          value=""
          onValueChange={({ value, setFieldState }) => {
            setFieldState('firstName', {
              disabled: value.length > 6,
            })
          }}
        />

        <button type="submit">Submit</button>
      </Form>

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
          onValueChange={({ value, setFieldState }) => {
            setFieldState<string>('firstName', {
              value: value.toUpperCase(),
            })
          }}
        />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
