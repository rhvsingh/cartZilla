import React, { useState, useEffect, Suspense } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"
import axios from "axios"

import "react-toastify/dist/ReactToastify.css"

import Layout from "./assets/layouts/Layout"

/* import ProductShow from './assets/pages/ProductShow'
import Cart from './assets/pages/Cart'
import Login from './assets/components/Login'
import NotFoundPage from "./assets/components/NotFoundPage"
import Profile from './assets/pages/Profile' */
/* import Address from './assets/components/profile/Address' */

import LoadingScreen from "./assets/components/LoadingScreen"

const ProductShow = React.lazy(() => import("./assets/pages/ProductShow"))
const Cart = React.lazy(() => import("./assets/pages/Cart"))
const Checkout = React.lazy(() => import("./assets/pages/Checkout"))
const NotFoundPage = React.lazy(() =>
  import("./assets/components/NotFoundPage")
)
const Login = React.lazy(() => import("./assets/components/Login"))
const Profile = React.lazy(() => import("./assets/pages/Profile"))
const Address = React.lazy(() => import("./assets/components/profile/Address"))

const Ecommerce = () => {
  const [localSet, setLocalSet] = useState(false)
  const [loading, setLoading] = useState(true)

  const [isAuth, setIsAuth] = useState(localSet)

  async function UserLogCheck() {
    if (
      !isAuth &&
      localStorage.getItem("email") &&
      localStorage.getItem("akey")
    ) {
      let callData = await axios.post("http://localhost:4000/userLogged", {
        email: localStorage.getItem("email"),
        akey: localStorage.getItem("akey"),
      })
      let data = await callData.data
      if (data.statusCode === 200) {
        if (!localSet) {
          setLocalSet(true)
        }
      } else if (localSet) {
        setLocalSet(false)
      }
    } else {
      if (localSet) {
        setLocalSet(false)
      }
    }
    setLoading(false)
  }

  UserLogCheck()

  useEffect(() => {
    setIsAuth(localSet)
  }, [localSet])

  if (isAuth) {
  } else {
  }

  const Ecommerce = () => {
    return <p>This is Ecommerce section</p>
  }

  function HomePage() {
    return (
      <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
        <Suspense fallback={<LoadingScreen />}>
          <Ecommerce />
          <ProductShow isAuth={isAuth} />
        </Suspense>
      </Layout>
    )
  }

  function Products() {
    return (
      <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
        <Suspense fallback={<LoadingScreen />}>
          <ProductShow isAuth={isAuth} />
        </Suspense>
      </Layout>
    )
  }

  function CartShow() {
    return (
      <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
        <Suspense fallback={<LoadingScreen />}>
          <Cart isAuth={isAuth} />
        </Suspense>
      </Layout>
    )
  }

  function LoginRedirect() {
    const navigate = useNavigate()
    return navigate("/")
  }

  function LoginShow() {
    return (
      <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
        <Suspense fallback={<LoadingScreen />}>
          <Login auth={setIsAuth} />
        </Suspense>
      </Layout>
    )
  }

  function ProfileShow() {
    return (
      <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
        <Suspense fallback={<LoadingScreen />}>
          <Profile auth={setIsAuth} />
        </Suspense>
      </Layout>
    )
  }

  function CartCheckout() {
    return (
      !loading && (
        <Suspense fallback={<LoadingScreen />}>
          <Checkout isAuth={isAuth} />
        </Suspense>
      )
    )
  }

  return (
    !loading && (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          {isAuth ? (
            <>
              <Route path="/cart" element={<CartShow />} />
              <Route path="/checkout" element={<CartCheckout />} />
              <Route path="/profile" element={<ProfileShow />}>
                <Route path="address" element={<Address />} />
              </Route>
              <Route path="/login" element={<LoginRedirect />} />
            </>
          ) : (
            <Route path="/login" element={<LoginShow />} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    )
  )
}

export default Ecommerce
