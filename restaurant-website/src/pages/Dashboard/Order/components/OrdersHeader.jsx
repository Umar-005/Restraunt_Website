function OrdersHeader({
    orderCount
}) {

    return (

        <header className="orders-header">

            <div>

                <p className="orders-eyebrow">
                    MANAGEMENT
                </p>

                <h2>
                    Orders
                </h2>

                <p>
                    View and manage customer orders.
                </p>

            </div>


            <div className="orders-count">

                <strong>
                    {orderCount}
                </strong>

                <span>
                    Total Orders
                </span>

            </div>

        </header>

    );

}


export default OrdersHeader;