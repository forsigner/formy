import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, FieldRegisterProps } from '@formy/core'

function Input(props: FieldRegisterProps) {
  const { label, error, touched, value = '', register } = props
  return (
    <div>
      <label>{label}</label>
      <input type="text" {...register} value={value} />
      {error && touched && <span className="error">{error}</span>}
    </div>
  )
}

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
        <Field label="First Name" name="firstName" component={Input} />
        <Field label="Last Name" name="lastName" component={Input} />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
