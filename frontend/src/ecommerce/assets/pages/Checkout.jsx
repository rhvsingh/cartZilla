import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import SplitLayout from "../layouts/SplitLayout"

const Checkout = (props) => {
  const navigate = useNavigate()
  const loc = useLocation()

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

  if (!props.isAuth) {
    return <LocationRedirect />
  }

  if (loc.state === null) {
    return <LocationRedirectToHome />
  } else if (!loc.state.prevPath === "/cart") {
    return <LocationRedirectToHome />
  }

  /* Just adding comment to check gpg is working or not. signed commits working or not */

  return <>
    <SplitLayout div1={70} div2={30}>
      <div>Hello</div>
      <div>Yellow</div>
    </SplitLayout>
  </>
}

export default Checkout
