import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaTimes, FaBars, FaUserCircle, FaAngleDown } from 'react-icons/fa'

import ScrollIndicator from './ScrollIndicator'

const Navigation = ({ logged, setLogged }) => {

    const navigate = useNavigate()

    const baseURL = ''
    //console.log(baseURL, window.location.hostname)

    const [clickCheck, setClickCheck] = useState(1)

    const navToggler = () => {
        if (clickCheck === 1) {
            setClickCheck(0)
            document.getElementsByTagName('nav')[0].classList.toggle('active-nav')
        } else {
            setClickCheck(1)
            document.getElementsByTagName('nav')[0].classList.toggle('active-nav')
        }
    }

    function toggleDropdown() {
        let dropDown = document.getElementsByClassName('dropdown-menu')[0];
        if (dropDown.style.display === 'none') {
            dropDown.style = "display:block;"
        } else {
            dropDown.style = "display:none;"
        }

        let windowWidth = window.innerWidth
        let right = dropDown.getBoundingClientRect().right
        //console.log(windowWidth, right)
        if (windowWidth > right) {
            dropDown.style.right = "auto";
        } else {
            dropDown.style.right = "0";
        }
        dropDown.style.textAlign = "left";
    }

    function childSelector(e) {
        if (e.target.tagName.toLowerCase() === 'a') {
            let dropArray = document.getElementsByClassName('dropdown-menu');
            for (let i = 0; i < dropArray.length; i++) {
                dropArray[i].style.display = 'none';
            }
        }
    }

    return (
        <>
            <header>
                <div className="container d-flex justify-between align-items-center">
                    <div className='logo'>CartZilla</div>
                    <div className='menu-toggler' onClick={() => navToggler()} >{clickCheck ? <FaBars /> : <FaTimes />}</div>
                    <nav>
                        <span></span>
                        <ul>
                            <li><Link to=".." relative="route">Home</Link></li>
                            <li><Link to={baseURL + "/products"}>Products</Link></li>
                            {logged && <li><Link to={baseURL + "/cart"}>Cart</Link></li>}
                            <li style={{ position: 'relative', width: '80px', textAlign: 'right' }}>
                                <button onClick={toggleDropdown}><FaUserCircle style={{ position: 'absolute', left: '2px', top: '6px', fontSize: '40px' }} /> <FaAngleDown className='dropDown-arrow' /></button>
                                <ul className='dropdown-menu' style={{ display: 'none' }} onClick={childSelector}>
                                    {logged ? <>
                                        <li><Link to={baseURL + "/profile"}>Profile</Link></li>
                                        <li onClick={() => setLogged(oldValue => {
                                            if (oldValue === true) {
                                                localStorage.clear()
                                                navigate('/')
                                            }
                                            return !oldValue
                                        })}>Log Out</li>
                                    </> : <li><Link to={baseURL + "/login"} >Login / Sign-up</Link></li>}

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