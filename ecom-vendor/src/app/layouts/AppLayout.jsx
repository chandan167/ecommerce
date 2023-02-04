import React from 'react'
import { Outlet } from 'react-router-dom'
import LazyLoad from '../../components/LazyLoad'
import SideNavbar from './SideNavbar'
import { Box } from '@mui/system'
import TopBar from './TopBar'
import { useTheme } from '@emotion/react'

export default function AppLayout() {
    const theme = useTheme()
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
