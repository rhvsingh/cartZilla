import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FaTimes, FaBars, FaUserCircle, FaAngleDown, FaSearch } from "react-icons/fa"
import { MdOutlineShoppingCart } from "react-icons/md"

import userContext from "../../contexts/userContext/userContext"
import CartContext from "../../contexts/cartContext/CartContext"
import ScrollIndicator from "./ScrollIndicator"

import Logo from "../image/logo-dark.png"

const Navigation = () => {
    const { totalCartCount } = useContext(CartContext)
    const contextData = useContext(userContext)

    const [logged, setLogged] = [contextData.isAuth, contextData.setIsAuth]
    const userRole = contextData.userRole
    const navigate = useNavigate()

    const baseURL = ""
    //console.log(baseURL, window.location.hostname)

    const [logoLoaded, setLogoLoaded] = useState(false)
    const [clickCheck, setClickCheck] = useState(1)
    const [search, setSearch] = useState("")

    const navToggler = () => {
        if (clickCheck === 1) {
            setClickCheck(0)
            document.getElementsByTagName("nav")[0].classList.toggle("active-nav")
        } else {
            setClickCheck(1)
            document.getElementsByTagName("nav")[0].classList.toggle("active-nav")
        }
    }

    function toggleDropdown() {
        let dropDown = document.getElementsByClassName("dropdown-menu")[0]
        if (dropDown.style.display === "none") {
            dropDown.style = "display:block;"
        } else {
            dropDown.style = "display:none;"
        }

        let windowWidth = window.innerWidth
        let right = dropDown.getBoundingClientRect().right
        //console.log(windowWidth, right)
        if (windowWidth > right) {
            dropDown.style.right = "auto"
        } else {
            dropDown.style.right = "0"
        }
        dropDown.style.textAlign = "left"
    }

    function childSelector(e) {
        if (e.target.tagName.toLowerCase() === "a") {
            let dropArray = document.getElementsByClassName("dropdown-menu")
            for (let i = 0; i < dropArray.length; i++) {
                dropArray[i].style.display = "none"
            }
        }
    }

    function clickSearch(e) {
        console.log(search)
        setSearch("")
    }

    return (
        <>
            <header>
                <div className="container d-flex gap-75 justify-between align-items-center">
                    <div className="logo">
                        <Link to=".." relative="route">
                            <img
                                src={Logo}
                                alt="CartZilla"
                                title="CartZilla"
                                style={logoLoaded ? {} : { display: "none" }}
                                onLoad={() => setLogoLoaded(true)}
                            />
                            {!logoLoaded && <span>CartZilla</span>}
                        </Link>
                    </div>

                    <div className="navigation-search">
                        <div id="search-input">
                            <input
                                type="text"
                                placeholder="Search for products, brands, and more"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch id="search-icon-button" onClick={clickSearch} />
                        </div>
                        <div id="search-results"></div>
                    </div>
                    <div className="menu-toggler" onClick={() => navToggler()}>
                        {clickCheck ? <FaBars /> : <FaTimes />}
                    </div>
                    <nav>
                        <ul className="d-flex align-items-center">
                            <li>
                                <Link to=".." relative="route">
                                    Home
                                </Link>
                            </li>
                            {/* <li>
                <Link to={baseURL + "/products"}>Products</Link>
              </li> */}
                            {logged && (
                                <li>
                                    <Link to={baseURL + "/cart"}>
                                        <div className="pos-relative">
                                            {totalCartCount > 0 && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: "50%",
                                                        top: "-4px",
                                                        display: "grid",
                                                        placeItems: "center",
                                                        minWidth: "20px",
                                                        aspectRatio: "1 / 1",
                                                        backgroundColor: "var(--main-color-dark-1)",
                                                        borderRadius: "50%",
                                                        fontSize: "0.7rem",
                                                    }}
                                                >
                                                    {totalCartCount}
                                                </div>
                                            )}
                                            <MdOutlineShoppingCart style={{ fontSize: "2rem" }} />
                                        </div>
                                    </Link>
                                </li>
                            )}
                            <li
                                style={{
                                    position: "relative",
                                    width: "80px",
                                    textAlign: "right",
                                }}
                            >
                                <button onClick={toggleDropdown}>
                                    <FaUserCircle
                                        style={{
                                            position: "absolute",
                                            left: "2px",
                                            top: "6px",
                                            fontSize: "40px",
                                        }}
                                    />{" "}
                                    <FaAngleDown className="dropDown-arrow" />
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    style={{ display: "none" }}
                                    onClick={childSelector}
                                >
                                    {logged ? (
                                        <>
                                            <li>
                                                <Link to={baseURL + "/profile"}>Profile</Link>
                                            </li>
                                            {userRole.includes("admin") && (
                                                <li>
                                                    <Link to={baseURL + "/admin-panel"}>
                                                        Admin-Panel
                                                    </Link>
                                                </li>
                                            )}

                                            <li
                                                onClick={() =>
                                                    setLogged((oldValue) => {
                                                        if (oldValue === true) {
                                                            localStorage.clear()
                                                            navigate("/")
                                                        }
                                                        return !oldValue
                                                    })
                                                }
                                            >
                                                Log Out
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <Link to={baseURL + "/login"}>Login / Sign-up</Link>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <ScrollIndicator />
        </>
    )
}

export default Navigation
