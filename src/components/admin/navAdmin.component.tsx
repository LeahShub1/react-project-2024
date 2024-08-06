import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import "../../styles/nav.style.css"

const NavAdmin = () => {
    return (
        <header>

            <nav className="navbar">
                <div className="navbar-logo">
                    <a href=""><img src={logo} /></a>
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-menu-item"><Link to="/admin/businessDetail">Business details</Link></li>
                    <li className="navbar-menu-item"><Link to="/admin/businessServices">List of services</Link></li>
                    <li className="navbar-menu-item"><Link to="/admin/meetings">List of meetings</Link></li>
                    <li className="navbar-menu-item"><Link to="/admin/users">User list</Link></li>
                </ul>
            </nav>
        </header>
    )
}
export default NavAdmin
