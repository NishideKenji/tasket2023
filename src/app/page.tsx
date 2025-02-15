'use client'

import { Button, Container, Grid2, Typography } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'

import { trpc } from '@/trpc/client'

import { TaskDetails } from './_components/task/taskdetails'
import { TaskList } from './_components/task/tasklist'

export default function Home() {
  const { data: session } = useSession()

  const { data: tasks } = trpc.taskRouter.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  return (
    <Container maxWidth={false}>
      {session ? (
        <>
          <Grid2 container spacing={1} sx={{ p: 1, mt: 3 }}>
            <Grid2 size={6} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Task List
              </Typography>
              <TaskList tasks={tasks || []} />
            </Grid2>
            <Grid2 size={6} sx={{ p: 2, borderLeft: '1px solid #ccc' }}>
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
            </Grid2>
          </Grid2>
        </>
      ) : (
        <Button onClick={() => signIn()}>signIn</Button>
      )}
    </Container>
  )
}
