'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'

import { TaskDetails } from './_components/task/taskdetails'

export default function Home() {
  const { data: session } = useSession()

  return (
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
  )
}
