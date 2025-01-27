import { Box, Button, Container, Typography } from '@mui/material'
import { Inter } from 'next/font/google'
import { signIn, useSession } from 'next-auth/react'

import TaskDetails from '@/components/task/taskdetails'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  return (
    <main>
      <Container maxWidth="md">
        <Box textAlign="center" py={10}>
          {session ? (
            <>
              <Typography variant="h5" gutterBottom>
                Create New Task
              </Typography>
              <TaskDetails
                task={{
                  id: '',
                  title: '',
                  is_finish: false,
                  description: '',
                  end_date_scheduled: null,
                  end_date_actual: null,
                }}
              />
            </>
          ) : (
            <Button onClick={() => signIn()}>signIn</Button>
          )}
        </Box>
      </Container>
    </main>
  )
}
