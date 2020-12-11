export * from './checkValid'
export * from './handleFieldMemo'
export * from './isTouched'
export * from './touchAll'
export * from './uuid'
export * from './runValidators'

export const isNative = typeof navigator != 'undefined' && navigator.product == 'ReactNative'
