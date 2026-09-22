function ReservationDetails({
    reservation,
    updating,
    onStatusChange,
    onClose,
    formatDate,
    formatTime
}) {

    return (

        <aside className="reservation-details">

            <div className="reservation-details-header">

                <div>

                    <p className="reservations-eyebrow">
                        RESERVATION
                    </p>

                    <h3>
                        #{reservation.id}
                    </h3>

                </div>


                <button
                    className="close-reservation"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            {/* CUSTOMER */}

            <div className="reservation-detail-section">

                <h4>
                    Customer
                </h4>

                <p>
                    {reservation.name}
                </p>

                <p>
                    {reservation.email}
                </p>

                <p>
                    {reservation.phone}
                </p>

            </div>


            {/* BOOKING */}

            <div className="reservation-detail-section">

                <h4>
                    Booking
                </h4>


                <div className="reservation-detail-line">

                    <span>
                        Date
                    </span>

                    <strong>
                        {formatDate(
                            reservation.date
                        )}
                    </strong>

                </div>


                <div className="reservation-detail-line">

                    <span>
                        Time
                    </span>

                    <strong>
                        {formatTime(
                            reservation.time
                        )}
                    </strong>

                </div>


                <div className="reservation-detail-line">

                    <span>
                        Party Size
                    </span>

                    <strong>
                        {reservation.party_size}
                    </strong>

                </div>


                <div className="reservation-detail-line">

                    <span>
                        Table
                    </span>

                    <strong>
                        Table{" "}
                        {
                            reservation.table_number ||
                            reservation.table
                        }
                    </strong>

                </div>

            </div>


            {/* STATUS */}

            <div className="reservation-detail-section">

                <h4>
                    Status
                </h4>


                <select
                    value={reservation.status}
                    disabled={updating}
                    onChange={(e) =>
                        onStatusChange(
                            e.target.value
                        )
                    }
                    className={
                        `reservation-status-select ${
                            reservation.status.toLowerCase()
                        }`
                    }
                >

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Confirmed">
                        Confirmed
                    </option>

                    <option value="Cancelled">
                        Cancelled
                    </option>

                </select>


                {updating && (

                    <p className="reservation-updating">
                        Updating status...
                    </p>

                )}

            </div>


            {/* CREATED */}

            <div className="reservation-created">

                Created{" "}

                {new Date(
                    reservation.created_at
                ).toLocaleString(
                    "en-GB",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                )}

            </div>

        </aside>

    );

}


export default ReservationDetails;