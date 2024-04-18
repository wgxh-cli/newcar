import { Canvas, CanvasKit, Paint, Path, RRect } from 'canvaskit-wasm'
import type { Animation, AnimationInstance } from './animation'

export interface WidgetContext {
  createPath(): Path
  createPaint(): Paint
  createRect(top: number, left: number, bottom: number, right: number): RRect
  data: {
    paints?: Paint[]
    path?: Path[]
    rects?: RRect[]
  }
}

function createWidgetContext(ck: CanvasKit): WidgetContext {
  return {
    data: {
      paints: [],
      path: [],
    },
    createPath() {
      const path = new ck.Path()
      this.data.path.push(path)
      return path
    },
    createPaint() {
      const paint = new ck.Paint()
      this.data.paints.push(paint)
      return paint
    },
    createRect(top: number, left: number, bottom: number, right: number) {
      const rect = ck.LTRBRect(left, top, right, bottom)
      this.data.rects.push(rect)
      return rect
    },
  }
}

export interface Widget {
  attrs: Record<string, unknown>
  children: Widget[]
  context: WidgetContext
  create(attrs: Record<string, unknown>): this
  animationInstances: AnimationInstance[]
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
}

export interface WidgetInput {
  init(context: WidgetContext, attrs: Record<string, unknown>): WidgetContext
  predraw(
    operations: WidgetContext,
    prop: string,
    attrs: Record<string, unknown>,
  ): Map<string, () => void>
  draw(canvas: Canvas, attrs: Record<string, unknown>): void
  create?(...parameters: unknown[]): Widget
}

export function defineWidgetInput(input: WidgetInput) {
  return input
}

export function registerWidget(input: WidgetInput, ck: CanvasKit): Widget {
  return {
    attrs: {},
    children: [],
    context: createWidgetContext(ck),
    animationInstances: [],
    updates: [],
    create(attrs: Record<string, unknown>) {
      this.attrs = attrs
      this.context = input.init(this.context, this.attrs)
      for (const attr in this.attrs) {
        ;(this as Record<string, any>)[attr] = (
          this.attrs as Record<string, unknown>
        )[attr]
      }
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
      }
    },
    setUpdate(updateFunc: (elapsed: number, widget: Widget) => void) {
      this.updates.push(updateFunc)
  
      return this
    },
  }
}
