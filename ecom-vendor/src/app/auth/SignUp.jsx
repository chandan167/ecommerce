import { Box } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import SignUpForm from './SignUpForm';

const SignUpContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export default function SignUp() {
    return (
        <SignUpContainer className='main'>
            <Box>
                <SignUpForm />
            </Box>
        </SignUpContainer>
    )
}
