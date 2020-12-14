import React from 'react'
import ReactDOM from 'react-dom'
import * as yup from 'yup'
import { Form, Field, useForm, fim } from 'fim'
import { fimUnstyled } from 'fim-unstyled'
import { fimYupValidator } from 'fim-yup-validator'
import './index.css'

fim.use(fimUnstyled)
fim.use(fimYupValidator)

const App = () => {
  const r = useForm({
    schema: {
      username: {
        label: 'username',
        value: '',
        component: 'Input',
        transform: (value: any) => {
          return value + 'postfix'
        },
      },
      password: {
        label: 'password',
        visible: true,
        value: '',
        component: 'Input',
      },

      arr: [
        {
          arr1: {
            label: 'arr1',
            visible: true,
            value: '',
            component: 'Input',
          },
        },
      ],
      profile: {
        age: {
          label: 'age',
          visible: true,
          value: 10,
          component: 'Input',
        },
      },
    },
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
        // schema={User}
        // onSubmit={(values) => {
        //   console.log('values---------:', values)
        // }}
        // onError={(errors) => {
        //   console.log('errors:', errors)
        // }}
      >
        {/* <Field name="username" />
        <Field name="password" />
        <Field name="profile.age" />
        <button type="submit">Submit</button> */}
      </Form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
