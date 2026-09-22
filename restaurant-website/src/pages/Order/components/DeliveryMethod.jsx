function DeliveryMethod({ deliveryMethod, setDeliveryMethod }) {

    return (
        <section className="delivery-section">

            <h2>Delivery Method</h2>

            <div className="delivery-toggle">

                <button
                    type="button"
                    className={
                        deliveryMethod === "Delivery"
                            ? "active"
                            : ""
                    }
                    onClick={() => setDeliveryMethod("Delivery")}
                >
                    Delivery
                </button>


                <button
                    type="button"
                    className={
                        deliveryMethod === "Pickup"
                            ? "active"
                            : ""
                    }
                    onClick={() => setDeliveryMethod("Pickup")}
                >
                    Pickup
                </button>

            </div>

        </section>
    );
}


export default DeliveryMethod;