import React from 'react'
import { styled } from '@mui/material/styles';
import { Card, CardContent, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { StatusCodes } from 'http-status-codes'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, getAuthLoadingState, signUp } from './authSlice';
import { loading } from '../../utils/loadingState';
import { useEffect } from 'react';

const SignUpFormContainer = styled(Card)(({ theme }) => ({
    margin: theme.spacing(2),
    maxWidth: theme.spacing(50),
    '& .MuiFormControl-root ': {
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));


const loginSchema = yup.object({
    firstName: yup.string().trim().required(),
    lastName: yup.string().optional().trim(),
    email: yup.string().trim().required().email(),
    password: yup.string().required(),
    passwordConfirmation: yup.string().trim().required().when('password', (password, field) =>
        password ? field.required().oneOf([yup.ref('password')]) : field
    ),
}).required();


export default function SignUpForm() {

    const loadingState = useSelector(getAuthLoadingState)
    const error = useSelector(getAuthError)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const onSubmit = data => {
        dispatch(signUp(data))
    }

    useEffect(() => {
        if(error && error.validationError){
            const fields = Object.keys(error.validationError)
            fields.forEach(field => {
                const message = error.validationError[field].msg;
                setError(field, {message})
            })
        }
    }, [error])
    

    return (
        <SignUpFormContainer>
            <CardContent>
                <Typography align='center' variant='h5' component={'h1'} >Login</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField type="text" label="First Name"
                        variant="outlined" {...register("firstName")}
                        error={!!errors.firstName?.message}
                        helperText={errors.firstName?.message} value={'Chandan'}
                    />
                    <TextField type="text" label="Last Name"
                        variant="outlined" {...register("lastName")}
                        error={!!errors.lastName?.message}
                        helperText={errors.lastName?.message} value={'Singh'}
                    />
                    <TextField type="email" label="Email-Id"
                        variant="outlined" {...register("email")} 
                        error={!!errors.email?.message}
                        helperText={errors.email?.message}
                    />
                    <TextField type="password" label="Password"
                        variant="outlined" {...register("password")}
                        error={!!errors.password?.message}
                        helperText={errors.password?.message} value={'p'}
                    />
                    <TextField type="password" label="Confirm Password"
                        variant="outlined" {...register("passwordConfirmation")}
                        error={!!errors.passwordConfirmation?.message}
                        helperText={errors.passwordConfirmation?.message} value={'p'}
                    />
                    <LoadingButton loading={loadingState == loading.loading} type='submit' sx={{ marginTop: '1rem' }} variant='contained' disabled={!isValid} >SignUp</LoadingButton>
                </form>
            </CardContent>
        </SignUpFormContainer>
    )
}
