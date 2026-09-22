import { useState } from "react";
import "./Order.css";

import Hero from "./components/Hero";
import OrderItem from "./components/OrderItem";
import OrderSummary from "./components/OrderSummary";
import DeliveryMethod from "./components/DeliveryMethod";
import PaymentMethod from "./components/PaymentMethod";
import Features from "./components/Features";
import BookReservation from "./components/BookReservation";


function Order({
    order,
    increaseQuantity,
    decreaseQuantity,
    removeFromOrder
}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [deliveryMethod, setDeliveryMethod] = useState("Delivery");
    const [paymentMethod, setPaymentMethod] = useState("Card");

    const [orderConfirmation, setOrderConfirmation] = useState(null);
    const [confirmedItems, setConfirmedItems] = useState([]);

    const [orderError, setOrderError] = useState("");
    const [loading, setLoading] = useState(false);


    const total = order.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );


    const handlePlaceOrder = async () => {

        setOrderError("");
        setOrderConfirmation(null);


        // Frontend  validation
        if (!name.trim()) {
            setOrderError("Name is required.");
            return;
        }

        if (!email.trim()) {
            setOrderError("Email is required.");
            return;
        }

        if (!email.includes("@")) {
            setOrderError("Please enter a valid email address.");
            return;
        }

        if (!phone.trim()) {
            setOrderError("Phone number is required.");
            return;
        }

        if (deliveryMethod === "Delivery" && !address.trim()) {
            setOrderError("Address is required for delivery.");
            return;
        }


        setLoading(true);


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/orders/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        phone,

                        address:
                            deliveryMethod === "Delivery"
                                ? address
                                : "",

                        delivery_method: deliveryMethod,
                        payment_method: paymentMethod,

                        items: order.map(item => ({
                            menu_item: item.id,
                            quantity: item.quantity
                        }))
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setOrderError(
                    data.name?.[0] ||
                    data.email?.[0] ||
                    data.phone?.[0] ||
                    data.address?.[0] ||
                    data.error ||
                    "Unable to place order."
                );

                return;
            }


            // Save the order information for the confirmation  
            setOrderConfirmation(data);


            // Save a copy of the items before clearing the basket
            setConfirmedItems(
                order.map(item => ({
                    ...item
                }))
            );


            // Clear the basket
            order.forEach(item => {
                removeFromOrder(item.id);
            });


            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setDeliveryMethod("Delivery");
            setPaymentMethod("Card");


        } catch (error) {

            setOrderError(
                "Unable to connect to the order system."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="order-page">

            <Hero />


            {order.length > 0 && (

                <div className="order-layout">

                    <div className="order-left">

                        <h2>Your Order</h2>


                        <div className="order-items">

                            {order.map(item => (

                                <OrderItem
                                    key={item.id}
                                    item={item}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                    removeFromOrder={removeFromOrder}
                                />

                            ))}

                        </div>


                        <Features />

                        <BookReservation />

                    </div>


                    <div className="order-right">

                        <OrderSummary
                            order={order}
                            total={total}
                        />


                        {/* Delivery Method */}

                        <DeliveryMethod
                            deliveryMethod={deliveryMethod}
                            setDeliveryMethod={setDeliveryMethod}
                        />


                        {/* Customer Details */}

                        <div className="customer-details">

                            <h2>Your Details</h2>


                            <label>
                                Name

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Your name"
                                    required
                                />
                            </label>


                            <label>
                                Email

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Your email address"
                                    required
                                />
                            </label>


                            <label>
                                Phone

                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    placeholder="Your phone number"
                                    required
                                />
                            </label>


                            {deliveryMethod === "Delivery" && (

                                <label>
                                    Address

                                    <textarea
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        placeholder="Your delivery address"
                                        required
                                    />
                                </label>

                            )}

                        </div>


                        {/* Payment Method */}

                        <PaymentMethod
                            total={total}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            onPlaceOrder={handlePlaceOrder}
                            loading={loading}
                            deliveryMethod={deliveryMethod}
                        />


                        {orderError && (
                            <p className="order-error">
                                {orderError}
                            </p>
                        )}

                    </div>

                </div>

            )}


            {/* Empty basket */}

            {order.length === 0 && !orderConfirmation && (

                <p>Your order is empty.</p>

            )}


            {/* Order Confirmation */}

            {orderConfirmation && (

                <div className="order-confirmation">

                    <h2>Order Confirmed</h2>


                    <p>
                        Thank you, {orderConfirmation.name}!
                    </p>


                    <p>
                        Order #{orderConfirmation.id}
                    </p>


                    <p>
                        {orderConfirmation.delivery_method}
                        {" • "}
                        {orderConfirmation.payment_method}
                    </p>


                    <div className="confirmation-items">

                        <h3>Your Order</h3>


                        {confirmedItems.map(item => (

                            <div
                                className="confirmation-item"
                                key={item.id}
                            >

                                <span>
                                    {item.name} × {item.quantity}
                                </span>


                                <span>
                                    £
                                    {(
                                        Number(item.price) *
                                        item.quantity
                                    ).toFixed(2)}
                                </span>

                            </div>

                        ))}

                    </div>


                    <div className="confirmation-total">

                        <span>
                            Total
                        </span>


                        <span>
                            £
                            {Number(
                                orderConfirmation.total
                            ).toFixed(2)}
                        </span>

                    </div>


                    <p>
                        Your order has been received and is being prepared.
                    </p>

                </div>

            )}

        </div>
    );
}


export default Order;