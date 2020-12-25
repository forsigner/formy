import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, FieldArray } from 'fim'

export default () => {
  return (
    <div>
      <div>Friends</div>
      <Form
        name="array"
        initialValues={{
          friends: [
            {
              firstName: 'Bill',
              lastName: 'John',
            },
          ],
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <FieldArray name="friends">
          {({ fields, push, remove }) => (
            <Box>
              <pre>{JSON.stringify(fields, null, 2)}</pre>
              {fields.map((item, index) => (
                <Box key={index} left>
                  <Field
                    label="First Name"
                    name={`friends[${index}].firstName`}
                    component="Input"
                  ></Field>
                  <Field
                    label="Last Name"
                    name={`friends[${item.id}].lastName`}
                    component="Input"
                  ></Field>

                  <button type="button" onClick={() => remove(index)}>
                    -
                  </button>
                </Box>
              ))}

              <button
                type="button"
                onClick={() => push({ firstName: `new Friend ${fields.length}`, lastName: '' })}
              >
                +
              </button>
            </Box>
          )}
        </FieldArray>

        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}
