import React, { useState, useEffect, Suspense } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'

import Layout from './assets/layouts/Layout'

/* import ProductShow from './assets/pages/ProductShow'
import Cart from './assets/pages/Cart'
import Login from './assets/components/Login'
import Profile from './assets/pages/Profile' */
/* import Address from './assets/components/profile/Address' */

import NotFoundPage from './assets/components/NotFoundPage'
import LoadingScreen from './assets/components/LoadingScreen'

const ProductShow = React.lazy(() => import('./assets/pages/ProductShow'))
const Cart = React.lazy(() => import('./assets/pages/Cart'))
/* const NotFoundPage = React.lazy(() => import('./assets/components/NotFoundPage')) */
const Login = React.lazy(() => import('./assets/components/Login'))
const Profile = React.lazy(() => import('./assets/pages/Profile'))
const Address = React.lazy(() => import('./assets/components/profile/Address'))

const Ecommerce = () => {
    const navigate = useNavigate()

    const [localSet, setLocalSet] = useState(false)

    async function UserLogCheck() {
        if (localStorage.getItem('email') && localStorage.getItem('akey')) {
            let callData = await axios.post('http://localhost:4000/userLogged', {
                email: localStorage.getItem('email'),
                akey: localStorage.getItem('akey')
            })
            let data = await callData.data
            if (data.statusCode === 200) {
                if (!localSet)
                    setLocalSet(true)
            }
            else
                if (localSet) {
                    setLocalSet(false)
                }
        } else {
            if (localSet) {
                setLocalSet(false)
            }
        }
    }

    UserLogCheck()

    const [isAuth, setIsAuth] = useState(localSet)

    useEffect(() => {
        setIsAuth(localSet)
    }, [localSet])

    if (isAuth) {

    } else {

    }

    const Ecommerce = () => {
        return (<p>This is Ecommerce section</p>)
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
                <Suspense fallback={<LoadingScreen />}><ProductShow isAuth={isAuth} /></Suspense>
            </Layout>
        )
    }

    function CartShow() {
        return (
            <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
                <Suspense fallback={<LoadingScreen />}><Cart isAuth={isAuth} /></Suspense>
            </Layout>
        )
    }

    function LoginRedirect() {
        useEffect(() => {
            navigate('/')
        }, [])
    }

    function LoginShow() {
        return (
            <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
                <Suspense fallback={<LoadingScreen />}><Login auth={setIsAuth} /></Suspense>
            </Layout>
        )
    }

    function ProfileShow() {
        return (
            <Layout isAuth={isAuth} setIsAuth={setIsAuth} >
                <Suspense fallback={<LoadingScreen />}><Profile auth={setIsAuth} /></Suspense>
            </Layout>
        )
    }

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<CartShow />} />
            {
                isAuth ?
                    <>
                        <Route path="profile" element={<ProfileShow />}>
                            <Route path="address" element={<Address />} />
                        </Route>
                        <Route path='login' element={<LoginRedirect />} />
                    </>
                    :
                    <Route path='login' element={<LoginShow />} />
            }
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Ecommerce