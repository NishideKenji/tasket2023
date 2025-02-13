import { Box, Container, Typography } from '@mui/material'

import { TrpcExampleClient } from './_components/exampleapi-client'
import { TrpcExampleServer } from './_components/exampleapi-server'

export default function Home() {
  return (
    <main>
      <Container maxWidth="md">
        <Box textAlign="center" py={10}>
          <Typography variant="h2" gutterBottom>
            Welcome to Our Site
          </Typography>
          <Box mt={4}>
            <>クライアントからのTRPC問い合わせ</>
            <TrpcExampleClient name="Client 1" />
            <br />
            <>サーバーサイドでのTRPC問い合わせ</>
            <TrpcExampleServer name="Server 1" />
          </Box>
        </Box>
      </Container>
    </main>
  )
}
