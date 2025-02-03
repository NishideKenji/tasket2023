'use client'

import { Box, Button, Container, Grid, Typography } from '@mui/material'
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
    is_finish: true,
    description: '',
    end_date_scheduled: null,
    end_date_actual: null,
  }
}

export default function Home() {
  const { data: session } = useSession()

  const params = useParams()
  const id = params?.id

  const tasks = trpc.taskRouter.list.useQuery()
  const gettask = (id: string | string[] | undefined) => {
    if (tasks.data) {
      const ans = tasks.data.tasks.find((task) => task.id === id?.toString())
      if (ans) {
        return ans
      } else {
        return defaultTask()
      }
    } else {
      return defaultTask()
    }
  }
  return (
    <Container maxWidth={false}>
      <Box textAlign="center" p={10}>
        {session ? (
          tasks.data ? (
            <Grid container spacing={10}>
              <Grid item xs={6}>
                <Typography variant="h5" gutterBottom>
                  ID : {id}
                </Typography>
                {tasks.data && <TaskList tasks={tasks.data.tasks} />}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" gutterBottom>
                  {id ? 'Details and Edit Task' : 'Create New Task'}
                </Typography>
                {gettask(id) && <TaskDetails task={gettask(id)} />}
              </Grid>
            </Grid>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <Button onClick={() => signIn()}>signIn</Button>
        )}
      </Box>
    </Container>
  )
}
