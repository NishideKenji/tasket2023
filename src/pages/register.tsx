import { Box, Button, Container, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'



export default function RegisterForm() {

  const { register, handleSubmit,
   } =
    useForm({
      defaultValues: {
        username: '',
        email: '',
        password: '',
      },
    })

  return (
    <Container maxWidth="xs">
      <Box>
        <form
          onSubmit={handleSubmit((value) => {
            console.log(value)
          })}
        >
          <h3>Register</h3>

          <TextField
            {...register('username')}
            fullWidth
            margin={'normal'}
            label="User Name"
            type="text"
          />

          <TextField
            {...register('email')}
            fullWidth
            margin={'normal'}
            label="Email"
            type="email"
          />

          <TextField
            {...register('password')}
            fullWidth
            margin={'normal'}
            label="password"
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  )
}