import * as React from 'react'
import { Form } from 'fim'
import { UserEntity } from '../entities/user.entity'

export const Basic = () => {
  return <Form entity={UserEntity}></Form>
}
