import {
  Checkbox,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { type Task } from '@prisma/client'
import { format } from 'date-fns'

interface Props {
  tasks: Task[]
}

const TaskList = ({ tasks }: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>タイトル</TableCell>
          <TableCell>完了状況</TableCell>
          <TableCell>計画日時</TableCell>
          <TableCell>完了日時</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {tasks.map((task, index) => {
          return (
            <TableRow key={task.id}>
              <TableCell>
                <Link>{index + 1}</Link>
              </TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Checkbox disabled={true} checked={task.is_finish} />
              </TableCell>
              <TableCell>
                {task.end_date_scheduled &&
                  format(task.end_date_scheduled, 'MM/dd/yyyy')}
              </TableCell>
              <TableCell>
                {task.end_date_actual &&
                  format(task.end_date_actual, 'MM/dd/yyyy')}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TaskList
