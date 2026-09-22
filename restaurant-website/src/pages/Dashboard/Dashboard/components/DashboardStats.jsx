function DashboardStats({
    todaysOrders,
    todaysReservations,
    pendingOrders,
    todaysRevenue
}) {

    return (

        <section className="dashboard-stats">

            <div className="stat-card">

                <span>
                    Orders Today
                </span>

                <strong>
                    {todaysOrders.length}
                </strong>

            </div>


            <div className="stat-card">

                <span>
                    Reservations Today
                </span>

                <strong>
                    {todaysReservations.length}
                </strong>

            </div>


            <div className="stat-card">

                <span>
                    Pending Orders
                </span>

                <strong>
                    {pendingOrders.length}
                </strong>

            </div>


            <div className="stat-card">

                <span>
                    Today's Revenue
                </span>

                <strong>
                    £{todaysRevenue.toFixed(2)}
                </strong>

            </div>

        </section>

    );

}


export default DashboardStats;