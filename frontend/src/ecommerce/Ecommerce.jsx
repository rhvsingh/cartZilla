import React, { useState, useEffect, Suspense, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

import Layout from "./assets/layouts/Layout"

import userContext from "./contexts/userContext/userContext"
import AdminState from "./contexts/adminContext/adminState"

import "react-toastify/dist/ReactToastify.css"

/* import ProductShow from './assets/pages/ProductShow'
import Cart from './assets/pages/Cart'
import Login from './assets/components/Login'
import NotFoundPage from "./assets/components/NotFoundPage"
import Profile from './assets/pages/Profile' */
/* import Address from './assets/components/profile/Address' */

import LoadingScreen from "./assets/components/LoadingScreen"
import SplitLayout from "./assets/layouts/SplitLayout"
import ListCategory from "./assets/components/ListCategory"

const AdminPanel = React.lazy(() => import("./admin/AdminPanel"))
const ProductShow = React.lazy(() => import("./assets/pages/ProductShow"))
const NewHome = React.lazy(() => import("./assets/pages/NewHome"))
const CategoryPage = React.lazy(() => import("./assets/pages/CategoryPage"))
const ProductPage = React.lazy(() => import("./assets/pages/ProductPage"))
const Cart = React.lazy(() => import("./assets/pages/Cart"))
const Checkout = React.lazy(() => import("./assets/pages/Checkout"))
const NotFoundPage = React.lazy(() => import("./assets/components/NotFoundPage"))
const Login = React.lazy(() => import("./assets/components/Login"))
const Profile = React.lazy(() => import("./assets/pages/Profile"))
const Address = React.lazy(() => import("./assets/components/profile/Address"))

const Ecommerce = () => {
    const contextData = useContext(userContext)

    const [isAuth, setIsAuth] = [contextData.isAuth, contextData.setIsAuth]
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("email") && localStorage.getItem("akey")) {
            contextData.userLogChecker()
        } else {
            setIsAuth(false)
        }
        // eslint-disable-next-line
    }, [])

    if (loading) setLoading(false)

    function AdminPanelRoute() {
        return (
            <Suspense fallback={<LoadingScreen />}>
                <AdminState>
                    <AdminPanel />{" "}
                </AdminState>
            </Suspense>
        )
    }

    function HomePage() {
        return (
            <Layout>
                <Suspense fallback={<LoadingScreen />}>
                    <SplitLayout div1={15} div2={85} containerFluid={true}>
                        <ListCategory />
                        <ProductShow isAuth={isAuth} />
                    </SplitLayout>
                </Suspense>
            </Layout>
        )
    }

    function LandingPage() {
        return (
            <Layout>
                <Suspense fallback={<LoadingScreen />}>
                    <NewHome isAuth={isAuth} />
                </Suspense>
            </Layout>
        )
    }

    function CategoryShowPage() {
        return (
            <Layout>
                <Suspense fallback={<LoadingScreen />}>
                    <CategoryPage isAuth={isAuth} />
                </Suspense>
            </Layout>
        )
    }

    function ProductShowPage() {
        return (
            <Layout>
                <Suspense fallback={<LoadingScreen />}>
                    <ProductPage isAuth={isAuth} />
                </Suspense>
            </Layout>
        )
    }

    function CartShow() {
        return (
            <Layout>
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
            <Layout>
                <Suspense fallback={<LoadingScreen />}>
                    <Login auth={setIsAuth} />
                </Suspense>
            </Layout>
        )
    }

    function ProfileShow() {
        return (
            <Layout>
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
                <Route path="/home" element={<LandingPage />} />
                <Route path="/:catName" element={<CategoryShowPage />} />
                <Route path="/:catName/:proName" element={<ProductShowPage />} />
                <Route path="/admin-panel/*" element={<AdminPanelRoute />} />
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
