import React from 'react'
import { Box } from '@styli/react'
import { Form, Field } from 'fim'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        initialValues={{
          profile: {
            firstName: '',
            lastName: '',
          },
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field label="First Name" name="profile.firstName" component="Input" />
        <Field label="Last Name" name="profile.lastName" component="Input" />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
