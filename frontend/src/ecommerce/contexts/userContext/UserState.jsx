import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import { config } from "../../utils/Constants"

import UserContext from "./userContext"

const UserState = (props) => {
    const [isAuth, setIsAuth] = useState(false)
    const [userRole, setUserRole] = useState([])

    function userLogChecker() {
        const baseURL = config.url.API_URL
        axios
            .post(baseURL + "userLogged", {
                email: localStorage.getItem("email"),
                akey: localStorage.getItem("akey"),
            })
            .then((response) => {
                let data = response.data
                if (data.statusCode === 200) {
                    setUserRole((oldValue) => {
                        if (oldValue !== data.role) return data.role
                    })
                    setIsAuth((oldValue) => {
                        if (oldValue === false) {
                            return true
                        } else {
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

    function checkConnection() {
        setTimeout(function () {
            userLogChecker()
        }, 6000)
    }

    return (
        <UserContext.Provider value={{ isAuth, setIsAuth, userLogChecker, userRole, setUserRole }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
