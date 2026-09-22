import { NavLink } from "react-router-dom";

import "./Footer.css";

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-column">

          <h2>
            Kitchen 27
          </h2>

          <p>
            Where fire, flavour, and craftsmanship
            come together.
          </p>

        </div>


        <div className="footer-column">

          <h3>
            Explore
          </h3>

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/menu">
            Menu
          </NavLink>

          <NavLink to="/order">
            Order
          </NavLink>

          <NavLink to="/reservations">
            Reservations
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

        </div>


        <div className="footer-column">

          <h3>
            Visit Us
          </h3>

          <p>
            123 Oakfire Street
          </p>

          <p>
            Manchester, M1 2AQ
          </p>

          <p>
            0161 123 4567
          </p>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Kitchen 27.
          All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;