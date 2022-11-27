import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css'

import Layout from './assets/layouts/Layout'

import ProductShow from './assets/pages/ProductShow'
import Cart from './assets/pages/Cart'
import NotFoundPage from './assets/components/NotFoundPage'
import Login from './assets/components/Login'

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
                <Ecommerce />
            </Layout>
        )
    }

    function Products() {
        return (
            <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
                <ProductShow isAuth={isAuth} />
            </Layout>
        )
    }

    function CartShow() {
        return (
            <Layout isAuth={isAuth} setIsAuth={setIsAuth}>
                <Cart isAuth={isAuth} />
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
                <Login auth={setIsAuth} />
            </Layout>
        )
    }

    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<CartShow />} />
            {isAuth ? <Route path='login' element={<LoginRedirect />} /> : <Route path='login' element={<LoginShow />} />}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Ecommerce