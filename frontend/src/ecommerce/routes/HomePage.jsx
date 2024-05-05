import React from "react"

import LayoutSuspense from "../utils/LayoutSuspense"
import SplitLayout from "../assets/layouts/SplitLayout"
import ListCategory from "../assets/components/ListCategory"
import ProductShow from "../assets/pages/ProductShow"
// const LayoutSuspense = React.lazy(() => import("../utils/LayoutSuspense"))
// const SplitLayout = React.lazy(() => import("../assets/layouts/SplitLayout"))
// const ListCategory = React.lazy(() => import("../assets/components/ListCategory"))
// const ProductShow = React.lazy(() => import("../assets/pages/ProductShow"))

const HomePage = ({ isAuth }) => {
    return (
        <LayoutSuspense>
            <SplitLayout div1={15} div2={85} containerFluid={true}>
                <ListCategory />
                <ProductShow isAuth={isAuth} />
            </SplitLayout>
        </LayoutSuspense>
    )
}

export default HomePage
