import React from "react"

import AdminState from "../contexts/adminContext/adminState"
import AdminPanel from "../admin/AdminPanel"
// const LoadingScreen = React.lazy(() => import("../assets/components/LoadingScreen"))
// const AdminState = React.lazy(() => import("./contexts/adminContext/adminState"))
// const AdminPanel = React.lazy(() => import("./admin/AdminPanel"))

const AdminPanelRoute = () => {
    return (
        // <Suspense fallback={<LoadingScreen />}>
        //     <AdminState>
        //         <AdminPanel />
        //     </AdminState>
        // </Suspense>
        <AdminState>
            <AdminPanel />
        </AdminState>
    )
}

export default AdminPanelRoute
