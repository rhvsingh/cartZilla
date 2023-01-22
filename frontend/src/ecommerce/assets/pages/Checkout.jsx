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

  function solution(n, str) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      let counter = 0;
      let val = str[i];
      for (let j = 0; j < n; j++) {
        if (val == str[j]) {
          counter = counter + 1;
        }
      }
    }
    return 0;
  }

  return <>
    <SplitLayout>
      <div>Hello</div>
      <div>Yellow</div>
    </SplitLayout>
  </>
}

export default Checkout
