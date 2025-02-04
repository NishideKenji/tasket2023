'use client'

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Task } from '@prisma/client'
import { TRPCClientError } from '@trpc/client'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { trpc } from '@/trpc/client'

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
  const router = useRouter()

  const create = trpc.taskRouter.create.useMutation()

  const update = trpc.taskRouter.update.useMutation()

  const taskdelete = trpc.taskRouter.delete.useMutation()

  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false)
  const { register, handleSubmit, control, formState, reset, setError } =
    useForm({
      defaultValues: task,
      resolver: zodResolver(taskCreateSchema),
      mode: 'onTouched',
    })

  useEffect(() => {
    if (task) {
      reset(task)
    }
  }, [task, reset])

  return (
    <Box>
      <form
        onSubmit={handleSubmit(async (value) => {
          if (task.id === '') {
            try {
              const res = await create.mutateAsync(value)
              enqueueSnackbar('Create Success', { variant: 'success' })
              reset(res)
              router.push(`/${res?.id}`)
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
              await update.mutateAsync(value)
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="end_date_scheduled"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <DatePicker
                {...field}
                label="Scheduled End Date"
                value={value ? dayjs(value) : null}
                format="YYYY/MM/DD"
                onChange={(newValue) => onChange(newValue?.toDate() || null)}
              />
            )}
          />
        </LocalizationProvider>
        <br />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="end_date_actual"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <DatePicker
                {...field}
                label="Actual End Date"
                value={value ? dayjs(value) : null}
                format="YYYY/MM/DD"
                onChange={(newValue) => onChange(newValue?.toDate() || null)}
              />
            )}
          />
        </LocalizationProvider>

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

      <br />
      <Button
        disabled={isSubmittingDelete || task.id === ''}
        type="submit"
        variant="contained"
        color="warning"
        onClick={async () => {
          setIsSubmittingDelete(true)
          if (task.id !== '') {
            try {
              await taskdelete.mutateAsync({ id: task.id })
              enqueueSnackbar('Task Deleted', { variant: 'success' })
              router.push(`/`)
            } catch (error) {
              console.log(error)
              enqueueSnackbar('Updated error:', { variant: 'error' })
            }
          }
        }}
      >
        Delete
      </Button>
    </Box>
  )
}
