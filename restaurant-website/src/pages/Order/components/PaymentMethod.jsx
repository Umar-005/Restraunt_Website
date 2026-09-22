function PaymentMethod({
    total,
    paymentMethod,
    setPaymentMethod,
    onPlaceOrder,
    loading,
    deliveryMethod
}) {

    return (
        <section className="payment-section">

            <h2>Payment Method</h2>

            <label>
                <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) =>
                        setPaymentMethod(e.target.value)
                    }
                />

                Card Payment
            </label>


            <label>
                <input
                    type="radio"
                    name="payment"
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={(e) =>
                        setPaymentMethod(e.target.value)
                    }
                />
                {deliveryMethod=== "Delivery"? <span>Cash on Delivery</span>: <span>Cash on Pickup</span>}
            </label>


            <button
                type="button"
                className="place-order-button"
                onClick={onPlaceOrder}
                disabled={loading}
            >
                {loading
                    ? "PLACING ORDER..."
                    : `PLACE ORDER${
                        paymentMethod === "Card"
                            ? ` • £${total.toFixed(2)}`
                            : ""
                    }`
                }
            </button>


            <p className="payment-security">
                🔒 Your payment details are secure and encrypted.
            </p>

        </section>
    );
}


export default PaymentMethod;