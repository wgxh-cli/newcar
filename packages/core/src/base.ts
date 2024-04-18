import { defineWidgetInput, registerWidget, Widget, WidgetContext } from "./widget";
import { $ck } from "./engine";
import type { Canvas } from "canvaskit-wasm";
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

const input = defineWidgetInput({
  init(context: WidgetContext, attrs: Record<string, unknown>) {
    return context
  },
  predraw(context: WidgetContext) {
    return new Map()
  },
  draw(canvas: Canvas) {}
})

export const Base = registerWidget(input, $ck)