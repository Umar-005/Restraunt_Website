function ReservationsTable({
    reservations,
    selectedReservation,
    onSelectReservation,
    formatDate,
    formatTime
}) {

    return (

        <div className="reservations-table-card">

            <div className="reservations-table">

                <div className="reservations-table-row reservations-table-heading">

                    <span>
                        Date
                    </span>

                    <span>
                        Time
                    </span>

                    <span>
                        Customer
                    </span>

                    <span>
                        Guests
                    </span>

                    <span>
                        Table
                    </span>

                    <span>
                        Status
                    </span>

                    <span>
                        Action
                    </span>

                </div>


                {reservations.length === 0 ? (

                    <div className="reservations-message">
                        No reservations found.
                    </div>

                ) : (

                    reservations.map(
                        reservation => (

                        <div
                            className={
                                `reservations-table-row ${
                                    selectedReservation?.id ===
                                    reservation.id
                                        ? "selected"
                                        : ""
                                }`
                            }
                            key={reservation.id}
                        >

                            <span>
                                {formatDate(
                                    reservation.date
                                )}
                            </span>


                            <span className="reservation-time">
                                {formatTime(
                                    reservation.time
                                )}
                            </span>


                            <span>

                                <strong>
                                    {reservation.name}
                                </strong>

                                <small>
                                    {reservation.phone}
                                </small>

                            </span>


                            <span>
                                {reservation.party_size}
                            </span>


                            <span>
                                Table{" "}
                                {
                                    reservation.table_number ||
                                    reservation.table
                                }
                            </span>


                            <span>

                                <span
                                    className={
                                        `status ${
                                            reservation.status.toLowerCase()
                                        }`
                                    }
                                >
                                    {reservation.status}
                                </span>

                            </span>


                            <span>

                                <button
                                    className="view-reservation-button"
                                    onClick={() =>
                                        onSelectReservation(
                                            reservation
                                        )
                                    }
                                >
                                    View
                                </button>

                            </span>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}


export default ReservationsTable;