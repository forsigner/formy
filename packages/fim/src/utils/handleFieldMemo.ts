import isEqual from 'react-fast-compare'
import { FieldStore } from '../types'

interface Props {
  memo?: () => boolean
  fieldStore: FieldStore
}
export function handleFieldMemo(prev: Props, next: Props) {
  if (prev.memo) return prev.memo()

  const f1 = prev.fieldStore
  const f2 = next.fieldStore
  const shouldMemo =
    f1.value === f2.value &&
    f1.status === f2.status &&
    f1.touched === f2.touched &&
    f1.display === f2.display &&
    f1.visible === f2.visible &&
    f1.error === f2.error &&
    f1.disabled === f2.disabled &&
    f1.data === f2.data &&
    isEqual(f1.enum, f2.enum)

  return shouldMemo
}
