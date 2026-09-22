function OrdersTable({
    orders,
    selectedOrder,
    onSelectOrder
}) {

    return (

        <div className="orders-table-card">

            <div className="orders-table">

                <div className="orders-table-row orders-table-heading">

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

                    <span>
                        Action
                    </span>

                </div>


                {orders.length === 0 ? (

                    <div className="orders-message">
                        No orders found.
                    </div>

                ) : (

                    orders.map(order => (

                        <div
                            className={
                                `orders-table-row ${
                                    selectedOrder?.id === order.id
                                        ? "selected"
                                        : ""
                                }`
                            }
                            key={order.id}
                        >

                            <span className="order-id">
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
                                        `status ${
                                            order.status.toLowerCase()
                                        }`
                                    }
                                >
                                    {order.status}
                                </span>

                            </span>


                            <span>

                                <button
                                    className="view-order-button"
                                    onClick={() =>
                                        onSelectOrder(order)
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


export default OrdersTable;