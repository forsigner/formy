import React from 'react'
import { Fim } from '../src/Fim'
import { FimPlugin } from '../src/types'

test('required fail', () => {
  const Input = () => <input type="text" />
  const Form = () => <form />

  const MyPlugin: FimPlugin = {
    Fields: {
      Input,
    },
    Form,
    rules: {
      equalToFoo: (value, msg) => {
        return value === 'foo' ? undefined : msg
      },
    },
    onFormStateChange: () => {},
    onFieldChange: () => {},
    getInitialFieldValue: () => {},
    async validator() {
      return {}
    },
  }

  Fim.use(MyPlugin)
  /** rules */
  expect(Object.keys(Fim.rules).length).toBe(1)
  expect(Object.keys(Fim.rules)[0]).toBe('equalToFoo')

  /** Fields */
  expect(Object.keys(Fim.Fields).length).toBe(1)
  expect(Object.keys(Fim.Fields)[0]).toBe('Input')

  expect(Object.keys(Fim.onFieldChangeCallbacks).length).toBe(1)
  expect(Object.keys(Fim.onFormStateChangeCallbacks).length).toBe(1)
  expect(Fim.validators.length).toBe(1)
  expect(typeof Fim.getInitialFieldValue).toBe('function')
})
