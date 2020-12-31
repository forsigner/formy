import React from 'react'
import { Box } from '@styli/react'
import { Form, Field } from '@formy/react'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        initialValues={{
          firstName: '',
          gender: 'male',
          colors: ['green'],
          bio: '',
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="First Name"
          name="firstName"
          component="Input"
          rules={{ required: 'Require First Name' }}
        />
        <Field
          label="Gender"
          name="gender"
          component="RadioGroup"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          rules={{ required: 'Please select gender' }}
        />
        <Field
          label="Colors"
          name="colors"
          component="CheckboxGroup"
          options={[
            { label: 'Red', value: 'red' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ]}
          rules={{ arrayNotEmpty: 'Please select color' }}
        />

        <Field label="Bio" name="bio" component="Textarea" />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
