const hexToRgb = (hex) => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  return {r, g, b}
}

export const isLightBackground = (hex) => {
  const {r, g, b} = hexToRgb(hex)
  const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b)
  const threshold = 0.5
  return luminance > threshold ? true : false
}
