import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import { config } from "../../utils/Constants"

import AdminContext from "./adminContext"

const AdminState = (props) => {
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const baseURL = config.url.API_URL + "admin/"
    function userLogChecker() {
        axios
            .post(baseURL + "userLogged", {
                email: localStorage.getItem("email"),
                akey: localStorage.getItem("akey"),
            })
            .then((response) => {
                let data = response.data
                if (data.statusCode === 200) {
                    setIsAuth((oldValue) => {
                        if (oldValue === false) {
                            return true
                        } else if (oldValue === true) {
                            return oldValue
                        }
                    })
                } else {
                    if (data.statusCode === 405) {
                        toast.warn("🦄 You are not allowed", {
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            pauseOnFocusLoss: false,
                            limit: 1,
                            theme: "dark",
                        })
                    }
                    setIsAuth(false)
                }
                setLoading((oldValue) => {
                    if (oldValue === true) {
                        return false
                    }
                })
            })
            .catch(function (error) {
                if (
                    error.code === "ERR_NETWORK" ||
                    error.response.status === 0 ||
                    error.response.status === 500
                ) {
                    toast.error("Error connecting to server", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        pauseOnFocusLoss: false,
                        limit: 1,
                        theme: "dark",
                    })
                    checkConnection()
                }
                setLoading((oldValue) => {
                    if (oldValue === true) {
                        return false
                    }
                })
            })
    }
    /* if (localStorage.getItem("email") && localStorage.getItem("akey")) {
        userLogChecker()
    } else {
        setIsAuth(false)
    } */

    function checkConnection() {
        setTimeout(function () {
            userLogChecker()
        }, 6000)
    }

    return (
        <AdminContext.Provider value={{ isAuth, setIsAuth, userLogChecker, loading, setLoading }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState
