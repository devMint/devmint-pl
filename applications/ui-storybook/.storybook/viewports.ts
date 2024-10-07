type Viewport = {
  name: string
  styles: {
    width: string
    height: string
  }
}

const makeViewport = (name: string, width: number, height: number): Viewport => ({
  name,
  styles: {
    width: `${width}px`,
    height: `${height}px`,
  },
})

export const viewports: Record<string, Viewport> = {
  iphonese: makeViewport('iPhone SE (2nd generation)', 375, 667),
  iphone14: makeViewport('iPhone 14', 390, 844),
  iphone14Pro: makeViewport('iPhone 14 Pro', 393, 852),
  iphone14ProMax: makeViewport('iPhone 14 Pro Max', 430, 932),
  ipad11p: makeViewport('iPad Pro 11-in', 834, 1194),
  ipad12p: makeViewport('iPad Pro 12-in', 1024, 1366),
}
