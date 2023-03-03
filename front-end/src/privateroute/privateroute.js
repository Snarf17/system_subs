import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from "react-router-dom"

export function PrivateAdmin() {
    const [state] = useContext(UserContext)
    // console.log(state);
    return (
        <>
        {!localStorage.getItem('token') ? (
            <Navigate to="/"/>
        ): state?.isLogin && state.user?.role === "admin" ? (
            <Outlet />
        ): (
            state?.isLogin && state.user?.role === "user"  && <Navigate to='/' />
        )
        }
            {/* {state.isLogin !== false && state?.user?.role === "admin" ?  <Outlet/> : <Navigate to="/" />} */}
        </>
    )
}

export function PrivateUser() {
    const [state] = useContext(UserContext)
    return (
        <>
            {!localStorage.getItem('token') ? (
            <Navigate to="/"/>
        ): state?.isLogin && state.user?.role === "" ? (
            <Outlet />
        ): (
            <Navigate to='/' />
        )
        }
        {/* {state.isLogin !== false ? <Outlet /> : <Navigate to="/" />} */}
        </>
    )   
}


