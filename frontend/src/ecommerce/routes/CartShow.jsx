import React from "react"

import LayoutSuspense from "../utils/LayoutSuspense"
import Cart from "../assets/pages/Cart"
// const LayoutSuspense = React.lazy(() => import("../utils/LayoutSuspense"))
// const Cart = React.lazy(() => import("../assets/pages/Cart"))

const CartShow = ({ isAuth }) => {
    return (
        <LayoutSuspense>
            <Cart isAuth={isAuth} />
        </LayoutSuspense>
    )
}

export default CartShow
