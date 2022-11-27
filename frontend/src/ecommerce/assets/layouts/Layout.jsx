import React from 'react'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Layout = (props) => {
    return (
        <>
            <Navigation logged={props.isAuth} setLogged={props.setIsAuth} />
            <div style={{ backgroundColor: '' }}>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default Layout