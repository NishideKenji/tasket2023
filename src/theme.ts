'use client'

import { createTheme } from '@mui/material/styles'

const baseTheme = createTheme({
  palette: {},
})

const theme = createTheme({
  ...baseTheme,
})

export default theme
