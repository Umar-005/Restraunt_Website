import "./Reservations.css";

import Hero from "./components/Hero";
import BookTable from "./components/BookTable";
import OpeningHours from "./components/OpeningHours";
import Celebrating from "./components/Celebrating";
import ReservationsPolicy from "./components/ReservationsPolicy";
import Features from "./components/Features";


function Reservations() {

    return (
        <div className="reservations-page">

            <Hero />


            <div className="reservation-content">

                {/* LEFT COLUMN */}

                <main className="reservation-main">

                    <BookTable />

                </main>


                {/* RIGHT COLUMN */}

                <aside className="reservation-sidebar">

                    <OpeningHours />

                    <Celebrating />

                </aside>

            </div>



            <ReservationsPolicy />


            <Features />

        </div>
    );
}


export default Reservations;