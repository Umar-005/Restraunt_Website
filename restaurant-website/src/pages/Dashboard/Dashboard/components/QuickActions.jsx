import { useNavigate } from "react-router-dom";


function QuickActions() {

    const navigate = useNavigate();


    return (

        <section className="quick-actions">

            <div className="quick-actions-header">

                <p className="panel-eyebrow">
                    MANAGEMENT
                </p>

                <h3>
                    Quick Actions
                </h3>

            </div>


            <div className="quick-action-grid">

                <button
                    className="quick-action"
                    onClick={() =>
                        navigate("/dashboard/orders")
                    }
                >

                    <span className="quick-action-icon">
                        +
                    </span>


                    <div>

                        <strong>
                            Manage Orders
                        </strong>

                        <small>
                            View and update customer orders
                        </small>

                    </div>

                </button>


                <button
                    className="quick-action"
                    onClick={() =>
                        navigate(
                            "/dashboard/reservations"
                        )
                    }
                >

                    <span className="quick-action-icon">
                        ◷
                    </span>


                    <div>

                        <strong>
                            Reservations
                        </strong>

                        <small>
                            Manage today's bookings
                        </small>

                    </div>

                </button>


                <button
                    className="quick-action"
                    onClick={() =>
                        navigate("/dashboard/menu")
                    }
                >

                    <span className="quick-action-icon">
                        ≡
                    </span>


                    <div>

                        <strong>
                            Manage Menu
                        </strong>

                        <small>
                            Add and edit menu items
                        </small>

                    </div>

                </button>


                <button
                    className="quick-action"
                    onClick={() =>
                        navigate("/dashboard/tables")
                    }
                >

                    <span className="quick-action-icon">
                        □
                    </span>


                    <div>

                        <strong>
                            Manage Tables
                        </strong>

                        <small>
                            View restaurant tables
                        </small>

                    </div>

                </button>

            </div>

        </section>

    );

}


export default QuickActions;