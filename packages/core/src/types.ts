import { WidgetInput, registerWidget } from './widget'

export type MaybeArray<T> = T | T[]

export type PickNumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export type WidgetSelf<
  A,
  P extends [],
  T extends WidgetInput<A, P>,
> = ReturnType<typeof registerWidget.bind<T>>
