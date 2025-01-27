import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import type { Task } from '@prisma/client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
  task: Task
}

const taskCreateSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty(),
  description: z.string(),
  is_finish: z.boolean(),
  end_date_scheduled: z.date().nullable().optional(),
  end_date_actual: z.date().nullable().optional(),
})

export default function TaskDetails({ task }: Props) {
  const { register, handleSubmit, control, formState } = useForm({
    defaultValues: task,
    resolver: zodResolver(taskCreateSchema),
    mode: 'onTouched',
  })

  return (
    <Box>
      <form
        onSubmit={handleSubmit((value) => {
          console.log(value)
        })}
      >
        <TextField
          {...register('title')}
          fullWidth
          margin={'normal'}
          label="Title"
          type="text"
          error={
            formState.touchedFields.title && Boolean(formState.errors.title)
          }
          helperText={
            formState.touchedFields.title && formState.errors?.title?.message
          }
        />

        <TextField
          {...register('description')}
          fullWidth
          margin={'normal'}
          multiline
          rows={10}
          label="Description"
          type="text"
          error={
            formState.touchedFields.description &&
            Boolean(formState.errors.description)
          }
          helperText={
            formState.touchedFields.description &&
            formState.errors?.description?.message
          }
        />
        <br />
        <br />
        <Controller
          name="is_finish"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} color="primary" />
              }
              label="Finish"
            />
          )}
        />
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          disabled={
            !formState.isValid || !formState.isDirty || formState.isSubmitting
          }
        >
          Create
        </Button>
      </form>
    </Box>
  )
}
