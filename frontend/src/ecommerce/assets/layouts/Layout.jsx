import React from 'react'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Layout = (props) => {
    return (
        <section className='ecommerce d-flex flex-direc-col justify-between'>
            <div>
                <Navigation logged={props.isAuth} setLogged={props.setIsAuth} />
                <div style={{ backgroundColor: '' }}>
                    {props.children}
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Layout