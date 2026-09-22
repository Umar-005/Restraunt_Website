import { useNavigate } from "react-router-dom";


function TodayReservations({
    recentReservations
}) {

    const navigate = useNavigate();


    return (

        <div className="dashboard-panel reservations-panel">

            <div className="panel-header">

                <div>

                    <p className="panel-eyebrow">
                        TODAY
                    </p>

                    <h3>
                        Reservations
                    </h3>

                </div>


                <button
                    className="panel-link"
                    onClick={() =>
                        navigate(
                            "/dashboard/reservations"
                        )
                    }
                >
                    View All
                </button>

            </div>


            <div className="reservation-list">

                {recentReservations.length === 0 ? (

                    <div className="dashboard-empty">
                        No reservations today.
                    </div>

                ) : (

                    recentReservations.map(
                        reservation => (

                            <div
                                className="reservation-row"
                                key={reservation.id}
                            >

                                <strong>
                                    {
                                        reservation.time.slice(
                                            0,
                                            5
                                        )
                                    }
                                </strong>


                                <div className="reservation-customer">

                                    <span>
                                        {reservation.name}
                                    </span>


                                    <small>

                                        {
                                            reservation.party_size
                                        }

                                        {" "}

                                        {
                                            reservation.party_size === 1
                                                ? "guest"
                                                : "guests"
                                        }

                                        {" · "}

                                        Table{" "}

                                        {
                                            reservation.table_number ||
                                            reservation.table
                                        }

                                    </small>

                                </div>


                                <span
                                    className={
                                        `status ${reservation.status.toLowerCase()}`
                                    }
                                >
                                    {reservation.status}
                                </span>

                            </div>

                        )
                    )

                )}

            </div>

        </div>

    );

}


export default TodayReservations;