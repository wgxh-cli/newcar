import { WidgetInput } from "./widget"

export type MaybeArray<T> = T | T[]

export type PickNumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

export type WidgetDefinition<T> = WidgetInput & T
