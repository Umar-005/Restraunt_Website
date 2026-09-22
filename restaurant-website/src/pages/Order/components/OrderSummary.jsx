function OrderSummary({ order, total }) {
    return (
        <section className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
                {order.map(item => (
                    <div className="summary-item" key={item.id}>
                        <span>
                            {item.name} × {item.quantity}
                        </span>

                        <span>
                            £{(
                                Number(item.price) * item.quantity
                            ).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="summary-line">
                <span>Subtotal</span>
                <span>£{total.toFixed(2)}</span>
            </div>

            <div className="summary-total">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
            </div>
        </section>
    );
}

export default OrderSummary;