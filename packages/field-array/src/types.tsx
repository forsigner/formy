import { ReactNode } from 'react'

export interface ArrayHelper {
  push(obj: any): void
  swap(indexA: number, indexB: number): void
  move(from: number, to: number): void
  insert(index: number, value: any): void
  unshift(value: any): void
  remove(index: number): any
  isFirst(index: number): boolean
  isLast(index: number): boolean
}

export interface FieldArrayItem {
  [key: string]: any
}

export interface FieldArrayRenderProps extends ArrayHelper {
  fields: FieldArrayItem[]
}

export interface FieldArrayProps {
  name: string
  children: (props: FieldArrayRenderProps) => ReactNode
}
