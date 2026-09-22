function OrdersFilters({
    search,
    setSearch,
    statusFilter,
    setStatusFilter
}) {

    return (

        <section className="orders-filters">

            <div className="orders-search">

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search by order, customer or phone..."
                />

            </div>


            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(
                        e.target.value
                    )
                }
            >

                <option value="All">
                    All Statuses
                </option>

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

        </section>

    );

}


export default OrdersFilters;