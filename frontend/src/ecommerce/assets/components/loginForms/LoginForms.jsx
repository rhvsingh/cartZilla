import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

import { config } from "../../../utils/Constants"
import userContext from "../../../contexts/userContext/userContext"

const LoginForm = ({ userEmail, setUserInfo, setOtp, setLoginToggler }) => {
    const baseURL = config.url.API_URL

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
                toast.success("🦄 OTP Sent Successfully. Check Email", {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    limit: 1,
                    theme: "dark",
                })
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

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={loginForm}>
                <div>
                    <input type="email" placeholder="Email" ref={userEmail} required />
                </div>
                <div>
                    <input type="submit" value="Next →" id="login" />
                </div>
            </form>
            <button onClick={() => setLoginToggler((oldValue) => !oldValue)}>
                Don't have account?
            </button>
        </>
    )
}

const LoginSignUpForm = ({ userName, userEmail, setUserInfo, setOtp, setLoginToggler }) => {
    const baseURL = config.url.API_URL

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
                toast.success("🦄 OTP Sent Successfully. Check Email", {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    limit: 1,
                    theme: "dark",
                })
                setUserInfo(response.data)
                setOtp((oldValue) => !oldValue)
            }
        })
    }

    return (
        <>
            <h2>Sign Up</h2>
            <form onSubmit={loginSignUpForm}>
                <div>
                    <input type="text" placeholder="Name" ref={userName} required />
                </div>
                <div>
                    <input type="email" placeholder="Email" ref={userEmail} required />
                </div>
                <div>
                    <input type="submit" value="Next →" id="login" />
                </div>
            </form>
            <button onClick={() => setLoginToggler((oldValue) => !oldValue)}>
                Already have an account?
            </button>
        </>
    )
}

const OtpVerify = ({ userOTP, userEmail, userInfo }) => {
    const baseURL = config.url.API_URL
    const contextData = useContext(userContext)
    const navigate = useNavigate()

    async function otpVerifyForm(e) {
        e.preventDefault()
        document.getElementById("otp").setAttribute("disabled", "disabled")
        document.getElementById("otp-input").setAttribute("disabled", "disabled")

        let data = {
            email: userInfo.email,
            otp: parseInt(userOTP.current.value),
        }

        await axios.post(baseURL + "otpVerify", data).then((response) => {
            if (response.data.otpVerify) {
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("akey", response.data.akey)
                toast.success("🦄 OTP Verified", {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    limit: 1,
                    theme: "dark",
                    autoClose: 2000,
                })
                setTimeout(() => {
                    document.getElementById("otp").removeAttribute("disabled")
                    document.getElementById("otp-input").removeAttribute("disabled")
                    contextData.setIsAuth((oldValue) => !oldValue)
                    contextData.setUserRole(response.data.role)
                    navigate("/")
                }, 2000)
            } else {
                toast.error("🦄 OTP Verification failed", {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    pauseOnFocusLoss: false,
                    limit: 1,
                    theme: "dark",
                    autoClose: 2000,
                })

                document.getElementById("otp").removeAttribute("disabled")
                document.getElementById("otp-input").removeAttribute("disabled")
            }
        })
        userOTP.current.value = ""
    }

    return (
        <>
            <h2>OTP Verification</h2>
            <form onSubmit={otpVerifyForm}>
                <div>
                    <input
                        type="text"
                        id="otp-input"
                        placeholder="Enter OTP"
                        ref={userOTP}
                        required
                    />
                </div>
                <div style={{ fontSize: "0.7rem" }}>OTP sent to {userEmail.current.value}</div>
                <div>
                    <input type="submit" value="Verify" id="otp" />
                </div>
            </form>
        </>
    )
}
export { LoginForm, LoginSignUpForm, OtpVerify }
