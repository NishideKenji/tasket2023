import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import type { Task } from '@prisma/client'
import { TRPCClientError } from '@trpc/client'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { trpc } from '@/utils/trpc'

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
  const create = trpc.taskRouter.create.useMutation()
  const update = trpc.taskRouter.update.useMutation()

  const { register, handleSubmit, control, formState, reset, setError } =
    useForm({
      defaultValues: task,
      resolver: zodResolver(taskCreateSchema),
      mode: 'onTouched',
    })

  return (
    <Box>
      <form
        onSubmit={handleSubmit(async (value) => {
          if (task.id === '') {
            try {
              const res = await create.mutateAsync(value)
              enqueueSnackbar('Create Success', { variant: 'success' })
              reset(value)
            } catch (error) {
              enqueueSnackbar('Create error:', { variant: 'error' })

              if (error instanceof TRPCClientError) {
                setError('root', {
                  type: 'manual',
                  message: error.message,
                })
              }
            }
          } else {
            try {
              const res = await update.mutateAsync(value)
              enqueueSnackbar('Updated Success', { variant: 'success' })
              reset(value)
            } catch (error) {
              enqueueSnackbar('Updated error:', { variant: 'error' })

              if (error instanceof TRPCClientError) {
                setError('root', {
                  type: 'manual',
                  message: error.message,
                })
              }
            }
          }
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="end_date_scheduled"
            control={control}
            render={({ field: { onChange, onBlur, ...field } }) => (
              <DatePicker<Date>
                {...field}
                onChange={(value) => {
                  onChange(value)
                  onBlur()
                }}
              />
            )}
          />
        </LocalizationProvider>
        <br />
        <br />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="end_date_actual"
            control={control}
            render={({ field: { onChange, onBlur, ...field } }) => (
              <DatePicker<Date>
                {...field}
                onChange={(value) => {
                  onChange(value)
                  onBlur()
                }}
              />
            )}
          />
        </LocalizationProvider>
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
        <Button
          type="submit"
          variant="contained"
          disabled={
            !formState.isValid || !formState.isDirty || formState.isSubmitting
          }
        >
          {task.id === '' ? 'Create' : 'Update'}
        </Button>
        {formState.isSubmitted && !formState.isSubmitSuccessful && (
          <Alert severity="error">{formState.errors.root?.message}</Alert>
        )}
      </form>
    </Box>
  )
}
