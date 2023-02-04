import { lazy } from 'react'
import { BrowserRouter, Navigate, Routes as ReactRoutes, Route } from 'react-router-dom'
import AuthLayout from './app/auth/AuthLayout'
import AppLayout from './app/layouts/AppLayout'

const Login = lazy(() => import('./app/auth/Login'))
const Dashboard = lazy(() => import('./app/dashboard/Dashboard'))

export default function Routes() {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route element={<AuthLayout />} >
                    <Route path='/login' element={<Login />} />
                </Route>
                <Route element={<AppLayout />} >
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route path='/' element={<Navigate to="/login" />} />
            </ReactRoutes>
        </BrowserRouter>
    )
}
