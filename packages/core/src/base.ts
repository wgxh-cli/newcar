import { defineWidgetInput, Widget, WidgetContext } from "./widget";
import type { Canvas } from "canvaskit-wasm";
export interface WidgetOptions {
  style?: WidgetStyle
  x?: number
  y?: number
  centerX?: number
  centerY?: number
  progress?: number
  children?: Widget[]
}

export interface WidgetStyle {
  scaleX?: number
  scaleY?: number
  rotation?: number
  transparency?: number
}

const Base = defineWidgetInput({
  init(context: WidgetContext, attrs: Record<string, unknown>) {
    return context
  },
  predraw(context: WidgetContext) {
    return new Map()
  },
  draw(canvas: Canvas) {}
})