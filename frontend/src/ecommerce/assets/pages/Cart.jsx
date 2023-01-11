import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import CartSkeleton from "../components/cart/CartSkeleton"
import CartEach from "../components/cart/CartEach"

import "./cart.css"

const Cart = ({ isAuth }) => {
    const navigate = useNavigate()
    const location = useLocation()

    if (isAuth) {
    } else {
        navigate("/login")
    }

    const baseURL = "http://localhost:4000/"
    const [cartCount, setCartCount] = useState(0)
    const [totalCartCount, setTotalCartCount] = useState(0)
    const [tPriceShow, setTPriceShow] = useState(0)
    const [cartDetails, setCartDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let apiURL = baseURL + "cartCount/" + localStorage.getItem("akey")
        axios.get(apiURL).then((response) => {
            setCartCount(response.data.count)
            setTotalCartCount(response.data.totalQty)
            setTPriceShow(response.data.tCalcPrice)
        })
    }, [totalCartCount, cartDetails])

    useEffect(() => {
        let apiURL = baseURL + "showCart/" + localStorage.getItem("akey")
        axios.get(apiURL).then((response) => {
            setCartDetails(response.data.result)
            setIsLoading(false)
        })
    }, [])

    const changeQty = (qty, pid) => {
        let apiURL = baseURL + "addCart/" + localStorage.getItem("akey")

        axios
            .post(apiURL, {
                pid: pid,
                qty: qty,
            })
            .then((response) => {
                setTotalCartCount((oldValue) => oldValue + qty)
            })
    }

    const deleteCart = (data) => {
        setCartDetails(
            cartDetails.filter((cart) => {
                return cart.pid !== data
            })
        )
    }

    const proFromCartDelete = (pid) => {
        let apiURL =
            baseURL + "cartDelete/" + pid + "/" + localStorage.getItem("akey")
        axios.get(apiURL).then((response) => {
            if (response.data.result) {
                setCartDetails(
                    cartDetails.filter((cart) => {
                        return cart.pid !== pid
                    })
                )
            }
        })
    }

    const checkoutCart = () => {
        return navigate("/checkout", {
            state: { prevPath: location.pathname }
        })
    }

    return (
        <div className="container d-flex justify-between py-2 px-2 gap-2">
            <div className="cart-details px-2 py-2">
                <div className="d-flex justify-between">
                    <div
                        style={{
                            fontSize: "1.5rem",
                            paddingBottom: "0.25rem",
                            fontWeight: "500",
                        }}
                    >
                        Shopping Cart
                    </div>
                    <div>Products in Cart: {cartCount}</div>
                </div>
                {isLoading && <CartSkeleton carts={4} />}
                {cartDetails.length > 0 &&
                    cartDetails.map((item) => {
                        return (
                            <CartEach
                                key={item._id}
                                details={item}
                                changeQty={changeQty}
                                deleteCart={deleteCart}
                                proFromCartDelete={proFromCartDelete}
                            />
                        )
                    })}
            </div>
            <div className="cart-submit-container">
                <button className="cart-submit-button mobile-cart-submit-button">
                    Proceed to Buy (
                    {totalCartCount > 1
                        ? `${totalCartCount} items`
                        : `${totalCartCount} item`}
                    )
                </button>
            </div>
            <div>
                <div className="cart-subtotal px-1 py-1">
                    <span style={{ fontWeight: "500" }}>
                        Subtotal (
                        {totalCartCount > 1
                            ? `${totalCartCount} items`
                            : `${totalCartCount} item`}
                        ):
                    </span>
                    <span style={{ fontWeight: "600" }}>&nbsp;&#8377;{tPriceShow}</span>
                    <div className="cart-submit-container">
                        <button className="cart-submit-button" onClick={checkoutCart}>
                            Proceed to Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
