'use client'
import { SnackbarProvider } from 'notistack'
import type { ReactNode } from 'react'

import NavBar from './NavBar'

interface Props {
  children: ReactNode
}
export const PageFrame = ({ children }: Props) => {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <NavBar />
        <main>{children}</main>
      </SnackbarProvider>
    </>
  )
}
