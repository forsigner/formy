import { useStore } from 'stook'
import { FormState, Status } from '../types'
import { useFormContext } from '../formContext'

export function useFormState() {
  const { formName } = useFormContext()
  const [state, setFormState] = useStore<FormState>(formName, {
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
