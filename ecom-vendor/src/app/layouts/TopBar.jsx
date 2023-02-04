import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import { useProSidebar } from 'react-pro-sidebar';
import { ChangeThemeIcon } from '../../components/ChangeThemeIcon';

export default function TopBar() {
    const { collapseSidebar, toggleSidebar,broken } = useProSidebar();
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => {
                        if (broken) {
                            toggleSidebar(); 
                        } else {
                            collapseSidebar();
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <ChangeThemeIcon />
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}
