import React, { useEffect, Suspense, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"

import "react-toastify/dist/ReactToastify.css"

import userContext from "./contexts/userContext/userContext"
import OrderDetailPage from "./assets/pages/OrderDetailPage"

const AdminState = React.lazy(() => import("./contexts/adminContext/adminState"))
const AdminPanel = React.lazy(() => import("./admin/AdminPanel"))

const LayoutSuspense = React.lazy(() => import("./utils/LayoutSuspense"))
const SplitLayout = React.lazy(() => import("./assets/layouts/SplitLayout"))

const LoadingScreen = React.lazy(() => import("./assets/components/LoadingScreen"))
const ListCategory = React.lazy(() => import("./assets/components/ListCategory"))
const NewHome = React.lazy(() => import("./assets/pages/NewHome"))

const ProductShow = React.lazy(() => import("./assets/pages/ProductShow"))

const CategoryPage = React.lazy(() => import("./assets/pages/CategoryPage"))
const ProductPage = React.lazy(() => import("./assets/pages/ProductPage"))
const NotFoundPage = React.lazy(() => import("./assets/components/NotFoundPage"))

const Login = React.lazy(() => import("./assets/components/Login"))

const Cart = React.lazy(() => import("./assets/pages/Cart"))
const Checkout = React.lazy(() => import("./assets/pages/Checkout"))

const Profile = React.lazy(() => import("./assets/pages/Profile"))
const Order = React.lazy(() => import("./assets/components/profile/Order"))
const Address = React.lazy(() => import("./assets/components/profile/Address"))

// const LayoutSuspense = React.lazy(() => import("./utils/LayoutSuspense"))
// const LoadingScreen = React.lazy(() => import("./assets/components/LoadingScreen"))

// const AdminPanelRoute = React.lazy(() => import("./routes/AdminPanelRoute"))
// const HomePage = React.lazy(() => import("./routes/HomePage"))
// const LandingPage = React.lazy(() => import("./routes/LandingPage"))
// const ProductShowPage = React.lazy(() => import("./routes/ProductShowPage"))
// const CategoryShowPage = React.lazy(() => import("./routes/CategoryShowPage"))
// const CartShow = React.lazy(() => import("./routes/CartShow"))
// const CartCheckout = React.lazy(() => import("./routes/CartCheckout"))
// const ProfileShow = React.lazy(() => import("./routes/ProfileShow"))
// const LoginShow = React.lazy(() => import("./routes/LoginShow"))
// const LoginRedirect = React.lazy(() => import("./routes/LoginRedirect"))
// const NotFoundPage = React.lazy(() => import("./assets/components/NotFoundPage"))

// const Address = React.lazy(() => import("./assets/components/profile/Address"))
// const Order = React.lazy(() => import("./assets/components/profile/Order"))
// const OrderDetailPage = React.lazy(() => import("./assets/pages/OrderDetailPage"))

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
            <LayoutSuspense>
                <SplitLayout div1={15} div2={85} containerFluid={true}>
                    <ListCategory />
                    <ProductShow isAuth={isAuth} />
                </SplitLayout>
            </LayoutSuspense>
        )
    }

    function LandingPage() {
        return (
            <LayoutSuspense>
                <NewHome isAuth={isAuth} />
            </LayoutSuspense>
        )
    }

    function CategoryShowPage() {
        return (
            <LayoutSuspense>
                <CategoryPage isAuth={isAuth} />
            </LayoutSuspense>
        )
    }

    function ProductShowPage() {
        return (
            <LayoutSuspense>
                <ProductPage isAuth={isAuth} />
            </LayoutSuspense>
        )
    }

    function CartShow() {
        return (
            <LayoutSuspense>
                <Cart isAuth={isAuth} />
            </LayoutSuspense>
        )
    }

    function LoginCheck({ isAuth }) {
        if (!isAuth) {
            return <LoginShow />
        } else {
            return <LoginRedirect />
        }
    }

    function LoginRedirect() {
        const navigate = useNavigate()
        useEffect(() => {
            return navigate("/")
        }, [navigate])
    }

    function LoginShow() {
        return (
            <LayoutSuspense>
                <Login />
            </LayoutSuspense>
        )
    }

    function ProfileShow({ isAuth, setIsAuth }) {
        return (
            <LayoutSuspense>
                <Profile isAuth={isAuth} setIsAuth={setIsAuth} />
            </LayoutSuspense>
        )
    }

    function CartCheckout({ isAuth }) {
        return (
            <Suspense fallback={<LoadingScreen />}>
                <Checkout isAuth={isAuth} />
            </Suspense>
        )
    }

    return (
        <Router>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/:catName" element={<CategoryShowPage />} />
                    <Route path="/:catName/:proName" element={<ProductShowPage />} />
                    <Route path="/admin-panel/*" element={<AdminPanelRoute />} />
                    <Route
                        path="/profile"
                        element={<ProfileShow isAuth={isAuth} setIsAuth={setIsAuth} />}
                    >
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
                    <Route path="/login" element={<LoginCheck isAuth={isAuth} />} />
                    {isAuth && (
                        <>
                            <Route path="/cart" element={<CartShow />} />
                            <Route path="/checkout" element={<CartCheckout isAuth={isAuth} />} />
                            <Route
                                path="/profile/orders/:orderId"
                                element={
                                    <LayoutSuspense>
                                        <OrderDetailPage isAuth={isAuth} />
                                    </LayoutSuspense>
                                }
                            />
                        </>
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
            </Suspense>
        </Router>
    )
}

export default Ecommerce
