import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginRedirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        return navigate("/")
    }, [navigate])
    return <></>
}

export default LoginRedirect
