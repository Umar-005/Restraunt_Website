import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.svg";
import dropdown from "../../assets/dropdown.png";

function Navbar() {
  const links = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/order", label: "Order" },
    { path: "/reservations", label: "Reservations" },
    { path: "/contact", label: "Contact" }
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <button className="dropdown-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={dropdown} alt="open menu" />
      </button>
      
      <div>
        <img src={logo} alt="logo of kitchen 27" />
      </div>


      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "link active" : "link"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="login-link">
        <NavLink to="/login" className="login">
          {({ isActive }) => (
            <>
              <img src={profile} alt="profile icon" />
              <span className={isActive ? "link active" : "link"}>
                Login
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;