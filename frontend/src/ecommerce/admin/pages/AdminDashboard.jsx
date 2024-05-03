import React, { Suspense } from "react"
import { Outlet, Routes, Route } from "react-router-dom"

import LoadingScreen from "../../assets/components/LoadingScreen"

import SplitLayout from "../../assets/layouts/SplitLayout"

import "./adminDashboard.css"

const SideBar = React.lazy(() => import("../components/SideBar"))
const MainContentShow = React.lazy(() => import("../components/MainContentShow"))
const Stats = React.lazy(() => import("../components/Stats"))
const Payments = React.lazy(() => import("../components/Payments"))
const Transactions = React.lazy(() => import("../components/Transactions"))
const Products = React.lazy(() => import("../components/Products"))
const Customers = React.lazy(() => import("../components/Customers"))
const Messages = React.lazy(() => import("../components/Messages"))
const AdminCat = React.lazy(() => import("../../contexts/adminContext/adminCat"))
const NotFoundPage = React.lazy(() => import("../../assets/components/NotFoundPage"))

const styleComponent = {
    paddingBlock: "0",
    gap: "0",
}

const AdminDashboard = ({ setIsAuth }) => {
    function MainLayout() {
        return (
            <SplitLayout
                div2={100}
                containerFluid={true}
                styleComponent={styleComponent}
                styleBorder="1px solid var(--white-color-d)"
                adminClasses="d-flex flex-direc-col"
            >
                <SideBar setIsAuth={setIsAuth} />
                <Suspense fallback={<LoadingScreen />}>
                    <div style={{ paddingRight: "2rem" }}>
                        <Outlet />
                    </div>
                </Suspense>
            </SplitLayout>
        )
    }
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/* Child routes */}
                    <Route index element={<MainContentShow />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route
                        path="/products"
                        element={
                            <AdminCat>
                                <Products />
                            </AdminCat>
                        }
                    />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/messages" element={<Messages />} />
                </Route>
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<LoadingScreen />}>
                            <NotFoundPage />
                        </Suspense>
                    }
                />
            </Routes>
        </>
    )
}

export default AdminDashboard
