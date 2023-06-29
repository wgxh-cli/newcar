import type { carobject } from "./input_type";
import type { IPositionedMut, IRotatedMut, IScaledMut } from "./interface";

export class Carobj implements IPositionedMut, IRotatedMut, IScaledMut {
  display = true; // The Object is or isnot display.
  #x = 0;
  #y = 0;
  #rotation = 0;
  #scaleX = 1;
  #scaleY = 1;
  #contextX;
  #contextY;
  #children: Carobj[] = [];
  #operation: GlobalCompositeOperation = "source-over";

  constructor(datas: carobject) {
    this.x = datas.x;
    this.y = datas.y;
    typeof datas.contextX === "undefined"
      ? (this.#contextX = this.#x)
      : (this.#contextX = datas.contextX!);
    typeof datas.contextY === "undefined"
      ? (this.#contextY = this.#y)
      : (this.#contextY = datas.contextY!);
    typeof datas.scaleX !== "undefined" && (this.#scaleX = datas.scaleX!);
    typeof datas.scaleY !== "undefined" && (this.#scaleY = datas.scaleY!);
    typeof datas.display !== "undefined" && (this.display = datas.display!);
    typeof datas.rotation !== "undefined" && (this.#rotation = datas.rotation!);
    typeof datas.operation !== "undefined" && (this.#operation = datas.operation!);
    typeof datas.children !== "undefined" && (this.#children = datas.children!);
  }

  /**
   * Get called on each frame.
   * @param ctx The context instance of the canvas object.
   */
  onDraw(ctx: CanvasRenderingContext2D) {
    return ctx;
  }

  /**
   * Actually get called on each frame. The difference to `onDraw()` is that `onDraw()` is used for inherited classes to implement their render while this will be actually called directly on each frame.
   * We will do some transformation on this frame.
   * @param ctx The context instance.
   */
  onUpdate(ctx: CanvasRenderingContext2D) {
    if (this.display === true) {
      ctx.save();
      ctx.translate(this.x, this.y);
      // ctx.translate(this.#x, this.#y);
      ctx.rotate(this.#rotation);
      ctx.scale(this.#scaleX, this.#scaleY);
      ctx.globalCompositeOperation = this.#operation;
      this.onDraw(ctx);
      for (const child of this.#children) {
        child.onUpdate(ctx);
      }
      ctx.restore();
    }
  }

  /**
   * Set the display to false.
   */
  hide() {
    this.display = false;
  }

  /**
   * Set the display to true.
   */
  appear() {
    this.display = true;
  }

  setContextPosition(x: number, y: number) {
    this.#contextX = x;
    this.#contextY = y;

    return this;
  }

  get children() {
    return this.#children;
  }

  get x() {
    return this.#x;
  }

  set x(value: number) {
    this.#x = value;
  }

  get y() {
    return this.#y;
  }

  set y(value: number) {
    this.#y = value;
  }

  set scaleX(value: number) {
    this.#scaleX = value;
  }

  get scaleX(): number {
    return this.#scaleX;
  }

  set scaleY(value: number) {
    this.#scaleY = value;
  }

  get scaleY(): number {
    return this.#scaleY;
  }

  get contextX() {
    return this.#contextX;
  }

  get contextY() {
    return this.#contextY;
  }

  /**
   * Return the rotation of the component, in radians.
   */
  get rotation() {
    return this.#rotation;
  }

  /**
   * Set the rotation of the component. Remember, the value is in radians (which 2*pi == 360deg).
   */
  set rotation(value: number) {
    this.#rotation = value;
  }

  get operation() {
    return this.#operation;
  }

  set operation(value: GlobalCompositeOperation) {
    this.#operation = value;
  }

  addChildren(...children: Carobj[]) {
    for (const child of children) {
      this.#children.push(child);
    }
  }
}