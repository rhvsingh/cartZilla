import { Outlet, Routes, Route } from "react-router-dom"
import React, { Suspense } from "react"

import LoadingScreen from "../../assets/components/LoadingScreen"

import SplitLayout from "../../assets/layouts/SplitLayout"

import SideBar from "../components/SideBar"
import MainContentShow from "../components/MainContentShow"
import Stats from "../components/Stats"
import Payments from "../components/Payments"
import Products from "../components/Products"

import "./adminDashboard.css"

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
                    <Route path="/products" element={<Products />} />
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
