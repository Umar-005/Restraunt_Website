import { useEffect, useState } from "react";
import "./Orders.css";

import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";

import OrdersHeader from "./components/OrdersHeader";
import OrdersFilters from "./components/OrdersFilters";
import OrdersTable from "./components/OrdersTable";
import OrderDetails from "./components/OrderDetails";


function Orders() {

    const [orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] =
        useState(null);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);

    const [error, setError] =
        useState("");


    // Fetch orders

    useEffect(() => {

        const fetchOrders = async () => {

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
                    `${import.meta.env.VITE_API_URL}/api/orders/`,
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
                        "Unable to load orders."
                    );

                    return;
                }


                const data =
                    await response.json();


                setOrders(data);


            } catch (error) {

                setError(
                    "Unable to connect to the server."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchOrders();

    }, []);


    //Filter orders

    const filteredOrders =
        orders.filter(order => {

            const searchValue =
                search.toLowerCase().trim();


            const matchesSearch =
                !searchValue ||
                String(order.id)
                    .includes(searchValue) ||
                order.name
                    .toLowerCase()
                    .includes(searchValue) ||
                order.phone
                    .includes(searchValue);


            const matchesStatus =
                statusFilter === "All" ||
                order.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


        // Update order status

    const handleStatusChange = async (newStatus) => {
    
        if (!selectedOrder) {
            return;
        }
    
    
        const token =
            localStorage.getItem("token");
    
    
        setUpdating(true);
        setError("");
    
    
        try {
        
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/orders/${selectedOrder.id}/`,
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
                    "Unable to update order status."
                );
            
                return;
            }
        
        
            // Update the order list
        
            setOrders(previousOrders =>
                previousOrders.map(order =>
                    order.id === data.id
                        ? {
                            ...order,
                            status: data.status
                        }
                        : order
                )
            );
        
        
            // Update the currently selected order
        
            setSelectedOrder(previousOrder => ({
                ...previousOrder,
                status: data.status
            }));
        
        
        } catch (error) {
        
            setError(
                "Unable to connect to the server."
            );
        
        } finally {
        
            setUpdating(false);
        
        }
    
    };


    // Format created date

    const formatDate = (date) => {

        return new Date(date).toLocaleString(
            "en-GB",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    return (

        <div className="dashboard">

            <DashboardNavbar />


            <main className="orders-main">

                <OrdersHeader
                    orderCount={orders.length}
                />


                <OrdersFilters
                    search={search}
                    setSearch={setSearch}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />


                {error && (

                    <div className="orders-error">
                        {error}
                    </div>

                )}


                {loading ? (

                    <div className="orders-message">
                        Loading orders...
                    </div>

                ) : (

                    <section className="orders-layout">

                        <OrdersTable
                            orders={filteredOrders}
                            selectedOrder={selectedOrder}
                            onSelectOrder={
                                setSelectedOrder
                            }
                        />


                        {selectedOrder && (

                            <OrderDetails
                                order={selectedOrder}
                                updating={updating}
                                onStatusChange={
                                    handleStatusChange
                                }
                                onClose={() =>
                                    setSelectedOrder(null)
                                }
                                formatDate={formatDate}
                            />

                        )}

                    </section>

                )}

            </main>

        </div>

    );

}


export default Orders;