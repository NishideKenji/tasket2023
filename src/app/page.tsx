import { Box, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <main>
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
