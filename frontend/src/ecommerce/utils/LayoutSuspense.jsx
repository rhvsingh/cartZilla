import React, { Suspense } from "react"

const Layout = React.lazy(() => import("../assets/layouts/Layout"))
const LoadingScreen = React.lazy(() => import("../assets/components/LoadingScreen"))

const LayoutSuspense = ({ children }) => {
    return (
        <Layout>
            <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </Layout>
    )
}

// const OnlySuspense = ({children}) => {
//     return ()
// }

export default LayoutSuspense
