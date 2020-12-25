import React, { useEffect, useState } from 'react'
import { Box } from '@styli/react'
import { Form, Field } from 'fim'

export default () => {
  const list = new Array(2000).fill(() => null)
  return (
    <Box p-100>
      <h2>Large Forms</h2>
      <Form
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {list.map((_, i) => (
          <Field key={i} value="" label={`field_${i}`} name={`field_${i}`}>
            {({ value, handleChange }) => <input value={value} onChange={handleChange} />}
          </Field>
        ))}
        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
