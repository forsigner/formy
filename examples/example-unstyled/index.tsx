import React from 'react'
import ReactDOM from 'react-dom'
import { IsNotEmpty } from 'class-validator'
import { entity, field, Form, useForm } from 'fim'
import { registerAll } from 'fim-unstyled'
import './index.css'

registerAll()

@entity('profile')
export class Profile {
  @field({
    value: '',
    label: 'age',
    component: 'Input',
  })
  age: string

  @field({
    label: 'gender',
    value: '',
    component: 'Input',
    type: 'Input',
  })
  gender: string
}

@entity('user-entity')
export class User {
  @field({
    value: '',
    label: 'username',
    component: 'Input',
  })
  @IsNotEmpty({ message: 'user name required' })
  username: string

  @field({
    label: 'Password',
    value: '',
    component: 'Input',
    type: 'password',
  })
  password: string

  @field({
    label: 'Intro',
    value: '',
    component: 'Textarea',
  })
  intro: string

  @field(() => Profile)
  profile: Profile
}

const schema = [
  {
    label: 'username',
    name: 'user',
    value: 'jobs',
    component: 'Input',
  },

  {
    label: 'password',
    name: 'password',
    value: 'jobs',
    component: 'Input',
  },
]

const App = () => {
  const r = useForm(User, {
    onSubmit(values: User) {
      alert(JSON.stringify(values, null, 2))
    },
  })
  // const r = useForm(schema, {
  //   onSubmit(values) {
  //     console.log('submit values:', values)
  //   },
  // })
  return (
    <div>
      <Form use={r}></Form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
