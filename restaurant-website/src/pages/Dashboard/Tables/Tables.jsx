import { useEffect, useState } from "react";
import "./Tables.css";

import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";

import TablesHeader from "./components/TablesHeader";
import TableForm from "./components/TableForm";
import TableGrid from "./components/TableGrid";


function Tables() {

    const [tables, setTables] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editingTable, setEditingTable] = useState(null);

    const [tableNumber, setTableNumber] = useState("");
    const [seats, setSeats] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    const token = localStorage.getItem("token");


    // Fetch tables

    useEffect(() => {

        fetchTables();

    }, []);


    const fetchTables = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tables/`,
                {
                    headers: {
                        "Authorization":
                            `Token ${token}`
                    }
                }
            );


            if (!response.ok) {

                setError(
                    "Unable to load tables."
                );

                return;
            }


            const data =
                await response.json();


            setTables(data);


        } catch {

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);

        }

    };


    
    //    Reset form
    

    const resetForm = () => {

        setTableNumber("");
        setSeats("");

        setEditingTable(null);
        setShowForm(false);

    };




    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");


        try {

            const url = editingTable
                ? `${import.meta.env.VITE_API_URL}/api/tables/${editingTable.id}/`
                : `${import.meta.env.VITE_API_URL}/api/tables/`;


            const response = await fetch(
                url,
                {
                    method: editingTable
                        ? "PATCH"
                        : "POST",

                    headers: {
                        "Authorization":
                            `Token ${token}`,

                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        table_number:
                            Number(tableNumber),

                        seats:
                            Number(seats)
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                setError(
                    data.table_number?.[0] ||
                    data.seats?.[0] ||
                    data.error ||
                    "Unable to save table."
                );

                return;
            }


            if (editingTable) {

                setTables(
                    previous =>
                        previous.map(table =>
                            table.id === data.id
                                ? data
                                : table
                        )
                );

            } else {

                setTables(
                    previous => [
                        ...previous,
                        data
                    ]
                );

            }


            resetForm();


        } catch {

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setSaving(false);

        }

    };


    /*
        Edit table
    */

    const handleEdit = (table) => {

        setEditingTable(table);

        setTableNumber(
            table.table_number
        );

        setSeats(
            table.seats
        );

        setShowForm(true);
        setError("");

    };


    /*
        Delete table
    */

    const handleDelete = async (table) => {

        const confirmed =
            window.confirm(
                `Delete Table ${table.table_number}?`
            );


        if (!confirmed) {
            return;
        }


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tables/${table.id}/`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Token ${token}`
                    }
                }
            );


            if (!response.ok) {

                setError(
                    "Unable to delete table."
                );

                return;
            }


            setTables(
                previous =>
                    previous.filter(
                        item =>
                            item.id !== table.id
                    )
            );


        } catch {

            setError(
                "Unable to connect to the server."
            );

        }

    };


    /*
        Total seating capacity
    */

    const totalSeats =
        tables.reduce(
            (total, table) =>
                total + table.seats,
            0
        );


    /*
        Open new table form
    */

    const handleAddTable = () => {

        setEditingTable(null);

        setTableNumber("");
        setSeats("");

        setShowForm(true);

        setError("");

    };


    return (

        <div className="dashboard">

            <DashboardNavbar />


            <main className="tables-main">

                <TablesHeader
                    tableCount={tables.length}
                    totalSeats={totalSeats}
                    onAddTable={handleAddTable}
                />


                {error && (

                    <div className="tables-error">
                        {error}
                    </div>

                )}


                {showForm && (

                    <TableForm
                        editingTable={editingTable}
                        tableNumber={tableNumber}
                        setTableNumber={setTableNumber}
                        seats={seats}
                        setSeats={setSeats}
                        saving={saving}
                        onSubmit={handleSubmit}
                        onCancel={resetForm}
                    />

                )}


                <TableGrid
                    tables={tables}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </main>

        </div>

    );

}


export default Tables;