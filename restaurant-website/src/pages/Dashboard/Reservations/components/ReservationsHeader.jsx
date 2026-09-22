function ReservationsHeader({
    reservationCount
}) {

    return (

        <header className="reservations-header">

            <div>

                <p className="reservations-eyebrow">
                    MANAGEMENT
                </p>

                <h2>
                    Reservations
                </h2>

                <p>
                    View and manage customer bookings.
                </p>

            </div>


            <div className="reservations-count">

                <strong>
                    {reservationCount}
                </strong>

                <span>
                    Total Reservations
                </span>

            </div>

        </header>

    );

}


export default ReservationsHeader;