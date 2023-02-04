import { useTheme } from '@emotion/react';
import { Dashboard, PieChart } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, useProSidebar } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { constant } from '../../utils/constant';



export default function SideNavbar() {


    const theme = useTheme()
    const { collapsed } = useProSidebar();
    const menuStyle = {
        marginTop: theme.spacing(3),
        [`.${menuClasses.subMenuContent}`]: {
            backgroundColor: theme.palette.background.default,
        },
        [`.${menuClasses.button}`]: {
            borderRadius: '0.4rem',
            height: theme.spacing(5.5),
        },
        [`.${menuClasses.button}:hover`]: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main,
        }
    }
    const activeStyle = { color: theme.palette.primary.main }
    return (
        <Sidebar backgroundColor={theme.palette.background.default} breakPoint="sm" rootStyles={{
            borderColor: theme.palette.divider,
        }}>
            {!collapsed ? <Typography align='center' variant='h6' component={'h1'} sx={{
                margin: theme.spacing(2),
            }}>{constant.appName}</Typography> : null}
            <Menu rootStyles={menuStyle}>
                <MenuItem icon={<Dashboard />} component={<NavLink to={'/dashboard'} style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                } />}> Dashboard </MenuItem>
                <SubMenu label="Charts" icon={<PieChart />}>
                    <MenuItem > Pie charts </MenuItem>
                    <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    )
}
