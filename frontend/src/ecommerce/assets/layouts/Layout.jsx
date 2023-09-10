import Navigation from "../components/Navigation"
import Footer from "../components/Footer"

const Layout = (props) => {
    return (
        <section className="ecommerce d-flex flex-direc-col justify-between">
            <div style={{ flex: "1" }}>
                <Navigation />
                <div className="container">{props.children}</div>
            </div>
            <Footer />
        </section>
    )
}

export default Layout
