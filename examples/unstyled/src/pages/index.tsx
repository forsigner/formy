import React, { useEffect, useState } from 'react'
import { Box } from '@styli/react'
import { Form, Field } from '@formy/react'

export default () => {
  const [values, setValues] = useState({
    firstName: 'Bill',
    lastName: 'John',
  })

  useEffect(() => {
    setTimeout(() => {
      setValues({
        firstName: ' Smith',
        lastName: 'James',
      })
    }, 2000)
  }, [])

  return (
    <Box p-100>
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="Checked?"
          name="checked"
          component="Checkbox"
          value={false}
          onValueChange={({ value, setFieldState }) => {
            setFieldState('foo', { disabled: value })
          }}
        />
        <Field
          label="Foo"
          name="foo"
          component="Input"
          value="fofofo"
          onValueChange={({ setFieldState }) => {
            setFieldState('bar', {
              value: 'I am show if foo disabled',
            })
          }}
        />
        <Field label="Bar" name="bar" component="Input" value="" />
        <button type="submit">Submit</button>
      </Form>

      <Form
        initialValues={values}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field name="firstName" label="First Name" component="Input" />
        <Field name="lastName" label="Last Name" component="Input" />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
