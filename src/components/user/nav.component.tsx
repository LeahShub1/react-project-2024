import { Link } from "react-router-dom"
import '../../styles/nav.style.css'
import logo from "../../assets/logo.png"

const Nav = () => {
    return (

        <nav className="navbar">
            <div className="navbar-logo">
                <a href=""><img src={logo} /></a>
            </div>
            <ul className="navbar-menu">
                <li className="navbar-menu-item"><Link to="/signin">signIn</Link></li>
                <li className="navbar-menu-item"><Link to="/signup">signUp</Link></li>
                <li className="navbar-menu-item"><Link to="/services">ourServices</Link></li>
                <li className="navbar-menu-item"><Link to="/gallery">gallery</Link></li>
            </ul>
        </nav>

    )
}
export default Nav
