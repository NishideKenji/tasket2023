import { Box, Container, Typography } from '@mui/material'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Container maxWidth="md">
        <Box textAlign="center" py={10}>
          <Typography variant="h2" gutterBottom>
            Welcome to Our Site
          </Typography>
          <Box mt={4}>discription</Box>
        </Box>
      </Container>
    </main>
  )
}
