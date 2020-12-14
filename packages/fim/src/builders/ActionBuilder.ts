import produce from 'immer'
import { Dispatch, Action, getState } from 'stook'
import isEqual from 'react-fast-compare'
import get from 'lodash.get'
import { FormState } from '../types'
import { checkValid } from '../utils'
import { runValidators } from '../utils/runValidators'

export class ActionBuilder<T> {
  constructor(
    private name: string,
    private setState: Dispatch<Action<FormState<T>>>,
    private initialValue: FormState<T>,
  ) {}

  setFormState = this.setState

  setSubmitting = (submitting: boolean) => {
    const nextState = produce<FormState<T>, FormState<T>>(getState(this.name), (draft) => {
      draft.submitting = submitting
    })
    this.setState({ ...nextState })
  }

  resetForm = () => {
    this.setState(this.initialValue)
  }

  validateForm = async () => {
    const state = getState(this.name)
    const errors = await runValidators(state)
    if (isEqual(errors, state.errors)) return errors

    const nextState = produce<FormState<T>, FormState<T>>(state, (draft) => {
      draft.errors = errors
      draft.valid = checkValid(draft.errors)
      // TODO:
      // draft.toucheds = touchAll(state.values)
    })
    this.setState({ ...nextState })
    return errors
  }

  /**
   * validate field
   * @param name field name
   * @return is filed valid
   */
  validateField = async (name: string): Promise<boolean> => {
    const state = getState(this.name)
    const errors = await runValidators(state)
    const error = get(errors, name)
    if (isEqual(errors, state.errors)) {
      return !error
    }

    const nextState = produce<FormState<T>, FormState<T>>(state, (draft) => {
      draft.errors = errors
      draft.valid = checkValid(draft.errors)
      // TODO:
      // set(draft.toucheds, name, true)
    })
    this.setState({ ...nextState })
    return !error
  }
}
