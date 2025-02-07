'use client'

import { Box, Button, Container, Grid2, Paper, Typography } from '@mui/material'
import type { Task } from '@prisma/client'
import { useParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import { trpc } from '@/trpc/client'

import TaskDetails from '../_components/task/taskdetails'
import TaskList from '../_components/task/tasklist'

const defaultTask = (): Task => {
  return {
    id: '',
    title: '',
    is_finish: false,
    description: '',
    end_date_scheduled: null,
    end_date_actual: null,
  }
}

export default function Home() {
  const { data: session } = useSession()

  const params = useParams()
  const id = params?.id

  const { data: tasks } = trpc.taskRouter.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  const { data: task } = trpc.taskRouter.get.useQuery(
    {
      id: id ? id.toString() : '',
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <Container maxWidth={false}>
      <Box sx={{ p: 1, mt: 1 }}>
        {session ? (
          <Grid2 container spacing={3}>
            <Grid2 size={6} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Task List
              </Typography>
              <TaskList tasks={tasks || []} />
            </Grid2>
            <Grid2 size={6} sx={{ p: 2, borderLeft: '1px solid #ccc' }}>
              <Typography variant="h5" gutterBottom>
                {id ? 'Details and Edit Task' : 'Create New Task'}
              </Typography>
              <Paper sx={{ p: 2 }}>
                {id ? (
                  task && <TaskDetails task={task} />
                ) : (
                  <TaskDetails task={defaultTask()} />
                )}
              </Paper>
            </Grid2>
          </Grid2>
        ) : (
          <Button onClick={() => signIn()}>signIn</Button>
        )}
      </Box>
    </Container>
  )
}
