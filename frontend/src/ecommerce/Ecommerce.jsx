import React, { useState, useEffect, Suspense } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"
import axios from "axios"

import { config } from "./utils/Constants"
import Layout from "./assets/layouts/Layout"

import "react-toastify/dist/ReactToastify.css"

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
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const baseURL = config.url.API_URL

  async function UserLogCheck() {
    if (
      !isAuth &&
      localStorage.getItem("email") &&
      localStorage.getItem("akey")
    ) {
      let callData = await axios.post(baseURL + "userLogged", {
        email: localStorage.getItem("email"),
        akey: localStorage.getItem("akey"),
      })
      let data = await callData.data
      if (data.statusCode === 200) {
        if (!isAuth) {
          setIsAuth(true)
        }
      } else if (isAuth) {
        setIsAuth(false)
      }
    } else {
      if (isAuth) {
        setIsAuth(false)
      }
    }
    if (loading) setLoading(false)
  }
  useEffect(() => {
    UserLogCheck()
  }, [])

  if (isAuth) {
  } else {
  }

  function HomePage() {
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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  )
}

export default Ecommerce
