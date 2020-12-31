import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, FormSpy } from '@formy/core'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="Colors"
          name="colors"
          component="CheckboxGroup"
          value={['green']}
          options={[]}
          onFieldInit={async ({ setFieldState }) => {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setFieldState('colors', {
              options: [
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Blue', value: 'blue' },
              ],
            })
          }}
        />
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
