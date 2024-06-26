export type Affinity = 'upstream' | 'downstream'
export type AlphaType = 'opaque' | 'premul' | 'unpremul'
export type BlendMode =
  | 'clear'
  | 'src'
  | 'dst'
  | 'srcOver'
  | 'dstOver'
  | 'srcIn'
  | 'dstIn'
  | 'srcOut'
  | 'dstOut'
  | 'srcATop'
  | 'dstATop'
  | 'xor'
  | 'plus'
  | 'modulate'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'colorDodge'
  | 'colorBurn'
  | 'hardLight'
  | 'softLight'
  | 'difference'
  | 'exclusion'
  | 'multiply'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'
export type BlurStyle = 'normal' | 'solid' | 'outer' | 'inner'
export type ClipOp = 'difference' | 'intersect'
export type ColorChannel = 'red' | 'green' | 'blue' | 'alpha'
export type ColorType =
  | 'alpha_8'
  | 'rgb_565'
  | 'rgba_8888'
  | 'bgra_8888'
  | 'rgba_1010102'
  | 'rgb_101010x'
  | 'gray_8'
  | 'rgba_f16'
  | 'rgba_f32'
export type FillType = 'winding' | 'evenOdd'
export type FilterMode = 'linear' | 'nearest'
export type FontEdging = 'alias' | 'antiAlias' | 'subpixelAntiAlias'
export type FontHinting = 'none' | 'slight' | 'normal' | 'full'
export type FontSlant = 'upright' | 'italic' | 'oblique'
export type FontWeight =
  | 'invisible'
  | 'thin'
  | 'extraLight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black'
  | 'extraBlack'
export type FontWidth =
  | 'ultraCondensed'
  | 'extraCondensed'
  | 'condensed'
  | 'semiCondensed'
  | 'normal'
  | 'semiExpanded'
  | 'expanded'
  | 'extraExpanded'
  | 'ultraExpanded'
export type MipmapMode = 'none' | 'nearest' | 'linear'
export type PaintStyle = 'fill' | 'stroke'
export type Path1DEffectStyle = 'translate' | 'rotate' | 'morph'
export type PathOp =
  | 'difference'
  | 'intersect'
  | 'union'
  | 'xor'
  | 'reverseDifference'
export type PlaceholderAlignment =
  | 'baseline'
  | 'aboveBaseline'
  | 'belowBaseline'
  | 'top'
  | 'bottom'
  | 'middle'
export type PointMode = 'points' | 'lines' | 'polygon'
export type RectHeightStyle =
  | 'tight'
  | 'max'
  | 'includeLineSpacingMiddle'
  | 'includeLineSpacingTop'
  | 'includeLineSpacingBottom'
  | 'strut'
export type RectWidthStyle = 'tight' | 'max'
export type StrokeCap = 'butt' | 'round' | 'square'
export type StrokeJoin = 'bevel' | 'miter' | 'round'
export type TextAlign =
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'start'
  | 'end'
export type TextBaseline = 'alphabetic' | 'ideographic'
export type TextDirection = 'ltr' | 'rtl'
export type TextHeightBehavior =
  | 'all'
  | 'disableFirstAscent'
  | 'disableLastDescent'
  | 'disableAll'
export type TileMode = 'clamp' | 'decal' | 'mirror' | 'repeat'
export type VertexMode = 'triangles' | 'trianglesStrip' | 'triangleFan'
