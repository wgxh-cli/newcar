import { Widget } from '@newcar/core'
import {
  BaseOptions,
  BaseStyle,
  defineWidgetInput,
} from '@newcar/core'
import { Canvas, CanvasKit, Image, Paint } from 'canvaskit-wasm'

export interface ImageOptions extends BaseOptions {
  style: BaseStyle
}

export interface ImageInstance {
  image?: Image
  imageArray?: ArrayBuffer
  paint?: Paint
}

// export class ImageWidget extends Widget {
//   private image: Image
//   paint: Paint

//   constructor(public imageArray: ArrayBuffer, options?: ImageWidgetOptions) {
//     options ??= {}
//     super(options)
//   }

//   init(ck: CanvasKit) {
//     this.paint = new ck.Paint()
//     this.paint.setAlphaf(this.style.transparency)
//     try {
//       this.image = ck.MakeImageFromEncoded(this.imageArray)
//     } catch (error) {}
//   }

//   predraw(
//     ck: CanvasKit,
//     propertyChanged: string,
//   ) {
//     switch (propertyChanged) {
//       case 'imageArray': {
//         this.image = ck.MakeImageFromEncoded(this.imageArray)
//         break
//       }
//       case 'style.transparency': {
//         this.paint.setAlphaf(this.style.transparency)
//       }
//     }
//   }

//   draw(canvas: Canvas): void {
//     canvas.drawImage(this.image, 0, 0, this.paint)
//   }
// }

export function image() {
  return defineWidgetInput<ImageInstance>({
    init(ck: CanvasKit) {
      this.paint = new ck.Paint()
      this.paint.setAlphaf(this.attrs.style.transparency)
      try {
        this.image = ck.MakeImageFromEncoded(this.params[0])
      } catch (error) {}
    },
    predraw(ck: CanvasKit) {
      return new Map()
      .set('imageArray', () =>
        ck.MakeImageFromEncoded(this.imageArray),
      )
      .set('style.transparency', (attrs: Base) => {
        this.paint.setAlphaf(attrs.style.transparency)
      })
    },
    draw(canvas: Canvas) {
      canvas.drawImage(this.image, 0, 0, this.paint)
    },
  })
}
