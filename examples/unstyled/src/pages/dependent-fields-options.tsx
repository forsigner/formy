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
          label="You like a cat or dog?"
          name="type"
          component="RadioGroup"
          options={[
            { label: 'Cat', value: 'cat' },
            { label: 'Dog', value: 'dog' },
          ]}
          onValueChange={({ value, setFieldState }) => {
            const cats = [
              { label: 'American Bobtai', value: 'American Bobtai' },
              { label: 'Bengal', value: 'Bengal' },
              { label: 'Oriental Shorthair', value: 'Oriental Shorthair' },
            ]
            const dogs = [
              { label: 'Husky', value: 'Husky' },
              { label: 'Golden Retriever', value: 'Golden Retriever' },
              { label: 'Corgi', value: 'Corgi' },
              { label: 'Akita Inu', value: 'Akita Inu' },
            ]
            setFieldState('animal', {
              options: value === 'cat' ? cats : dogs,
              disabled: !value,
            })
          }}
        />

        <Field label="Animal" name="animal" component="Select" options={[]} />

        <button type="submit">Submit</button>
      </Form>
    </Box>
  )
}
