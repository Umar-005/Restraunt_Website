function OrderDetails({
    order,
    updating,
    onStatusChange,
    onClose,
    formatDate
}) {

    return (

        <aside className="order-details">

            <div className="order-details-header">

                <div>

                    <p className="orders-eyebrow">
                        ORDER
                    </p>

                    <h3>
                        #{order.id}
                    </h3>

                </div>


                <button
                    className="close-order"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            {/* CUSTOMER */}

            <div className="order-detail-section">

                <h4>
                    Customer
                </h4>

                <p>
                    {order.name}
                </p>

                <p>
                    {order.phone}
                </p>

            </div>


            {/* ORDER INFORMATION */}

            <div className="order-detail-section">

                <h4>
                    Order Information
                </h4>


                <div className="detail-line">

                    <span>
                        Type
                    </span>

                    <strong>
                        {order.delivery_method}
                    </strong>

                </div>


                <div className="detail-line">

                    <span>
                        Payment
                    </span>

                    <strong>
                        {order.payment_method}
                    </strong>

                </div>


                <div className="detail-line status-control">

                    <span>
                        Status
                    </span>


                    <select
                        value={order.status}
                        disabled={updating}
                        onChange={(e) =>
                            onStatusChange(
                                e.target.value
                            )
                        }
                        className={
                            `status-select ${
                                order.status.toLowerCase()
                            }`
                        }
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Confirmed">
                            Confirmed
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>

                </div>


                {updating && (

                    <p className="status-updating">
                        Updating status...
                    </p>

                )}


                {order.delivery_method ===
                    "Delivery" && (

                    <div className="detail-address">

                        <span>
                            Address
                        </span>

                        <p>
                            {order.address}
                        </p>

                    </div>

                )}

            </div>


            {/* ITEMS */}

            <div className="order-detail-section">

                <h4>
                    Items
                </h4>


                <div className="order-item-list">

                    {order.items.map(
                        (item, index) => (

                        <div
                            className="order-item-row"
                            key={index}
                        >

                            <div>

                                <strong>
                                    Menu Item #{item.menu_item}
                                </strong>

                                <span>

                                    £
                                    {Number(
                                        item.price
                                    ).toFixed(2)}

                                    {" × "}

                                    {item.quantity}

                                </span>

                            </div>


                            <strong>

                                £
                                {(
                                    Number(
                                        item.price
                                    ) *
                                    item.quantity
                                ).toFixed(2)}

                            </strong>

                        </div>

                    ))}

                </div>

            </div>


            {/* TOTAL */}

            <div className="order-total">

                <span>
                    Total
                </span>

                <strong>

                    £
                    {Number(
                        order.total
                    ).toFixed(2)}

                </strong>

            </div>


            <div className="order-created">

                Created{" "}

                {formatDate(
                    order.created_at
                )}

            </div>

        </aside>

    );

}


export default OrderDetails;