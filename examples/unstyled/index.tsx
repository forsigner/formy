import React from 'react'
import ReactDOM from 'react-dom'
import { devtools } from 'stook-devtools'
import * as yup from 'yup'
import { Form, Field, useForm, fim } from 'fim'
import { fimUnstyled } from 'fim-unstyled'
import { fimYupValidator } from 'fim-yup-validator'
import './index.css'

fim.use(fimUnstyled)
fim.use(fimYupValidator)

devtools.init()

const App = () => {
  const r = useForm({
    name: 'TestForm',
    validationSchema: yup.object().shape({
      username: yup.string().required('reqire usename'),
      password: yup.string().required('reqire.....'),
      // intro: yup.string().required('intro requei'),
      // profile: yup.object().shape({
      //   age: yup.string().required('age requei'),
      // }),
    }),
    validate({ values }) {
      // if (!values.password) {
      //   return {
      //     password: '密码是必填的',
      //   }
      // }

      return {}
    },
    onError(errors) {
      console.log('errors', errors)
    },
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div>
      <Form
        use={r}
        // schema={{}}
        // onSubmit={(values) => {
        //   console.log('values---------:', values)
        // }}
        // onError={(errors) => {
        //   console.log('errors:', errors)
        // }}
      >
        <Field name="username" label="用户名" value="" component="Input" />
        <Field name="password" label="密码" value="" component="Input" />
        <Field name="profile.age" label="年龄" value="" component="Input" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
