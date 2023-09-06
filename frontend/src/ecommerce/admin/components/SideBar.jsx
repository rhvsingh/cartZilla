import { NavLink } from "react-router-dom"

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

import sideBarStyles from "./css-modules/sideBar.module.css"

const styleTitle = {
    fontSize: "1.5rem",
    color: "var(--black-color-2)",
    fontWeight: "bold",
    padding: "1.5rem",
    borderBottom: "1px solid var(--white-color-d)",
}

const navInfo = [
    {
        path: "./",
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
        path: "trans",
        title: "Transactions",
        icon: <MdRepeat className={sideBarStyles.icons} />,
    },
    {
        path: "products",
        title: "Products",
        icon: <MdOutlineShoppingBag className={sideBarStyles.icons} />,
    },
    {
        path: "customer",
        title: "Customer",
        icon: <MdOutlinePeopleAlt className={sideBarStyles.icons} />,
    },
    {
        path: "messages",
        title: "Messages",
        icon: <MdOutlineMessage className={sideBarStyles.icons} />,
    },
]

const SideBar = () => {
    return (
        <>
            <div style={styleTitle}>CartZilla</div>
            <div className="d-flex flex-direc-col justify-between" style={{ flexBasis: "100%" }}>
                <div className={"px-2 py-2 " + sideBarStyles.nav} role="navigation">
                    {navInfo.map((navData, index) => (
                        <NavLink
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
                    <NavLink to="/admin-panel/logout">
                        <MdOutlineLogout className={sideBarStyles.icons} />
                        Logout
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default SideBar
