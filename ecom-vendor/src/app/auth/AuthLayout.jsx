import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ChangeThemeIcon } from '../../components/ChangeThemeIcon'
import { Box } from '@mui/material'
import LazyLoad from '../../components/LazyLoad'
import { useSelector } from 'react-redux'
import { getAuthData } from './authSlice'
import { useEffect } from 'react'

export default function AuthLayout() {
    const navigate = useNavigate()
    const authData = useSelector(getAuthData)

    useEffect(()=>{
        if(authData.token && authData.token.authToken){
            navigate('/dashboard',{replace:true})
        }
    }, [authData.token])
    return (
        <>
            <LazyLoad>
                <Box sx={{ position: 'absolute', right: 0, top: 0, padding: '0.3rem' }}>
                    <ChangeThemeIcon />
                </Box>
                <Outlet />
            </LazyLoad>
        </>
    )
}
