function ReservationsFilters({
    search,
    setSearch,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter
}) {

    return (

        <section className="reservations-filters">

            <div className="reservations-search">

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search by customer, email, phone or ID..."
                />

            </div>


            <input
                type="date"
                value={dateFilter}
                onChange={(e) =>
                    setDateFilter(e.target.value)
                }
            />


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

                <option value="Cancelled">
                    Cancelled
                </option>

            </select>

        </section>

    );

}


export default ReservationsFilters;