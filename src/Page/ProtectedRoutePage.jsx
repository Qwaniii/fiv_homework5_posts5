import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoutePage = ({ isAuth }) => {

    const location = useLocation()

    const { pathname } = location

    const token = sessionStorage.getItem("token")


    if (!token) {
        return (
            <Navigate to="/fo_homework4_post4/login" state={{pathname}} replace />
        )
    }

    return <Outlet/>
}

export default ProtectedRoutePage