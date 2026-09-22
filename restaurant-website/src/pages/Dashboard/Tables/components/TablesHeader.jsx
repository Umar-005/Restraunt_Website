function TablesHeader({
    tableCount,
    totalSeats,
    onAddTable
}) {

    return (

        <header className="tables-header">

            <div>

                <p className="tables-eyebrow">
                    MANAGEMENT
                </p>

                <h2>
                    Tables
                </h2>

                <p>
                    Manage restaurant tables and seating capacity.
                </p>

            </div>


            <div className="tables-header-right">

                <div className="tables-stat">

                    <strong>
                        {tableCount}
                    </strong>

                    <span>
                        Tables
                    </span>

                </div>


                <div className="tables-stat">

                    <strong>
                        {totalSeats}
                    </strong>

                    <span>
                        Total Seats
                    </span>

                </div>


                <button
                    className="add-table-button"
                    onClick={onAddTable}
                >
                    + ADD TABLE
                </button>

            </div>

        </header>

    );

}


export default TablesHeader;