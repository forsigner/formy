import { checkValid } from '../../src/utils/checkValid'

test('should be valid if errors is empty', () => {
  expect(checkValid({})).toBeTruthy()
})

test('should be valid if errors property is falsy', () => {
  const errors = {
    firstName: null,
    lastName: undefined,
    bio: '',
  }
  expect(checkValid(errors)).toBeTruthy()
})

test('should be invalid if errors is a normal object', () => {
  const errors = {
    firstName: 'required',
    lastName: 'required',
    age: 100,
  }
  expect(checkValid(errors)).toBeFalsy()
})

test('valid nested erros', () => {
  const errors = {
    profile: {
      firstName: '',
      lastName: null,
      age: undefined,
    },
  }
  expect(checkValid(errors)).toBeTruthy()
})

test('invalid nested erros', () => {
  const errors = {
    profile: {
      firstName: 'required',
      lastName: 'required',
    },
  }
  expect(checkValid(errors)).toBeFalsy()
})

test('invalid nested erros', () => {
  const errors = {
    profile: [
      {
        firstName: 'required',
        lastName: 'required',
      },
    ],
  }
  expect(checkValid(errors)).toBeFalsy()
})

test('invalid nested erros', () => {
  const errors = {
    profile: [
      {
        firstName: '',
        lastName: '',
      },
    ],
  }
  expect(checkValid(errors)).toBeTruthy()
})

test('no errors', () => {
  expect(checkValid()).toBeTruthy()
})
