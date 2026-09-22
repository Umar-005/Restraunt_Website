import { useNavigate } from "react-router-dom";


function RecentOrders({
    recentOrders
}) {

    const navigate = useNavigate();


    return (

        <div className="dashboard-panel orders-panel">

            <div className="panel-header">

                <div>

                    <p className="panel-eyebrow">
                        RECENT ACTIVITY
                    </p>

                    <h3>
                        Recent Orders
                    </h3>

                </div>


                <button
                    className="panel-link"
                    onClick={() =>
                        navigate("/dashboard/orders")
                    }
                >
                    View All
                </button>

            </div>


            <div className="orders-table">

                <div className="table-row table-heading">

                    <span>
                        Order
                    </span>

                    <span>
                        Customer
                    </span>

                    <span>
                        Type
                    </span>

                    <span>
                        Total
                    </span>

                    <span>
                        Status
                    </span>

                </div>


                {recentOrders.length === 0 ? (

                    <div className="dashboard-empty">
                        No orders found.
                    </div>

                ) : (

                    recentOrders.map(order => (

                        <div
                            className="table-row"
                            key={order.id}
                        >

                            <span className="order-number">
                                #{order.id}
                            </span>


                            <span>
                                {order.name}
                            </span>


                            <span>
                                {order.delivery_method}
                            </span>


                            <span>
                                £
                                {Number(
                                    order.total
                                ).toFixed(2)}
                            </span>


                            <span>

                                <span
                                    className={
                                        `status ${order.status.toLowerCase()}`
                                    }
                                >
                                    {order.status}
                                </span>

                            </span>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}


export default RecentOrders;