import React from 'react'
import { styled } from '@mui/material/styles';
import { Card, CardContent, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const LoginFormContainer = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    maxWidth: theme.spacing(50),
    '& .MuiFormControl-root ': {
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));


const loginSchema = yup.object({
    email: yup.string().trim().required().email(),
    password: yup.string().required(),
}).required();


export default function LoginForm() {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const onSubmit = data => {
        console.log(data);
        navigate('/dashboard',{replace:true})
    }

    return (
        <LoginFormContainer>
            <CardContent>
                <Typography align='center' variant='h5' component={'h1'} >Login</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField type="email" label="Email-Id"
                        variant="outlined" {...register("email")}
                        error={!!errors.email?.message}
                        helperText={errors.email?.message}
                    />
                    <TextField type="password" label="Password"
                        variant="outlined" {...register("password")}
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                    />
                    <LoadingButton type='submit' sx={{ marginTop: '1rem' }} variant='contained' disabled={!isValid} >Login</LoadingButton>
                </form>
            </CardContent>
        </LoginFormContainer>
    )
}
