function TableForm({
    editingTable,
    tableNumber,
    setTableNumber,
    seats,
    setSeats,
    saving,
    onSubmit,
    onCancel
}) {

    return (

        <section className="table-form-card">

            <div className="table-form-header">

                <div>

                    <p className="tables-eyebrow">

                        {editingTable
                            ? "EDIT TABLE"
                            : "NEW TABLE"}

                    </p>

                    <h3>

                        {editingTable
                            ? "Edit Table"
                            : "Add Table"}

                    </h3>

                </div>


                <button
                    type="button"
                    className="close-table-form"
                    onClick={onCancel}
                >
                    ×
                </button>

            </div>


            <form
                onSubmit={onSubmit}
                className="table-form"
            >

                <label>

                    Table Number

                    <input
                        type="number"
                        min="1"
                        value={tableNumber}
                        onChange={(e) =>
                            setTableNumber(
                                e.target.value
                            )
                        }
                        placeholder="e.g. 10"
                        required
                    />

                </label>


                <label>

                    Seats

                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={seats}
                        onChange={(e) =>
                            setSeats(
                                e.target.value
                            )
                        }
                        placeholder="e.g. 4"
                        required
                    />

                </label>


                <div className="table-form-actions">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="cancel-table-button"
                    >
                        CANCEL
                    </button>


                    <button
                        type="submit"
                        className="save-table-button"
                        disabled={saving}
                    >

                        {saving
                            ? "SAVING..."
                            : editingTable
                                ? "SAVE CHANGES"
                                : "ADD TABLE"}

                    </button>

                </div>

            </form>

        </section>

    );

}


export default TableForm;