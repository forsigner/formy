import React, { useState } from 'react'
import { Box } from '@styli/react'
import { Form, Field, FieldArray, FieldSpy, FormSpy, useForm } from '@formy/core'
import * as yup from 'yup'

function Input({ index }: any) {
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          console.log('e', e.target.value)
          setValue(e.target.value)
        }}
      />
    </div>
  )
}

const TodoList = () => {
  return (
    <div>
      <div>Friends</div>
      <Form
        initialValues={{
          firstName: 'foo',
          friends: [
            {
              firstName: 'Bill',
              lastName: 'John',
            },
          ],
        }}
        onSubmit={(values) => {
          console.log('values:', values)
        }}
      >
        <Field name="firstName">
          {({ value, handleChange, handleBlur }) => (
            <div>
              <div>{value}</div>
              <input value={value} onChange={handleChange} onBlur={handleBlur}></input>
            </div>
          )}
        </Field>

        {/* <FieldArray name="friends">
          {({ fields, push, remove }) => (
            <Box>
              <pre>{JSON.stringify(fields, null, 2)}</pre>
              {fields?.map((item, index) => (
                <Box key={index} left>
                  <Field
                    label="First Name"
                    name={`friends[${index}].firstName`}
                    component="input"
                  ></Field>
                  <Field
                    label="Last Name"
                    name={`friends[${item.id}].lastName`}
                    component="input"
                  ></Field>

                  <button type="button" onClick={() => remove(index)}>
                    -
                  </button>
                </Box>
              ))}

              <button
                type="button"
                onClick={() => push({ firstName: `new Friend`, lastName: 'hello' })}
              >
                +
              </button>
            </Box>
          )}
        </FieldArray> */}

        <button type="submit">提交</button>
      </Form>
    </div>
  )
}

export default () => {
  const list = new Array(0).fill(() => null)

  const userForm = useForm({
    validationSchema: yup.object().shape({
      field_0: yup.string().required('required....'),
    }),
    onSubmit(values) {
      console.log('values;', values)
    },
  })

  return (
    <Box p-100>
      <TodoList></TodoList>
      <br />
      <br />
      <Box w={1 / 2}>
        <h2>Large Forms</h2>
        {/* <Form hook={userForm}>
          <FormSpy>
            {({ submitCount }) => (
              <div>
                {submitCount}
                <button type="button" onClick={userForm.handleSubmit}>
                  提交
                </button>
              </div>
            )}
          </FormSpy>
          <FieldSpy name="field_0">
            {({ value, error }) => (
              <div>
                <div>{value}</div>
                <div>{error}</div>
              </div>
            )}
          </FieldSpy>
          <FieldSpy name="field_1">
            {({ value, error }) => (
              <div>
                <div>{value}</div>
                <div>{error}</div>
              </div>
            )}
          </FieldSpy>
          <FieldSpy name={['field_0', 'field_1']}>
            {(field1, field2) => (
              <div>
                <div>
                  {field1?.value} {field2?.value}
                </div>
              </div>
            )}
          </FieldSpy>
          <Field name="firstName" component="input" />
          {list.map((_, i) => (
            <Field
              name={`field_${i}`}
              key={i}
              rules={
                {
                  // required: '必填...',
                  // pattern: [/foo/, 'should contain foo'],
                }
              }
            >
              {({ value, error, touched, handleChange, handleBlur }) => (
                <div>
                  <input value={value} onChange={handleChange} onBlur={handleBlur}></input>
                  {error && touched && <span>{error}</span>}
                </div>
              )}
            </Field>
          ))}
        </Form> */}
      </Box>
    </Box>
  )
}
