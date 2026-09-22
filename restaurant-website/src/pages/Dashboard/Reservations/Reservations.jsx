import { useEffect, useState } from "react";
import "./Reservations.css";

import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";

import ReservationsHeader from "./components/ReservationsHeader";
import ReservationsFilters from "./components/ReservationsFilters";
import ReservationsTable from "./components/ReservationsTable";
import ReservationDetails from "./components/ReservationDetails";


function Reservations() {

    const [reservations, setReservations] = useState([]);

    const [selectedReservation, setSelectedReservation] =
        useState(null);

    const [search, setSearch] = useState("");

    const [dateFilter, setDateFilter] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);

    const [error, setError] =
        useState("");


    // Fetch reservations

    useEffect(() => {

        const fetchReservations = async () => {

            const token =
                localStorage.getItem("token");


            if (!token) {

                setError(
                    "You are not logged in."
                );

                setLoading(false);

                return;
            }


            try {

                const response = await fetch(
                   `${import.meta.env.VITE_API_URL}/api/reservations/`,
                    {
                        headers: {
                            "Authorization":
                                `Token ${token}`,

                            "Content-Type":
                                "application/json"
                        }
                    }
                );


                if (response.status === 401) {

                    setError(
                        "Your login session has expired."
                    );

                    return;
                }


                if (!response.ok) {

                    setError(
                        "Unable to load reservations."
                    );

                    return;
                }


                const data =
                    await response.json();


                setReservations(data);


            } catch (error) {

                setError(
                    "Unable to connect to the server."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchReservations();

    }, []);


        // Filter reservations

    const filteredReservations =
        reservations.filter(reservation => {

            const searchValue =
                search.toLowerCase().trim();


            const matchesSearch =
                !searchValue ||
                String(reservation.id)
                    .includes(searchValue) ||
                reservation.name
                    .toLowerCase()
                    .includes(searchValue) ||
                reservation.email
                    .toLowerCase()
                    .includes(searchValue) ||
                reservation.phone
                    .includes(searchValue);


            const matchesDate =
                !dateFilter ||
                reservation.date === dateFilter;


            const matchesStatus =
                statusFilter === "All" ||
                reservation.status === statusFilter;


            return (
                matchesSearch &&
                matchesDate &&
                matchesStatus
            );

        });


        // Filter reservations

    const handleStatusChange =
        async (newStatus) => {

            if (!selectedReservation) {
                return;
            }


            const token =
                localStorage.getItem("token");


            setUpdating(true);
            setError("");


            try {

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/reservations/${selectedReservation.id}/`,
                    {
                        method: "PATCH",

                        headers: {
                            "Authorization":
                                `Token ${token}`,

                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            status: newStatus
                        })
                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    setError(
                        data.error ||
                        "Unable to update reservation status."
                    );

                    return;
                }

                // set reservations

                setReservations(
                    previousReservations =>
                        previousReservations.map(
                            reservation =>
                                reservation.id === data.id
                                    ? data
                                    : reservation
                        )
                );


                // Update selected reservation

                setSelectedReservation(data);


            } catch (error) {

                setError(
                    "Unable to connect to the server."
                );

            } finally {

                setUpdating(false);

            }

        };


        // Format time

    const formatTime = (time) => {

        return time
            ? time.slice(0, 5)
            : "";

    };


    // Format date

    const formatDate = (date) => {

        if (!date) {
            return "";
        }


        return new Date(
            `${date}T00:00:00`
        ).toLocaleDateString(
            "en-GB",
            {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    };


    return (

        <div className="dashboard">

            <DashboardNavbar />


            <main className="reservations-main">

                <ReservationsHeader
                    reservationCount={
                        reservations.length
                    }
                />


                <ReservationsFilters
                    search={search}
                    setSearch={setSearch}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />


                {error && (

                    <div className="reservations-error">
                        {error}
                    </div>

                )}


                {loading ? (

                    <div className="reservations-message">
                        Loading reservations...
                    </div>

                ) : (

                    <section className="reservations-layout">

                        <ReservationsTable
                            reservations={
                                filteredReservations
                            }
                            selectedReservation={
                                selectedReservation
                            }
                            onSelectReservation={
                                setSelectedReservation
                            }
                            formatDate={formatDate}
                            formatTime={formatTime}
                        />


                        {selectedReservation && (

                            <ReservationDetails
                                reservation={
                                    selectedReservation
                                }
                                updating={updating}
                                onStatusChange={
                                    handleStatusChange
                                }
                                onClose={() =>
                                    setSelectedReservation(
                                        null
                                    )
                                }
                                formatDate={formatDate}
                                formatTime={formatTime}
                            />

                        )}

                    </section>

                )}

            </main>

        </div>

    );

}


export default Reservations;