import React from "react"

import LayoutSuspense from "../utils/LayoutSuspense"
import NewHome from "../assets/pages/NewHome"
// const LayoutSuspense = React.lazy(() => import("../utils/LayoutSuspense"))
// const NewHome = React.lazy(() => import("../assets/pages/NewHome"))

const LandingPage = ({ isAuth }) => {
    return (
        <LayoutSuspense>
            <NewHome isAuth={isAuth} />
        </LayoutSuspense>
    )
}

export default LandingPage
