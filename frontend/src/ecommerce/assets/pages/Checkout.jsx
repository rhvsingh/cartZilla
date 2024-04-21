import { useEffect, useState, lazy } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaLock } from "react-icons/fa"
import axios from "axios"

import { config } from "../../utils/Constants"
import SEO from "../components/SEO"

import CheckoutStyles from "./checkout.module.css"

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

    function LocationRedirect() {
        const navigate = useNavigate()
        navigate("/login")
    }

    function LocationRedirectToHome() {
        const navigate = useNavigate()
        navigate("/")
    }

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
                //console.log(item)
                tprice += item.tprice
                qty += item.qty

                let productPrice = item.productDetails.price.toFixed(2)
                let discountedPrice = (
                    productPrice -
                    (productPrice / 100) * item.productDetails.discount
                ).toFixed(2)
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
        console.log("order place")
        setOrderLoading((oldValue) => !oldValue)
        setTimeout(() => {
            setOrderLoading((oldValue) => !oldValue)
            navigate("/profile/orders")
        }, 3000)
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

    let titleShow = step !== -1 ? stepButtonShow[step] + " | CartZilla" : "Checkout | CartZilla"

    return (
        <>
            <SEO title={titleShow} />
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
