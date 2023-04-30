import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import loginClass from "./Login.module.css"

import { config } from "../../utils/Constants"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Login = ({ auth }) => {
    const navigate = useNavigate()

    const userName = useRef()
    const userEmail = useRef()
    const userOTP = useRef()
    const baseURL = config.url.API_URL

    const [otp, setOtp] = useState(false)
    const [loginToggler, setLoginToggler] = useState(true)
    const [userInfo, setUserInfo] = useState({})

    async function loginForm(e) {
        e.preventDefault()
        document.getElementById("login").setAttribute("disabled", "disabled")

        let data = {
            email: userEmail.current.value,
        }

        //console.log(data)

        await axios.post(baseURL + "login", data).then((response) => {
            if (response.data.otpStatus) {
                document.getElementById("login").removeAttribute("disabled")
                toast.success("🦄 OTP Sent Successfully. Check Email")
                setUserInfo(response.data)
                setOtp((oldValue) => !oldValue)
            } else {
                console.log(response.data)
                if (response.data.statusCode === 404) {
                    document.getElementById("login").removeAttribute("disabled")
                    userEmail.current.value = ""
                    toast.error("You don't have account. Please signup. ")
                }
            }
        })
    }

    async function loginSignUpForm(e) {
        e.preventDefault()
        document.getElementById("login").setAttribute("disabled", "disabled")

        let data = {
            name: userName.current.value,
            email: userEmail.current.value,
        }

        await axios.post(baseURL + "register", data).then((response) => {
            if (response.data.otpStatus) {
                document.getElementById("login").removeAttribute("disabled")
                toast.success("🦄 OTP Sent Successfully. Check Email")
                setUserInfo(response.data)
                setOtp((oldValue) => !oldValue)
            }
        })
    }

    async function otpVerifyForm(e) {
        e.preventDefault()
        document.getElementById("otp").setAttribute("disabled", "disabled")

        let data = {
            email: userInfo.email,
            otp: parseInt(userOTP.current.value),
        }

        await axios.post(baseURL + "otpVerify", data).then((response) => {
            if (response.data.otpVerify) {
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("akey", response.data.akey)
                toast.success("🦄 OTP Verified")
                setTimeout(() => {
                    document.getElementById("otp").removeAttribute("disabled")
                    navigate("/")
                    auth((oldValue) => !oldValue)
                }, 2000)
            }
        })
        userOTP.current.value = ""
    }

    const LoginForm = () => {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={loginForm}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            ref={userEmail}
                            required
                        />
                    </div>
                    <div>
                        <input type="submit" value="Next →" id="login" />
                    </div>
                </form>
                <button
                    onClick={() => setLoginToggler((oldValue) => !oldValue)}
                >
                    Don't have account?
                </button>
            </>
        )
    }

    const LoginSignUpForm = () => {
        return (
            <>
                <h2>Sign Up</h2>
                <form onSubmit={loginSignUpForm}>
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            ref={userName}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            ref={userEmail}
                            required
                        />
                    </div>
                    <div>
                        <input type="submit" value="Next →" id="login" />
                    </div>
                </form>
                <button
                    onClick={() => setLoginToggler((oldValue) => !oldValue)}
                >
                    Already have an account?
                </button>
            </>
        )
    }

    const OtpVerify = () => {
        return (
            <>
                <h2>OTP Verification</h2>
                <form onSubmit={otpVerifyForm}>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            ref={userOTP}
                            required
                        />
                    </div>
                    <div>
                        <input type="submit" value="Verify" id="otp" />
                    </div>
                </form>
            </>
        )
    }

    return (
        <div className="user-login-form">
            <div className={loginClass["login-form"]}>
                <div className={loginClass["login-form-container"]}>
                    {otp ? (
                        <OtpVerify />
                    ) : loginToggler ? (
                        <LoginForm />
                    ) : (
                        <LoginSignUpForm />
                    )}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Login
