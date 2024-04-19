import { Canvas, CanvasKit, Paint, Path, RRect } from 'canvaskit-wasm'
import type { Animation, AnimationInstance } from './animation'
import { BaseStyle } from './base'

export interface WidgetInput<A, P> {
  attrs?: A
  params?: P
  init?(ck: CanvasKit): void
  predraw?(ck: CanvasKit): Map<string, () => void>
  draw?(canvas: Canvas): void
}

export function defineWidgetInput(
  input: WidgetInput<{}, []>,
): WidgetInput<{}, []> {
  return {
    attrs: {},
    params: [],
    ...input,
  }
}

export interface WidgetInstance {
  create(...parameters: any[]): Widget // User API for create a widget
}

export interface Widget<A = {}, P = []> {
  animationInstances: AnimationInstance[];
  add(widget: Widget<A, P>): this;
  animate(
      animation: Animation<Widget<A, P>>,
      startAt: number,
      during: number,
      params?: Record<string, any>,
  ): this;
  runAnimation(elapsed: number): void;
  setUpdate(updateFunc: (elapsed: number, widget: Widget<A, P>) => void): this;
  updates: ((elapsed: number, widget: Widget<A, P>) => void)[];
  updateMap: Map<string, () => void>;
  draw(canvas: Canvas, attrs: A): void;
  key: string;
  set(attrs: A): Widget<A, P>;
  children: Widget<A, P>[];
  attrs: A;
  params: P;
  style?: BaseStyle;  // Ensure style is included
}

export function registerWidget<A extends Record<string, any>>(
  input: WidgetInput<A, any[]>,
  ck: CanvasKit,
): WidgetInstance {
  // Create a widget with default properties, especially for style.
  return {
    create(...params) {
      return {
        attrs: {
          ...input.attrs,
          style: {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            transparency: 1,
            ...input.attrs?.style,
          },
        },
        params: [],
        children: [],
        animationInstances: [],
        updates: [],
        updateMap: input.predraw ? input.predraw(ck) : new Map(),
        key: `widget-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        draw: input.draw || ((canvas: Canvas) => {}),
        set(attrs: A) {
          this.attrs = { ...this.attrs, ...attrs }
          return this
        },
        add(widget: Widget) {
          this.children.push(widget)
          return this
        },
        animate(animation, startAt, during, params = {}) {
          this.animationInstances.push({
            startAt,
            during,
            animation,
            params,
            mode: params.mode || 'positive',
          })
          return this
        },
        runAnimation(elapsed: number) {
          this.animationInstances.forEach((instance) => {
            if (
              instance.startAt <= elapsed &&
              instance.during + instance.startAt >= elapsed
            ) {
              instance.animation.act(
                this,
                elapsed - instance.startAt,
                (elapsed - instance.startAt) / instance.during,
                instance.params,
              )
            }
          })
          this.updates.forEach((update) => update(elapsed, this))
          this.children.forEach((child) => child.runAnimation(elapsed))
        },
        setUpdate(updateFunc) {
          this.updates.push(updateFunc)
          return this
        },
      }
    },
  }
}
