import React from "react"

import LayoutSuspense from "../utils/LayoutSuspense"
import ProductPage from "../assets/pages/ProductPage"
// const LayoutSuspense = React.lazy(() => import("../utils/LayoutSuspense"))
// const ProductPage = React.lazy(() => import("../assets/pages/ProductPage"))

const ProductShowPage = ({ isAuth }) => {
    return (
        <LayoutSuspense>
            <ProductPage isAuth={isAuth} />
        </LayoutSuspense>
    )
}

export default ProductShowPage
