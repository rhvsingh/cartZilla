import React from "react"

import Checkout from "../assets/pages/Checkout"
//const LoadingScreen = React.lazy(() => import("../assets/components/LoadingScreen"))
//const Checkout = React.lazy(() => import("../assets/pages/Checkout"))

const CartCheckout = ({ isAuth }) => {
    return (
        // <Suspense fallback={<LoadingScreen />}>
        //     <Checkout isAuth={isAuth} />
        // </Suspense>
        <Checkout isAuth={isAuth} />
    )
}

export default CartCheckout
