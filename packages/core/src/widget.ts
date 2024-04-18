import { Canvas, CanvasKit, Paint, Path, RRect } from 'canvaskit-wasm'
import type { Animation, AnimationInstance } from './animation'

export interface WidgetInput {
  attrs?: Record<string, unknown>
  params?: any[]
  init?(ck: CanvasKit): void
  predraw?(ck: CanvasKit): Map<string, () => void>
  draw?(canvas: Canvas): void
}

export function defineWidgetInput(input: WidgetInput): WidgetInput {
  return {
    attrs: {},
    params: [],
    ...input
  }
}

export interface Widget {
  create(...parameters: any[]): this // User API for create a widget
  animationInstances: AnimationInstance[] // The animations of this widget
  add(widget: Widget): this
  animate(
    animation: Animation<Widget>,
    startAt: number,
    during: number,
    params?: Record<string, any>,
  ): this
  runAnimation(elapsed: number): void
  setUpdate(updateFunc: (elapsed: number, widget: Widget) => void): this
  updates: ((elapsed: number, widget: Widget) => void)[]
  updateMap: Map<string, () => void>
  draw(canvas: Canvas, attrs: Record<string, unknown>): void
  key: string
  set(attrs: Record<string, unknown>): Widget
  children: Widget[]
  attrs: Record<string, unknown | Record<string, unknown>>
  params: any[]
}

export function registerWidget(
  input: WidgetInput,
  ck: CanvasKit,
): Widget {
  return {
    attrs: {
      style: {},
    },
    params: [],
    children: [],
    animationInstances: [],
    updates: [],
    updateMap: null,
    key: null,
    draw: input.draw,
    set(attrs: Record<string, unknown>) {
      input.attrs = attrs
      for (const attr in input.attrs) {
        ;(this as Record<string, any>)[attr] = (
          input.attrs as Record<string, unknown>
        )[attr]
      }
      return this
    },
    create(...parameters) {
      // Firstly, Initialize it, including create Paint, Path, etc and there default value
      input.params.push(...parameters)
      input.init(ck)
      // Secondly, get the map that parameters and connect his effect function
      this.updateMap = input.predraw(ck)
      // Create a "personal" key for every widget with random
      this.key = `widget-${1}-${performance.now()}-${Math.random()
        .toString(16)
        .slice(2)}`
      return this
    },
    add(widget: Widget) {
      this.children.push(widget)
      return this
    },
    animate(
      animation: Animation<Widget>,
      startAt: number,
      during: number,
      params?: Record<string, any>,
    ) {
      params ??= {}
      this.animationInstances.push({
        startAt,
        during,
        animation,
        params: params,
        mode: params.mode ?? 'positive',
      })
      return this
    },
    runAnimation(elapsed: number) {
      for (const instance of this.animationInstances) {
        if (
          instance.startAt <= elapsed &&
          instance.during + instance.startAt >= elapsed
        ) {
          if (instance.mode === 'positive') {
            instance.animation.act(
              this,
              elapsed - instance.startAt,
              (elapsed - instance.startAt) / instance.during,
              instance.params,
            )
          } else if (instance.mode === 'reverse') {
            instance.animation.act(
              this,
              elapsed - instance.startAt,
              1 - (elapsed - instance.startAt) / instance.during,
              instance.params,
            )
          }
        }
        for (const update of this.updates) {
          update(elapsed, this)
        }

        for (const child of this.children) {
          child.runAnimation(elapsed)
        }
      }
    },
    setUpdate(updateFunc: (elapsed: number, widget: Widget) => void) {
      this.updates.push(updateFunc)

      return this
    },
  }
}
