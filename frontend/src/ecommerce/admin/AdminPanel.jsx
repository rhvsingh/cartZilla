import React, { useEffect, Suspense, useContext } from "react"
import AdminPanelLogin from "./components/AdminPanelLogin"

import adminContext from "../contexts/adminContext/adminContext"

import LoadingScreen from "../assets/components/LoadingScreen"

const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"))

const AdminPanel = () => {
    const contextData = useContext(adminContext)

    const [isAuth, setIsAuth] = [contextData.isAuth, contextData.setIsAuth]
    const [loading, setLoading] = [contextData.loading, contextData.setLoading]

    useEffect(() => {
        if (localStorage.getItem("email") && localStorage.getItem("akey")) {
            contextData.userLogChecker()
        } else {
            setIsAuth(false)
            setLoading((oldValue) => {
                if (oldValue === true) {
                    return false
                }
            })
        }
        // eslint-disable-next-line
    }, [])

    return loading ? (
        <div>Loading.....</div>
    ) : isAuth ? (
        <Suspense fallback={<LoadingScreen />}>
            <AdminDashboard setIsAuth={setIsAuth} />
        </Suspense>
    ) : (
        <>
            <AdminPanelLogin />
        </>
    )
}

export default AdminPanel
