'use client'

import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import { trpc } from '@/trpc/client'

import TaskDetails from '../_components/task/taskdetails'
import TaskList from '../_components/task/tasklist'

export default function Home() {
  const { data: session } = useSession()

  const params = useParams()
  const id = params?.id

  const tasks = trpc.taskRouter.list.useQuery()

  return (
    <Container maxWidth={false}>
      <Box textAlign="center" p={10}>
        {session ? (
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                ID : {id}
              </Typography>
              {tasks.data && <TaskList tasks={tasks.data.tasks} />}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                Create New Task
              </Typography>
              <TaskDetails
                task={{
                  id: '',
                  title: '',
                  is_finish: true,
                  description: '',
                  end_date_scheduled: null,
                  end_date_actual: null,
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <Button onClick={() => signIn()}>signIn</Button>
        )}
      </Box>
    </Container>
  )
}
