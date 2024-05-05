import { lazy, startTransition, useContext } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import axios from "axios"

import { config } from "../../utils/Constants"
import { commaAdder } from "../../utils/utilityFunctions"
import SEO from "../components/SEO"

import "./cart.css"

import CartContext from "../../contexts/cartContext/CartContext"

const CartSkeleton = lazy(() => import("../components/cart/CartSkeleton"))
const CartEach = lazy(() => import("../components/cart/CartEach"))

const baseURL = config.url.API_URL

const Cart = ({ isAuth }) => {
    const {
        cartCount,
        totalCartCount,
        setTotalCartCount,
        tPriceShow,
        cartDetails,
        setCartDetails,
        isLoading,
    } = useContext(CartContext)

    const navigate = useNavigate()
    const location = useLocation()

    if (isAuth) {
    } else {
        navigate("/login")
    }

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
        let apiURL = baseURL + "cartDelete/" + pid + "/" + localStorage.getItem("akey")
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
        startTransition(() => {
            navigate("/checkout", {
                state: { prevPath: location.pathname },
            })
        })
        return
    }

    return isLoading ? (
        <></>
    ) : cartCount ? (
        <>
            <SEO title={"Cart | CartZilla"} />
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
                        {totalCartCount > 1 ? `${totalCartCount} items` : `${totalCartCount} item`})
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
                        <span
                            style={{
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                            }}
                        >
                            &nbsp;&#8377;{commaAdder(tPriceShow.toFixed(2))}
                        </span>
                        <div className="cart-submit-container">
                            <button className="cart-submit-button" onClick={checkoutCart}>
                                Proceed to Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <SEO title={"Cart | CartZilla"} />
            <div className="container d-flex justify-between py-2 px-2 gap-2">
                <div className="px-2 py-2">
                    <span style={{ fontSize: "2rem", fontWeight: "500" }}>
                        Your CartZilla cart is empty.
                    </span>
                    <br />
                    <Link to=".." relative="path">
                        Continue shopping
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Cart
