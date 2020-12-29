import React from 'react'
import { Box } from '@styli/react'
import { Form, Field, FieldArray } from 'fim'
import { Debug } from 'fim-debug'
;[1, 2, 3, 4]
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
            {
              firstName: 'hello',
              lastName: 'world',
            },

            {
              firstName: 'foo',
              lastName: 'bar',
            },
          ],
        }}
        onSubmit={(values) => {
          // alert(JSON.stringify(values, null, 2))
          console.log('values:', values)
        }}
      >
        <FieldArray name="friends">
          {({ fields, push, remove, unshift, swap, move, isFirst, isLast }) => (
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
                    name={`friends[${index}].lastName`}
                    component="Input"
                  ></Field>

                  <button type="button" onClick={() => remove(index)}>
                    -
                  </button>

                  <button
                    disabled={isFirst(index)}
                    type="button"
                    onClick={() => swap(index, index - 1)}
                  >
                    上移
                  </button>
                  <button
                    disabled={isLast(index)}
                    type="button"
                    onClick={() => swap(index, index + 1)}
                  >
                    下移
                  </button>
                </Box>
              ))}

              <button
                type="button"
                onClick={() => push({ firstName: `new Friend ${fields.length}`, lastName: '' })}
              >
                add
              </button>

              <button
                type="button"
                onClick={() => unshift({ firstName: `new Friend ${fields.length}`, lastName: '' })}
              >
                unshift
              </button>

              <button type="button" onClick={() => move(1, 3)}>
                move(1,3)
              </button>
            </Box>
          )}
        </FieldArray>

        <button type="submit">Submit</button>

        {/* <Debug>{({ values }) => <pre>{JSON.stringify(values, null, 2)}</pre>}</Debug> */}
        <Debug>{({ fieldStates }) => <pre>{JSON.stringify(fieldStates, null, 2)}</pre>}</Debug>
      </Form>
    </div>
  )
}
