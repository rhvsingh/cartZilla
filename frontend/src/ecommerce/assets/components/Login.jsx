import { useRef, useState } from "react"
import { ToastContainer } from "react-toastify"

import { LoginForm, LoginSignUpForm, OtpVerify } from "./loginForms/LoginForms"

import "react-toastify/dist/ReactToastify.css"
import loginClass from "./Login.module.css"

const Login = () => {
    const userName = useRef()
    const userEmail = useRef()
    const userOTP = useRef()

    const [otp, setOtp] = useState(false)
    const [loginToggler, setLoginToggler] = useState(true)
    const [userInfo, setUserInfo] = useState({})

    return (
        <div className="user-login-form">
            <div className={loginClass["login-form"]}>
                <div className={loginClass["login-form-container"]}>
                    {otp ? (
                        <OtpVerify userInfo={userInfo} userOTP={userOTP} userEmail={userEmail} />
                    ) : loginToggler ? (
                        <LoginForm
                            setUserInfo={setUserInfo}
                            setOtp={setOtp}
                            userEmail={userEmail}
                            setLoginToggler={setLoginToggler}
                        />
                    ) : (
                        <LoginSignUpForm
                            userName={userName}
                            userEmail={userEmail}
                            setUserInfo={setUserInfo}
                            setOtp={setOtp}
                            setLoginToggler={setLoginToggler}
                        />
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
