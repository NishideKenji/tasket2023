import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

import TaskDetails from '@/components/task/taskdetails'
import TaskList from '@/components/task/tasklist'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  const tasks = trpc.taskRouter.list.useQuery()

  const router = useRouter()
  const { id } = router.query

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
