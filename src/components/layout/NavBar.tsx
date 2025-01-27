import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export default function NavBar() {
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
      </Toolbar>
    </AppBar>
  )
}
