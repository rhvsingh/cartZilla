import React from "react"

import LayoutSuspense from "../utils/LayoutSuspense"
import CategoryPage from "../assets/pages/CategoryPage"
// const LayoutSuspense = React.lazy(() => import("../utils/LayoutSuspense"))
// const CategoryPage = React.lazy(() => import("../assets/pages/CategoryPage"))

const CategoryShowPage = ({ isAuth }) => {
    return (
        <LayoutSuspense>
            <CategoryPage isAuth={isAuth} />
        </LayoutSuspense>
    )
}

export default CategoryShowPage
