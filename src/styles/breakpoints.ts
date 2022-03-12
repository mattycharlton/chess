const size = {
  s: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
}

const breakpoints = {
  s: `(max-width: ${size.s})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
}

export default breakpoints
