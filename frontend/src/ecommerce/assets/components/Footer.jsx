import { FaGithubSquare, FaLinkedin, FaEnvelope } from "react-icons/fa"

const Footer = () => {
  const styles = {
    position: "relative",
    top: "4px",
    fontSize: "1.2rem",
    marginRight: "2px",
  }

  return (
    <footer className="footer-sec">
      <div className="footer-main container">
        <div className="logo row">
          <div className="footer-header">CartZilla</div>
          <div className="logo-des">
            <p>
              E-commerce platform that uses ReactJS for frontend, for backend
              uses ExpressJs, and database MongoDB.
            </p>

            <a href="/products" className="btn-know">
              Know More
            </a>
          </div>
        </div>

        <div className="office row">
          <div className="footer-header">
            <h3>Contact</h3>
          </div>
          <div className="office-des">
            <a href="https://github.com/rhvsingh">
              <FaGithubSquare style={styles} />/ rhvsingh
            </a>
            <a href="https://linkedin.com/in/rhvsingh">
              <FaLinkedin style={styles} />/ rhvsingh
            </a>
            <a href="mailto:rhvsingh004@gmail.com">
              <FaEnvelope style={styles} />
              rhvsingh004@gmail.com
            </a>
            {/* <p className="num">+91-9999999999</p> */}
          </div>
        </div>

        <div className="link row">
          <div className="footer-header">
            <h3>Links</h3>
          </div>
          <div className="link-des">
            <a href="/products" className="footer-links">
              Home
            </a>
            <a href="/products" className="footer-links">
              About
            </a>
            <a href="/products" className="footer-links">
              Services
            </a>
            <a href="/products" className="footer-links">
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <hr />
        <p>© Copyright 2022 CartZilla.</p>
      </div>
    </footer>
  )
}

export default Footer
