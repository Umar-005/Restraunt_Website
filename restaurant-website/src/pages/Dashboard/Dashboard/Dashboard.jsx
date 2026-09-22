import { useEffect, useState } from "react";
import "./Dashboard.css";

import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";

import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RecentOrders from "./components/RecentOrders";
import TodayReservations from "./components/TodayReservations";
import QuickActions from "./components/QuickActions";


function Dashboard() {

    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchDashboardData = async () => {

            const token =
                localStorage.getItem("token");


            if (!token) {

                setError("You are not logged in.");
                setLoading(false);

                return;

            }


            try {

                const headers = {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                };


                const [
                    ordersResponse,
                    reservationsResponse
                ] = await Promise.all([

                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/orders/`,
                        {
                            headers
                        }
                    ),

                    fetch(
                        `${import.meta.env.VITE_API_URL}/api/reservations/`,
                        {
                            headers
                        }
                    )

                ]);


                if (
                    ordersResponse.status === 401 ||
                    reservationsResponse.status === 401
                ) {

                    setError(
                        "Your login session has expired."
                    );

                    return;

                }


                if (
                    !ordersResponse.ok ||
                    !reservationsResponse.ok
                ) {

                    setError(
                        "Unable to load dashboard data."
                    );

                    return;

                }


                const ordersData =
                    await ordersResponse.json();

                const reservationsData =
                    await reservationsResponse.json();


                setOrders(ordersData);
                setReservations(reservationsData);


            } catch (error) {

                setError(
                    "Unable to connect to the server."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchDashboardData();

    }, []);




    const today =
        new Date().toISOString().split("T")[0];


    const todaysOrders =
        orders.filter(order =>
            order.created_at?.startsWith(today)
        );


    const todaysReservations =
        reservations.filter(reservation =>
            reservation.date === today
        );



    const pendingOrders =
        todaysOrders.filter(order =>
            order.status === "Pending"
        );


    const todaysRevenue =
        todaysOrders
            .filter(order =>
                order.status !== "Cancelled"
            )
            .reduce(
                (sum, order) =>
                    sum + Number(order.total),
                0
            );


    const recentOrders =
        [...orders]
            .sort(
                (a, b) =>
                    new Date(b.created_at) -
                    new Date(a.created_at)
            )
            .slice(0, 5);


    // Today's reservations Earliest reservation first.

    const recentReservations =
        [...todaysReservations]
            .sort(
                (a, b) =>
                    a.time.localeCompare(b.time)
            )
            .slice(0, 5);


    //  Format today's date 

    const displayDate =
        new Date().toLocaleDateString(
            "en-GB",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    return (

        <div className="dashboard">

            <DashboardNavbar />


            <main className="dashboard-main">

                <DashboardHeader
                    displayDate={displayDate}
                />


                {error && (

                    <div className="dashboard-error">
                        {error}
                    </div>

                )}


                {loading ? (

                    <div className="dashboard-loading">
                        Loading dashboard...
                    </div>

                ) : (

                    <>

                        <DashboardStats
                            todaysOrders={todaysOrders}
                            todaysReservations={todaysReservations}
                            pendingOrders={pendingOrders}
                            todaysRevenue={todaysRevenue}
                        />


                        <section className="dashboard-content">

                            <RecentOrders
                                recentOrders={recentOrders}
                            />


                            <TodayReservations
                                recentReservations={
                                    recentReservations
                                }
                            />

                        </section>


                        <QuickActions />

                    </>

                )}

            </main>

        </div>

    );

}


export default Dashboard;