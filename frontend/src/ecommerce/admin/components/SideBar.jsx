import { useContext } from "react"
import { useNavigate, NavLink, Link } from "react-router-dom"
import {
    MdOutlineDashboard,
    MdSignalCellularAlt,
    MdCurrencyRupee,
    MdRepeat,
    MdOutlineShoppingBag,
    MdOutlinePeopleAlt,
    MdOutlineMessage,
    MdOutlineSettings,
    MdOutlineLogout,
} from "react-icons/md"

import userContext from "../../contexts/userContext/userContext"
import sideBarStyles from "./css-modules/sideBar.module.css"

const styleTitle = {
    padding: "1.5rem",
    borderBottom: "1px solid var(--white-color-d)",
}

const titleLinkStyle = {
    fontSize: "1.5rem",
    color: "var(--black-color-2)",
    fontWeight: "bold",
    textDecoration: "none",
}

const navInfo = [
    {
        path: "",
        title: "Dashboard",
        icon: <MdOutlineDashboard className={sideBarStyles.icons} />,
    },
    {
        path: "stats",
        title: "Statistics",
        icon: <MdSignalCellularAlt className={sideBarStyles.icons} />,
    },
    {
        path: "payments",
        title: "Payments",
        icon: <MdCurrencyRupee className={sideBarStyles.icons} />,
    },
    {
        path: "transactions",
        title: "Transactions",
        icon: <MdRepeat className={sideBarStyles.icons} />,
    },
    {
        path: "products",
        title: "Products",
        icon: <MdOutlineShoppingBag className={sideBarStyles.icons} />,
    },
    {
        path: "customers",
        title: "Customers",
        icon: <MdOutlinePeopleAlt className={sideBarStyles.icons} />,
    },
    {
        path: "messages",
        title: "Messages",
        icon: <MdOutlineMessage className={sideBarStyles.icons} />,
    },
]

const SideBar = ({ setIsAuth }) => {
    const navigate = useNavigate()
    const contextData = useContext(userContext)

    function logoutFunc() {
        contextData.setIsAuth(false)

        setIsAuth((oldValue) => {
            if (oldValue === true) {
                localStorage.clear()
                navigate("/")
            }
            return !oldValue
        })
    }
    return (
        <>
            <div style={styleTitle}>
                <Link to="/" style={titleLinkStyle}>
                    CartZilla
                </Link>
            </div>
            <div className="d-flex flex-direc-col justify-between" style={{ flexBasis: "100%" }}>
                <div className={"px-2 py-2 " + sideBarStyles.nav} role="navigation">
                    {navInfo.map((navData, index) => (
                        <NavLink
                            end
                            to={navData.path}
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active-admin-sidebar" : ""
                            }
                            key={index}
                        >
                            {navData.icon}
                            {navData.title}
                        </NavLink>
                    ))}
                </div>
                <div className={"px-2 py-2 " + sideBarStyles.nav}>
                    <NavLink to="/admin-panel/settings">
                        <MdOutlineSettings className={sideBarStyles.icons} /> Settings
                    </NavLink>
                    <li onClick={logoutFunc}>
                        <MdOutlineLogout className={sideBarStyles.icons} />
                        Logout
                    </li>
                </div>
            </div>
        </>
    )
}

export default SideBar
