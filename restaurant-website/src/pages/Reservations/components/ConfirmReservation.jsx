function ConfirmReservation({ reservation }) {

    return (
        <div className="reservation-confirmation">

            <div className="confirmation-icon">
                ✓
            </div>


            <h2>
                Reservation Confirmed
            </h2>


            <p className="confirmation-thanks">
                Thank you, {reservation.name}!
            </p>


            <div className="confirmation-details">

                <div>
                    <span>Date</span>
                    <strong>
                        {reservation.date}
                    </strong>
                </div>


                <div>
                    <span>Time</span>
                    <strong>
                        {reservation.time}
                    </strong>
                </div>


                <div>
                    <span>Guests</span>
                    <strong>
                        {reservation.party_size}{" "}
                        {reservation.party_size === 1
                            ? "person"
                            : "people"}
                    </strong>
                </div>


                <div>
                    <span>Table</span>
                    <strong>
                        Table {reservation.table_number}
                    </strong>
                </div>

            </div>


            <p className="confirmation-message">
                Your table has been reserved.
                We look forward to seeing you.
            </p>

        </div>
    );
}


export default ConfirmReservation;