import {
  defineWidgetInput,
  registerWidget,
  Widget,
  WidgetContext,
  WidgetInput,
} from './widget'
import { $ck } from './engine'
import type { Canvas, CanvasKit } from 'canvaskit-wasm'
export interface BaseOptions {
  style?: BaseStyle
  x?: number
  y?: number
  centerX?: number
  centerY?: number
  progress?: number
  children?: Widget[]
}

export interface BaseStyle {
  scaleX?: number
  scaleY?: number
  rotation?: number
  transparency?: number
}

export function base(): BaseOptions & WidgetInput {
  return defineWidgetInput({
    init(context: WidgetContext, attrs: BaseOptions) {
      return context
    },
    predraw(context: WidgetContext, attr: BaseOptions) {
      return new Map()
    },
    draw(canvas: Canvas, attr: BaseOptions) {},
  })
}
