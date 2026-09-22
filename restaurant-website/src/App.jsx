import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Home from "./pages/Home/Home.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import Order from "./pages/Order/Order.jsx";
import Reservations from "./pages/Reservations/Reservations.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Login from "./pages/Login/Login.jsx";

import Dashboard from "./pages/Dashboard/Dashboard/Dashboard.jsx";
import DashboardOrders from "./pages/Dashboard/Order/Orders.jsx";
import DashboardReservations from "./pages/Dashboard/Reservations/Reservations.jsx";
import DashboardMenu from "./pages/Dashboard/Menu/Menu.jsx";
import DashboardTables from "./pages/Dashboard/Tables/Tables.jsx";
import Staff from "./pages/Dashboard/Staff/Staff.jsx";


function ProtectedRoute({ children }) {

    const token =
        localStorage.getItem("token");

    const isStaff =
        localStorage.getItem("is_staff") === "true";


    if (!token || !isStaff) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return children;

}


function AppContent() {

    const location = useLocation();

    const isDashboard =
        location.pathname.startsWith("/dashboard");


    const [order, setOrder] = useState(() => {

        const savedOrder =
            localStorage.getItem("order");

        return savedOrder
            ? JSON.parse(savedOrder)
            : [];

    });


    useEffect(() => {

        localStorage.setItem(
            "order",
            JSON.stringify(order)
        );

    }, [order]);


    const addToOrder = (item) => {

        setOrder(prevOrder => {

            const existingItem =
                prevOrder.find(
                    orderItem =>
                        orderItem.id === item.id
                );


            if (existingItem) {

                return prevOrder.map(orderItem =>

                    orderItem.id === item.id
                        ? {
                            ...orderItem,
                            quantity:
                                orderItem.quantity + 1
                        }
                        : orderItem

                );

            }


            return [
                ...prevOrder,
                {
                    ...item,
                    quantity: 1
                }
            ];

        });

    };


    const increaseQuantity = (id) => {

        setOrder(prevOrder =>

            prevOrder.map(item =>

                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1
                    }
                    : item

            )

        );

    };


    const decreaseQuantity = (id) => {

        setOrder(prevOrder =>

            prevOrder

                .map(item =>

                    item.id === id
                        ? {
                            ...item,
                            quantity:
                                item.quantity - 1
                        }
                        : item

                )

                .filter(
                    item => item.quantity > 0
                )

        );

    };


    const removeFromOrder = (id) => {

        setOrder(prevOrder =>

            prevOrder.filter(
                item => item.id !== id
            )

        );

    };


    return (
        <>

            {!isDashboard && <Navbar />}


            <Routes>

                {/* WEBSITE */}

                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/menu"
                    element={
                        <Menu
                            order={order}
                            addToOrder={addToOrder}
                        />
                    }
                />


                <Route
                    path="/order"
                    element={
                        <Order
                            order={order}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            removeFromOrder={removeFromOrder}
                        />
                    }
                />


                <Route
                    path="/reservations"
                    element={<Reservations />}
                />


                <Route
                    path="/contact"
                    element={<Contact />}
                />


                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* STAFF DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/dashboard/orders"
                    element={
                        <ProtectedRoute>
                            <DashboardOrders />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/dashboard/reservations"
                    element={
                        <ProtectedRoute>
                            <DashboardReservations />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/dashboard/menu"
                    element={
                        <ProtectedRoute>
                            <DashboardMenu />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/dashboard/tables"
                    element={
                        <ProtectedRoute>
                            <DashboardTables />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/dashboard/staff"
                    element={
                        <ProtectedRoute>
                            <Staff />
                        </ProtectedRoute>
                    }
                />

            </Routes>


            {!isDashboard && <Footer />}

        </>
    );

}


export default AppContent;