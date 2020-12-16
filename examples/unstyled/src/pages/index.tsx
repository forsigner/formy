import React from 'react'
import { devtools } from 'stook-devtools'
import { Box } from '@styli/react'
import * as yup from 'yup'
import { Form, Field, fim, useField, FormSpy, FieldSpy, FieldArray } from 'fim'
import { fimUnstyled } from 'fim-unstyled'
import { fimYupValidator } from 'fim-yup-validator'
import './index.less'

fim.use(fimUnstyled)
fim.use(fimYupValidator)

devtools.init()

const UserName = () => {
  const usernameField = useField('username')
  return <span>{usernameField.value} </span>
}

const Basic = () => {
  return (
    <Form
      initialValues={{
        username: '',
        password: '',
        profile: {
          age: '100',
        },
      }}
      validationSchema={yup.object().shape({
        username: yup.string().required('reqire usename'),
        password: yup.string().required('require password'),
      })}
      onSubmit={(values) => {
        console.log('values---------:', values)
      }}
      onError={(errors) => {
        console.log('errors:', errors)
      }}
    >
      <Field
        name="username"
        label="用户名"
        component="Input"
        // onFieldChange={({ fieldState, setFieldState }) => {
        //   setFieldState('password', (state) => {
        //     state.value = fieldState.value
        //   })

        //   setFieldState('profile.age', (state) => {
        //     state.visible = false
        //   })
        // }}
      />
      <Field name="password" label="密码" component="Input" />

      <FieldSpy name="username">{(username) => <span>{username.value}</span>}</FieldSpy>
      <br />
      <FieldSpy name={['username', 'password']}>
        {(username, password) => <span>{username.value + password.value}</span>}
      </FieldSpy>
      <Field name="profile.age" label="年龄" component="Input" />
      <FormSpy>
        {({ submitCount }) => (
          <div>
            <span>{submitCount}</span>
            <button type="submit">Submit</button>
          </div>
        )}
      </FormSpy>
    </Form>
  )
}

const TodoList = () => {
  return (
    <div>
      <div>todos</div>
      <Form
        initialValues={{
          username: 'Todo list',
          todos: [
            {
              title: 'todo one',
              done: 'false',
            },
          ],
        }}
        name="my_form"
        onSubmit={(values) => {
          //
          console.log('values:', values)
        }}
      >
        <div>
          <Field name="username" component="Input"></Field>
          <FieldArray name="todos">
            {({ fields, push, remove }) => (
              <Box>
                <pre>{JSON.stringify(fields, null, 2)}</pre>
                {fields.map((item, index) => (
                  <Box key={index} left>
                    <div>id:{item.id}</div>
                    <Field label="title" name={`todos[${index}].title`} component="Input"></Field>
                    <Field name={`todos[${item.id}].done`} component="Input"></Field>

                    <button type="button" onClick={() => remove(index)}>
                      -
                    </button>
                  </Box>
                ))}
                <button
                  type="button"
                  onClick={() => push({ title: `new Todo ${fields.length}`, done: 'false' })}
                >
                  +
                </button>
              </Box>
            )}
          </FieldArray>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

export default () => {
  // const r = useForm({
  //   name: 'TestForm',
  //   validationSchema: yup.object().shape({
  //     username: yup.string().required('reqire usename'),
  //     password: yup.string().required('reqire.....'),
  //     // intro: yup.string().required('intro requei'),
  //     // profile: yup.object().shape({
  //     //   age: yup.string().required('age requei'),
  //     // }),
  //   }),
  //   validate({ values }) {
  //     // if (!values.password) {
  //     //   return {
  //     //     password: '密码是必填的',
  //     //   }
  //     // }

  //     return {}
  //   },
  //   onError(errors) {
  //     console.log('errors', errors)
  //   },
  //   onSubmit(values) {
  //     alert(JSON.stringify(values, null, 2))
  //   },
  // })

  return (
    <Box p-100>
      <Basic></Basic>
      <br />
      <br />
      <br />

      <TodoList></TodoList>
    </Box>
  )
}
