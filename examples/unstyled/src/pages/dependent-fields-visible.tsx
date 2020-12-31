import React from 'react'
import { Box } from '@styli/react'
import { Form, Field } from '@formy/core'

export default () => {
  return (
    <Box spaceY-40>
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <Field
          label="Have some advice?"
          name="advice"
          component="Checkbox"
          value={false}
          onValueChange={({ value, setFieldState }) => {
            setFieldState('myAdvice', { visible: !!value })
          }}
        />

        <Field label="My advice:" name="myAdvice" component="Textarea" value="" visible={false} />

        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
