import { FieldState } from '../../src/types'
import { fim } from '../../src/fim'
import { builtinPlugin } from '../../src/builtinPlugin'
import { validateField } from '../../src/utils/validateField'

beforeEach(() => {
  fim.use(builtinPlugin)
  fim.use({
    rules: {
      async asyncRequired({ fieldState }, ruleValue) {
        return !fieldState.value ? ruleValue : undefined
      },
    },
  })
})

test('single rule', () => {
  const requiredMsg = 'first Name is required'
  const fieldState = {
    value: '',
    rules: {
      required: requiredMsg,
    },
  } as FieldState
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toEqual(requiredMsg)
  })
})

test('multi rules', () => {
  const requiredMsg = 'first Name is required'
  const minLengthMsg = 'minLenght is 6'
  const fieldState = {
    value: 'hello',
    rules: {
      required: requiredMsg,
      minLength: [6, minLengthMsg],
    },
  } as FieldState
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toEqual(minLengthMsg)
  })
})

test('async rule', () => {
  const asyncRequiredMsg = 'first Name is required'
  const fieldState = {
    value: '',
    rules: {
      asyncRequired: asyncRequiredMsg,
    },
  } as any
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toEqual(asyncRequiredMsg)
  })
})

test('invalid rule', () => {
  const fieldState = {
    value: 'hello',
    rules: {
      notFoundRule: '',
    },
  } as any
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toBeUndefined()
  })
})

test('no rules', () => {
  const fieldState = {
    value: '',
  } as FieldState
  const values = {}

  validateField({ fieldState, values }).then((error) => {
    expect(error).toBeUndefined()
  })
})
