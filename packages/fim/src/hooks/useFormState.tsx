import { useStore } from 'stook'
import { FormState, Status } from '../types'
import { useFormContext } from '../formContext'
import { getFormStateKey } from '../utils'

export function useFormState() {
  const { formName } = useFormContext()
  const key = getFormStateKey(formName)
  const [state, setFormState] = useStore<FormState>(key, {
    dirty: false,
    valid: true,
    submitCount: 0,
    submitting: false,
    submitted: false,
    validating: false,
    status: 'editable' as Status,
  })

  return { ...state, setFormState }
}
