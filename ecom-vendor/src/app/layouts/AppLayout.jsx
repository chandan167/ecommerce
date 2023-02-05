import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LazyLoad from '../../components/LazyLoad'
import SideNavbar from './SideNavbar'
import { Box } from '@mui/system'
import TopBar from './TopBar'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'
import { getAuthData } from '../auth/authSlice'

export default function AppLayout() {
    const theme = useTheme()
    const navigate = useNavigate()
    const authData = useSelector(getAuthData)

    useEffect(() => {
        if(!authData.token){
            navigate('/login',{replace:true})
        }
    }, [authData.token])

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <SideNavbar />
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <TopBar />
                <Box sx={{margin: theme.spacing(1)}}>
                <LazyLoad>
                    <Outlet />
                </LazyLoad>
                </Box>
               
            </Box>

        </Box>
    )
}
