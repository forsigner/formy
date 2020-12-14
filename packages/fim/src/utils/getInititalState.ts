import { Options, FormState, Status } from '../types'

export function getInititalState(formName: string, options: Options): FormState {
  let initialState: FormState = {
    values: {} as any,
    errors: {},
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    submitted: false,
    validating: false,
    status: 'editable' as Status,
    pathMetadata: [],
    formName,
    validationSchema: options.validationSchema,
    options,
  }
  return initialState
}
