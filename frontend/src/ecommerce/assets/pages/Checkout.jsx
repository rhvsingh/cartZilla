import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaLock } from "react-icons/fa"
import axios from "axios"

import SplitLayout from "../layouts/SplitLayout"
import CheckoutSteps from "../components/checkout/CheckoutSteps"
import OrderSummary from "../components/checkout/OrderSummary"

import CheckoutStyles from "./checkout.module.css"

const Checkout = (props) => {
  const navigate = useNavigate()
  const loc = useLocation()

  //const [orderDetailsShow, setOrderDetailsShow] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState({
    shippingAddressSelected: "",
    paymentMethodSelected: "",
    codCollectibleAmount: 0,
    itemsOrdered: [],
    totalPrice: 0,
    itemsPrice: 0,
    discountPrice: 0,
  })

  const baseURL = "http://localhost:4000/"

  function LocationRedirect() {
    useEffect(() => {
      navigate("/login")
    }, [])
  }

  function LocationRedirectToHome() {
    useEffect(() => {
      navigate("/")
    }, [])
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

  return (
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
        <SplitLayout div1={75} div2={25}>
          <CheckoutSteps setOrderDetails={setOrderDetails} />
          <OrderSummary orderDetails={orderDetails} />
        </SplitLayout>
      </div>
    </main>
  )
}

export default Checkout
