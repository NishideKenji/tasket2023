import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Container, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { trpc } from '@/utils/trpc'

const taskCreateSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
})

export default function RegisterForm() {
  const create = trpc.registerRouter.create.useMutation()

  const { register, handleSubmit, formState } = useForm({
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
          onSubmit={handleSubmit((value) => {
            console.log(value)
            create.mutate(value, {
              onSuccess: (data) => {
                console.log('Register Success:', data)
              },
              onError: (error) => {
                console.log('Register error:', error)
              },
            })
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
          {true && (
            //状態を表示したいときはここをtrueにする
            <>
              <br />
              {formState.isSubmitting ? 'Submitting' : 'Not Submitting'}
              <br />
              {formState.isDirty ? 'Dirty' : 'Not Dirty'}
              <br />
              {formState.isValid ? 'isValid' : 'Not isValid'}
              <br />
            </>
          )}
        </form>
      </Box>
    </Container>
  )
}
