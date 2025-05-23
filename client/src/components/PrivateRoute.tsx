import React from 'react'
//import { useSelector } from 'react-redux'
import { useAppSelector } from '../redux/hooks';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const {currentUser} = useAppSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute