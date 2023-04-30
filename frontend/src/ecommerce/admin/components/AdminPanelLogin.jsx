import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import AdminStyles from "./css-modules/admin.module.css"

import { config } from "../../utils/Constants"

const baseURL = config.url.API_URL

const AdminPanelLogin = () => {
    const navigate = useNavigate()
    const userEmail = useRef()
    const userOTP = useRef()

    const [otp, setOtp] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    async function loginForm(e) {
        e.preventDefault()
        document.getElementById("login").setAttribute("disabled", "disabled")

        let data = {
            email: userEmail.current.value,
        }

        await axios.post(baseURL + "adminLogin", data).then((response) => {
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

    async function otpVerifyForm(e) {
        e.preventDefault()
        document.getElementById("otp").setAttribute("disabled", "disabled")

        let data = {
            email: userInfo.email,
            otp: parseInt(userOTP.current.value),
        }

        await axios.post(baseURL + "adminOTPVerify", data).then((response) => {
            if (response.data.otpVerify) {
                localStorage.setItem("adminEmail", response.data.email)
                localStorage.setItem("adminAkey", response.data.akey)
                toast.success("🦄 OTP Verified")
                setTimeout(() => {
                    document.getElementById("otp").removeAttribute("disabled")
                    navigate("/admin-panel")
                    //auth((oldValue) => !oldValue)
                }, 2000)
            }
        })
        userOTP.current.value = ""
    }
    const LoginForm = () => {
        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <title>Login | Admin Panel | CartZilla</title>
                    </Helmet>
                </HelmetProvider>
                <form className={AdminStyles.form} onSubmit={loginForm}>
                    <h3>Admin Login</h3>
                    <input
                        type="email"
                        placeholder="Email"
                        ref={userEmail}
                        required
                    />
                    <button>Log In →</button>
                </form>
            </>
        )
    }

    const OtpVerify = () => {
        return (
            <>
                <HelmetProvider>
                    <Helmet>
                        <title>OTP Verify | Admin Panel | CartZilla</title>
                    </Helmet>
                </HelmetProvider>
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
        <div className="main" style={{ backgroundColor: "#080710" }}>
            <div className={AdminStyles.background}>
                <div className={AdminStyles.shape}></div>
                {otp ? <OtpVerify /> : <LoginForm />}
                <div className={AdminStyles.shape}></div>
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
                theme="dark"
            />
        </div>
    )
}

export default AdminPanelLogin
