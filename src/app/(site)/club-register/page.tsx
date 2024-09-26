import Paper from '@/components/Assets/Paper'
import TextField from '@/components/Form/TextField'
import ClubRegisterForm from '@/components/Routes/Club/ClubRegisterForm'
import React from 'react'

export default function ClubRegisterPage() {
  return (
    <Paper className='w-full max-w-4xl my-10 mx-auto border border-hgray-300'>
        <ClubRegisterForm />
    </Paper>
  )
}
