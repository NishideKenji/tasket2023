import type { ReactNode } from 'react'

import NavBar from './NavBar'

interface Props {
  children: ReactNode
}

export const PageFrame = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
