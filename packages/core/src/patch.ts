import { Canvas, CanvasKit } from 'canvaskit-wasm'
import { Widget } from './widget'
import { isEqual } from '@newcar/utils'
import { BaseOptions, BaseParams, base } from './base'
import { WidgetSelf } from './types'

export function shallowEqual(objA: any, objB: any): string[] {
  const changedProperties: string[] = []

  if (isEqual(objA, objB)) return changedProperties

  if (objA === objB) {
    return changedProperties
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return changedProperties
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  const lengthA = keysA.length
  const lengthB = keysB.length

  const keysBSet = new Set(keysB)

  // Function to check if the value is of a primitive type or an array
  const isPrimitiveOrArray = (value: any) => {
    return value !== Object(value) || Array.isArray(value)
  }

  for (let i = 0; i < lengthA; i++) {
    const key = keysA[i]
    if (key === 'style') {
      // Recursively compare the 'style' object
      const styleDifferences = shallowEqual(objA.style, objB.style)
      if (styleDifferences.length > 0) {
        changedProperties.push(key)
      }
    } else if (
      !keysBSet.has(key) ||
      (isPrimitiveOrArray(objA[key]) && objA[key] !== objB[key])
    ) {
      changedProperties.push(key)
    }
  }

  // Optionally, you might want to check for keys present in objB but not in objA
  // This is optional and depends on your use case
  keysB.forEach((key) => {
    if (!keysA.includes(key) && isPrimitiveOrArray(objB[key])) {
      changedProperties.push(key)
    }
  })

  return changedProperties
}

export async function patch<T extends Widget<BaseOptions, BaseParams>>(
  old: T,
  now: T,
  ck: CanvasKit,
  canvas: Canvas,
) {
  canvas.save();
  const differences = shallowEqual(old.attrs, now.attrs);
  for (const param of differences) {
    try {
      now.updateMap.get(param)?.();
    } catch {}
    if (param === 'style' && now.style && old.style) {
      const styleDifferences = shallowEqual(old.style, now.style);
      for (const styleParam of styleDifferences) {
        try {
          now.updateMap.get(`style.${styleParam}`)?.();
        } catch {}
      }
    }
  }

  if (now.style) {
    canvas.translate(now.x ?? 0, now.y ?? 0);
    canvas.rotate(now.style.rotation ?? 0, now.centerX ?? 0, now.centerY ?? 0);
    canvas.scale(now.style.scaleX ?? 1, now.style.scaleY ?? 1);
  }

  now.draw(canvas, now.attrs);
  canvas.restore();
}