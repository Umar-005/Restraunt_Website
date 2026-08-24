import { NavLink } from "react-router-dom";

function InfoSection(){
    return (
        <section className="info-section">
            <div className="info-card">
              <h3>Opening Hours</h3>
              <p>Mon – Thu: 12:00 – 22:00</p>
              <p>Fri – Sat: 12:00 – 23:00</p>
              <p>Sunday: 12:00 – 21:00</p>
            </div>

            <div className="info-card info-btn">
              <h3>Reserve Your Table</h3>
              <p>Book your table now and enjoy an unforgettable dining experience.</p>
              <NavLink to="/reservations" className="btn-secondary">Book a Table</NavLink>
            </div>

            <div className="info-card">
              <h3>Find Us</h3>
              <p>123 Oakfire Street</p>
              <p>Manchester, M1 2AQ</p>
              <p>0161 123 4567</p>
            </div>
          </section>
    )

}

export default InfoSection;