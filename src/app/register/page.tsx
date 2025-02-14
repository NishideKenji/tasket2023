'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, Button, Container, TextField } from '@mui/material'
import { TRPCClientError } from '@trpc/client'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { trpc } from '@/trpc/client'

const taskCreateSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
})

export default function RegisterForm() {
  const create = trpc.registerRouter.create.useMutation()

  const { register, handleSubmit, formState, reset, setError } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(taskCreateSchema),
    mode: 'onTouched',
  })

  return (
    <Container maxWidth="xs">
      <Box>
        <form
          onSubmit={handleSubmit(async (value) => {
            try {
              const res = await create.mutateAsync(value)

              enqueueSnackbar('Register Success' + res.username, {
                variant: 'success',
              })
              reset(value)
            } catch (error) {
              enqueueSnackbar('Register error:', { variant: 'error' })
              if (error instanceof TRPCClientError) {
                setError('root', {
                  type: 'manual',
                  message: error.message,
                })
              }
            }
          })}
        >
          <h3>Register</h3>

          <TextField
            {...register('username')}
            fullWidth
            margin={'normal'}
            label="User Name"
            type="text"
            error={
              formState.touchedFields.username &&
              Boolean(formState.errors.username)
            }
            helperText={
              formState.touchedFields.username &&
              formState.errors?.username?.message
            }
          />

          <TextField
            {...register('email')}
            fullWidth
            margin={'normal'}
            label="Email"
            type="email"
            error={
              formState.touchedFields.email && Boolean(formState.errors.email)
            }
            helperText={
              formState.touchedFields.email && formState.errors?.email?.message
            }
          />

          <TextField
            {...register('password')}
            fullWidth
            margin={'normal'}
            label="password"
            type="password"
            error={
              formState.touchedFields.password &&
              Boolean(formState.errors.password)
            }
            helperText={
              formState.touchedFields.password &&
              formState.errors?.password?.message
            }
          />

          <Button
            type="submit"
            variant="contained"
            disabled={
              formState.isSubmitting || !formState.isDirty || !formState.isValid
            }
          >
            Submit
          </Button>
          {formState.isSubmitted && !formState.isSubmitSuccessful && (
            <Alert severity="error">{formState.errors.root?.message}</Alert>
          )}
        </form>
      </Box>
    </Container>
  )
}
