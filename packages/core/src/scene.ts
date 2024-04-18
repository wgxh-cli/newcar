import { Widget } from "./widget";

export interface Scene {
  elapsed: number
  root: Widget
}

export function createScene(root: Widget): Scene {
  return {
    elapsed: 0,
    root
  }
}