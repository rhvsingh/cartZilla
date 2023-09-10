import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import { config } from "../../utils/Constants"

import UserContext from "./userContext"

const UserState = (props) => {
    const name = "Raja"

    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const baseURL = config.url.API_URL
        function userLogChecker() {
            axios
                .post(baseURL + "userLogged", {
                    email: localStorage.getItem("email"),
                    akey: localStorage.getItem("akey"),
                })
                .then((response) => {
                    let data = response.data
                    console.log(data, response)
                    if (data.statusCode === 200) {
                        setIsAuth((oldValue) => {
                            if (oldValue === false) {
                                return true
                            } else if (oldValue === true) {
                                return oldValue
                            }
                        })
                    } else {
                        setIsAuth(false)
                    }
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
                })
        }
        if (localStorage.getItem("email") && localStorage.getItem("akey")) {
            userLogChecker()
        } else {
            setIsAuth(false)
        }

        function checkConnection() {
            setTimeout(function () {
                userLogChecker()
            }, 6000)
        }
    }, [])

    if (loading) setLoading(false)

    return <UserContext.Provider value={name}>{props.children}</UserContext.Provider>
}

export default UserState
