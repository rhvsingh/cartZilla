import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaLock } from "react-icons/fa"
import { HelmetProvider, Helmet } from "react-helmet-async"
import axios from "axios"

import { config } from "../../utils/Constants"
import SplitLayout from "../layouts/SplitLayout"
import CheckoutSteps from "../components/checkout/CheckoutSteps"
import OrderSummary from "../components/checkout/OrderSummary"

import CheckoutStyles from "./checkout.module.css"

const Checkout = (props) => {
  const loc = useLocation()

  //const [orderDetailsShow, setOrderDetailsShow] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [orderDetails, setOrderDetails] = useState({
    shippingAddressSelected: "",
    paymentMethodSelected: "",
    codCollectibleAmount: 0,
    itemsOrdered: [],
    totalPrice: 0,
    itemsPrice: 0,
    discountPrice: 0,
  })

  const baseURL = config.url.API_URL

  function LocationRedirect() {
    const navigate = useNavigate()
    navigate("/login")
  }

  function LocationRedirectToHome() {
    const navigate = useNavigate()
    navigate("/")
  }

  useEffect(() => {
    let apiURL = baseURL + "showCart/" + localStorage.getItem("akey")
    axios.get(apiURL).then((response) => {
      //setOrderDetailsShow(response.data.result)
      let result = response.data.result
      let tprice = 0
      let qty = 0
      let discountPrice = 0
      result.forEach((item) => {
        tprice += item.tprice
        qty += item.qty
      })

      console.log(tprice)
      setOrderDetails((oldValue) => ({
        ...oldValue,
        itemsCount: qty,
        itemsPrice: Math.round(tprice).toFixed(2),
        totalPrice: Math.round(tprice + discountPrice).toFixed(2),
        discountPrice: Math.round(discountPrice).toFixed(2),
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

  /* Just adding comment to check gpg is working or not. signed commits working or not */

  const stepButtonShow = [
    "Select Delivery Address",
    "Select Payment Method",
    "Check Items",
    "Place your order",
  ]

  const handleEvent = () => {
    switch (step) {
      case 0:
        setStep(1)
        break
      case 1:
        setStep(2)
        break
      case 2:
        setStep(3)
        break
      case 3:
        console.log("Order Placed")
        break
      default:
        break
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Checkout | CartZilla</title>
        </Helmet>
      </HelmetProvider>
      <main
        className="d-flex flex-direc-col justify-between"
        style={{ minHeight: "100vh" }}
      >
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
        <div style={{ flex: "100%" }}>
          {!isLoading && (
            <SplitLayout div1={75} div2={25}>
              <CheckoutSteps
                setOrderDetails={setOrderDetails}
                step={step}
                setStep={setStep}
                handleEvent={handleEvent}
                stepButtonShow={stepButtonShow}
              />
              <OrderSummary
                orderDetails={orderDetails}
                step={step}
                setStep={setStep}
                handleEvent={handleEvent}
                stepButtonShow={stepButtonShow}
              />
            </SplitLayout>
          )}
        </div>
      </main>
    </>
  )
}

export default Checkout
