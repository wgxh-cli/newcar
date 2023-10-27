import type { CarobjOption } from "./carobj";
import { Svg } from "./svg";

/**
 * WebView options.
 * @param width The width of the WebView.
 * @param height The height of the WebView.
 * @see CarobjOption
 * @see WebView
 */
export interface WebViewOption extends CarobjOption {
  width?: number;
  height?: number;
}

const xhtmlToSvg = (xhtml: string, width: number, height: number): string => `\
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\
<foreignObject width="100%" height="100%">\
<div xmlns="http://www.w3.org/1999/xhtml" style="color: white">\
${xhtml}</div></foreignObject></svg>`;

export class WebView extends Svg {
  #xhtml: string;
  width: number;
  height: number;

  /**
   * The animation object for render a image.
   * @param xhtml The XHTML content.
   * @param options The options of the object.
   * @see WebViewOption
   */
  constructor(xhtml: string, options?: WebViewOption) {
    options ??= {};
    const width = options.width ?? 640;
    const height = options.height ?? 480;
    super(xhtmlToSvg(xhtml, width, height), options);
    this.#xhtml = xhtml;
    this.width = width;
    this.height = height;
  }

  get xhtml(): string {
    return this.#xhtml;
  }

  set xhtml(value: string) {
    this.#xhtml = value;
    super.svg = xhtmlToSvg(value, this.width, this.height);
  }
}
