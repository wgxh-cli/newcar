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

export type BaseParams = []

export function base(): WidgetInput<BaseOptions, BaseParams> {
  return defineWidgetInput({
    init(ck: CanvasKit) {
      // Initialize with default styles or other necessary properties
    },
    predraw(ck: CanvasKit) {
      const map = new Map<string, () => void>();
      // Define how style changes should be handled, if necessary
      map.set("style.rotation", () => { /* handle rotation changes */ });
      return map;
    },
    draw(canvas: Canvas) {
      // Drawing logic considering the style
    },
  })
}