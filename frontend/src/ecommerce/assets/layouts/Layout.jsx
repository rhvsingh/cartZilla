import { lazy } from "react"

import CartState from "../../contexts/cartContext/CartState"

const Navigation = lazy(() => import("../components/Navigation"))
const Footer = lazy(() => import("../components/Footer"))

const Layout = (props) => {
    return (
        <CartState>
            <section className="ecommerce d-flex flex-direc-col justify-between">
                <div style={{ flex: "1" }}>
                    <Navigation />
                    <div className="container">{props.children}</div>
                </div>
                <Footer />
            </section>
        </CartState>
    )
}

export default Layout
