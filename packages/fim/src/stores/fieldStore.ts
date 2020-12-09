import { FieldMetadata } from '../types'

class FieldStore {
  // set(target: Object, name: string, value: FieldMetadata) {
  set(target: Object, value: FieldMetadata) {
    if (!target) return
    const values: any[] = this.get(target) || []
    values.push(value)
    Reflect.defineMetadata('field', values, target)
  }

  get(target: any): FieldMetadata[] {
    if (!target) return []
    return Reflect.getMetadata('field', target)
  }
}

export const fieldStore = new FieldStore()
