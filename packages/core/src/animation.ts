import { Widget } from './widget'

export interface Animation<T extends Widget> {
  act: (widget: T, elapsed: number, process: number, params?: any) => void
}

export function defineAnimation(
  animation: Animation<Widget>,
): Animation<Widget> {
  return animation
}

export interface AnimationInstance {
  startAt: number
  during: number
  animation: Animation<Widget>
  params?: Record<string, any>
  mode: 'positive' | 'reverse'
}
