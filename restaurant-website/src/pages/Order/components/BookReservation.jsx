import orderHero from "../../../assets/background.png";
import { useNavigate } from "react-router-dom";

function BookReservation() {
    const navigate = useNavigate();

    return (
        <section
            className="book-reservation"
            style={{ backgroundImage: `url(${orderHero})` }}
        >
            <div>
                <h2>CRAVING THE FULL EXPERIENCE?</h2>

                <p>
                    Book a table and enjoy Ember & Oak in person.
                </p>

                <button onClick={() => navigate("/reservations")}>
                    BOOK A TABLE
                </button>
            </div>
        </section>
    );
}

export default BookReservation;