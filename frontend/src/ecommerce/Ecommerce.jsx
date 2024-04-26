import React, { useEffect, Suspense, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

import "react-toastify/dist/ReactToastify.css"

import userContext from "./contexts/userContext/userContext"

const AdminState = React.lazy(() => import("./contexts/adminContext/adminState"))
const AdminPanel = React.lazy(() => import("./admin/AdminPanel"))
const Layout = React.lazy(() => import("./assets/layouts/Layout"))
const LoadingScreen = React.lazy(() => import("./assets/components/LoadingScreen"))
const SplitLayout = React.lazy(() => import("./assets/layouts/SplitLayout"))
const ListCategory = React.lazy(() => import("./assets/components/ListCategory"))
const ProductShow = React.lazy(() => import("./assets/pages/ProductShow"))
const NewHome = React.lazy(() => import("./assets/pages/NewHome"))
const CategoryPage = React.lazy(() => import("./assets/pages/CategoryPage"))
const ProductPage = React.lazy(() => import("./assets/pages/ProductPage"))
const Cart = React.lazy(() => import("./assets/pages/Cart"))
const Checkout = React.lazy(() => import("./assets/pages/Checkout"))
const NotFoundPage = React.lazy(() => import("./assets/components/NotFoundPage"))
const Login = React.lazy(() => import("./assets/components/Login"))
const Profile = React.lazy(() => import("./assets/pages/Profile"))
const Order = React.lazy(() => import("./assets/components/profile/Order"))
const Address = React.lazy(() => import("./assets/components/profile/Address"))

const Ecommerce = () => {
    const { isAuth, setIsAuth } = useContext(userContext)

    function AdminPanelRoute() {
        return (
            <Suspense fallback={<LoadingScreen />}>
                <AdminState>
                    <AdminPanel />
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
        useEffect(() => {
            return navigate("/")
        }, [navigate])
    }

    function LoginShow() {
        return (
            <Layout>
                <Suspense fallback={<LoadingScreen />}>
                    <Login />
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
            <Suspense fallback={<LoadingScreen />}>
                <Checkout isAuth={isAuth} />
            </Suspense>
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
                            <Route path="orders" element={<Order />} />
                            <Route path="address" element={<Address />} />
                            <Route
                                path="*"
                                element={
                                    <Suspense fallback={<LoadingScreen />}>
                                        <NotFoundPage />
                                    </Suspense>
                                }
                            />
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
