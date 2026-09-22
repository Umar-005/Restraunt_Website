function TableGrid({
    tables,
    loading,
    onEdit,
    onDelete
}) {

    if (loading) {

        return (

            <section className="tables-grid">

                <div className="tables-message">
                    Loading tables...
                </div>

            </section>

        );

    }


    if (tables.length === 0) {

        return (

            <section className="tables-grid">

                <div className="tables-message">
                    No tables have been added yet.
                </div>

            </section>

        );

    }


    const sortedTables = [...tables].sort(
        (a, b) =>
            a.table_number -
            b.table_number
    );


    return (

        <section className="tables-grid">

            {sortedTables.map(table => (

                <article
                    className="table-card"
                    key={table.id}
                >

                    <div className="table-card-number">

                        <span>
                            TABLE
                        </span>

                        <strong>
                            {table.table_number}
                        </strong>

                    </div>


                    <div className="table-card-info">

                        <span>
                            SEATING CAPACITY
                        </span>

                        <strong>

                            {table.seats}{" "}

                            {table.seats === 1
                                ? "seat"
                                : "seats"}

                        </strong>

                    </div>


                    <div className="table-card-actions">

                        <button
                            onClick={() =>
                                onEdit(table)
                            }
                        >
                            EDIT
                        </button>


                        <button
                            className="delete-table-button"
                            onClick={() =>
                                onDelete(table)
                            }
                        >
                            DELETE
                        </button>

                    </div>

                </article>

            ))}

        </section>

    );

}


export default TableGrid;