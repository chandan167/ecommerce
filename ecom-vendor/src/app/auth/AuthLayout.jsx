import React from 'react'
import { Outlet } from 'react-router-dom'
import { ChangeThemeIcon } from '../../components/ChangeThemeIcon'
import { Box } from '@mui/material'
import LazyLoad from '../../components/LazyLoad'

export default function AuthLayout() {
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
