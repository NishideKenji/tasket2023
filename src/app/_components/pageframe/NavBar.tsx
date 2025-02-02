import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Link href="/register">
          <Button color="inherit">Register</Button>
        </Link>
        <Link href="/">
          <Button color="inherit">Home</Button>
        </Link>

        {!session ? (
          <Button color="inherit" onClick={() => signIn()}>
            signIn
          </Button>
        ) : (
          <Button color="inherit" onClick={() => signOut()}>
            signOut
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
