import { useEffect } from "react"
import { useNavigate, redirect, useNavigationType, useLocation } from "react-router-dom"
const Checkout = (props) => {
  const navigate = useNavigate()
  const navType = useNavigationType()
  const loc = useLocation()

  function LocationRedirect() {
    useEffect(() => {
      navigate("/login")
    }, [])
  }

  if (!props.isAuth) {
    //return <LocationRedirect />
    return redirect("/login")
  }



  console.log(loc, navType)
  return <div>Checkout</div>
}

export default Checkout
