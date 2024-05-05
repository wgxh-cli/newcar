import type { CanvasKit, Paint, Path } from 'canvaskit-wasm'
import { Widget } from './widget'
import type { WidgetOptions } from './widget'

export interface Widget3DOptions {
  x: number
  y: number
  z: number
  style: Widget3DStyle
}

export interface Widget3DStyle {
  rotationX: number
  rotationY: number
  rotationZ: number
}

export class Widget3D extends Widget {
  z: number
  paint: Paint
  path: Path

  constructor(options: Widget3DOptions) {
    super(options as WidgetOptions)
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.path = new ck.Path()
  }
}
