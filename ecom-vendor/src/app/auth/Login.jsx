import { Box } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import LoginForm from './LoginForm';

const LoginContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export default function Login() {
    return (
        <LoginContainer className='main'>
            <Box>
                <LoginForm />
            </Box>
        </LoginContainer>
    )
}
