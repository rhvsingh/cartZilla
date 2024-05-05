import React from "react"

import LayoutSuspense from "../utils/LayoutSuspense"
import Login from "../assets/components/Login"
// const LayoutSuspense = React.lazy(() => import("../utils/LayoutSuspense"))
// const Login = React.lazy(() => import("../assets/components/Login"))

const LoginShow = () => {
    return (
        <LayoutSuspense>
            <Login />
        </LayoutSuspense>
    )
}

export default LoginShow
