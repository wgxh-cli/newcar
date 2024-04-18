import {
  defineWidgetInput,
  registerWidget,
  Widget,
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

export function base(): WidgetInput {
  return defineWidgetInput({
    init(ck: CanvasKit) {},
    predraw(ck: CanvasKit) {
      return new Map()
    },
    draw(canvas: Canvas) {},
  })
}
