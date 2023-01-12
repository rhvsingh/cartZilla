import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
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

  return <div>Checkout</div>
}

export default Checkout
