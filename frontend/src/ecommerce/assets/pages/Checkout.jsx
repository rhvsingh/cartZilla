import { useEffect, useState, lazy } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaLock } from "react-icons/fa"
import axios from "axios"

import { config } from "../../utils/Constants"

import CheckoutStyles from "./checkout.module.css"
import SEO from "../components/SEO"

const SplitLayout = lazy(() => import("../layouts/SplitLayout"))
const CheckoutSteps = lazy(() => import("../components/checkout/CheckoutSteps"))
const OrderSummary = lazy(() => import("../components/checkout/OrderSummary"))

const Checkout = (props) => {
    const loc = useLocation()
    const navigate = useNavigate()

    //const [orderDetailsShow, setOrderDetailsShow] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [orderLoading, setOrderLoading] = useState(false)

    const [step, setStep] = useState(0)
    const [orderDetails, setOrderDetails] = useState({
        shippingAddressID: "",
        paymentMethodSelected: "",
        codCollectibleAmount: 0,
        itemsOrdered: [],
        totalPrice: 0,
        itemsPrice: 0,
        discountPrice: 0,
    })

    const [error, setError] = useState(null)

    function LocationRedirect() {
        const navigate = useNavigate()
        navigate("/login")
    }

    function LocationRedirectToHome() {
        const navigate = useNavigate()
        navigate("/")
    }
    const baseURL = config.url.API_URL

    useEffect(() => {
        const baseURL = config.url.API_URL
        let apiURL = baseURL + "showCart/" + localStorage.getItem("akey")
        axios.get(apiURL).then((response) => {
            //setOrderDetailsShow(response.data.result)
            let result = response.data.result
            let tprice = 0
            let qty = 0
            let discountPrice = 0
            let itemArray = []

            result.forEach((item) => {
                let productPrice = item.productDetails.price.toFixed(2)
                let discountedPrice = item.discountedPrice
                qty += item.qty
                tprice += parseFloat(discountedPrice)
                let itemShow = {
                    productId: item.pid,
                    productQty: item.qty,
                    productName: item.productDetails.name,
                    productPrice: productPrice,
                    productDesc: item.productDetails.desc,
                    productDiscount: item.productDetails.discount,
                    productDiscountedPrice: discountedPrice,
                    productImg: Array.isArray(item.productDetails.img)
                        ? item.productDetails.img[0]
                        : item.productDetails.img,
                }
                itemArray.push(itemShow)
            })
            setOrderDetails((oldValue) => ({
                ...oldValue,
                itemsCount: qty,
                itemsPrice: Math.round(tprice).toFixed(2),
                totalPrice: Math.round(tprice + discountPrice).toFixed(2),
                discountPrice: Math.round(discountPrice).toFixed(2),
                itemsOrdered: itemArray,
            }))
            setIsLoading(false)
        })
    }, [])

    if (!props.isAuth) {
        return <LocationRedirect />
    }

    if (loc.state === null) {
        return <LocationRedirectToHome />
    } else if (!loc.state.prevPath === "/cart") {
        return <LocationRedirectToHome />
    }

    function placeOrder() {
        setOrderLoading((oldValue) => !oldValue)
        let akey = localStorage.getItem("akey")
        let email = localStorage.getItem("email")

        let orderData = { orderDetails, akey, email }

        axios
            .post(baseURL + "checkoutProcess", orderData)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.status === 200) {
                        setOrderLoading((oldValue) => !oldValue)
                        navigate("/profile/orders")
                    } else if (response.data.status === 400 && response.data.error === 2) {
                        let resData = response.data.result
                        setError(resData)
                        setOrderLoading((oldValue) => !oldValue)
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                console.error(error)
            })

        // setTimeout(() => {
        //     setOrderLoading((oldValue) => !oldValue)
        //     navigate("/profile/orders")
        // }, 3000)
    }

    const stepButtonShow = ["Select Delivery Address", "Select Payment Method", "Place Order"]

    const handleEvent = () => {
        switch (step) {
            case 0:
                setStep(1)
                break
            case 1:
                setStep(2)
                break
            case 2:
                placeOrder()
                break
            default:
                break
        }
    }

    return (
        <>
            <SEO title={"Checkout | CartZilla"} />
            <main className="d-flex flex-direc-col justify-between" style={{ minHeight: "100vh" }}>
                <header className="px-1">
                    <div
                        className={
                            "container-2 d-flex justify-between align-items-center py-1 " +
                            CheckoutStyles.main
                        }
                    >
                        <div className="main-heading">CartZilla</div>
                        <div style={{ fontSize: "1.5rem" }}>Checkout</div>
                        <div>
                            <FaLock style={{ fontSize: "1.5rem" }} />
                        </div>
                    </div>
                </header>

                {error && (
                    <div className="container-2" style={{ width: "100%" }}>
                        <div className="px-2 py-1">
                            <ul className={CheckoutStyles.error}>
                                {error.map((el) => (
                                    <li key={el.pid}>
                                        <span>{el.name}</span> exceeds stock. Only left{" "}
                                        <span>{el.stock}</span> in stock.
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                <div style={{ flex: "100%", padding: "0 4px" }}>
                    {!isLoading && (
                        <SplitLayout div1={75} div2={25}>
                            <CheckoutSteps
                                orderDetails={orderDetails}
                                setOrderDetails={setOrderDetails}
                                step={step}
                                setStep={setStep}
                                handleEvent={handleEvent}
                                stepButtonShow={stepButtonShow}
                                loading={orderLoading}
                            />
                            <OrderSummary
                                orderDetails={orderDetails}
                                step={step}
                                setStep={setStep}
                                handleEvent={handleEvent}
                                stepButtonShow={stepButtonShow}
                                loading={orderLoading}
                            />
                        </SplitLayout>
                    )}
                </div>
            </main>
        </>
    )
}

export default Checkout
