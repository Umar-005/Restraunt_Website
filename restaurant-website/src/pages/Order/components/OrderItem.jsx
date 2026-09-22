function OrderItem({
    item,
    increaseQuantity,
    decreaseQuantity,
    removeFromOrder
}) {
    return (
        <div className="order-item">
            <img
                src={item.image}
                alt={item.name}
                className="order-item-image"
            />

            <div className="order-item-content">

                <div className="order-item-top">
                    <h2>{item.name}</h2>
                    <p>£{item.price}</p>
                </div>

                <p className="order-item-description">
                    {item.description}
                </p>

                <div className="order-item-controls">

                    <div className="quantity-controls">
                        <button
                            onClick={() => decreaseQuantity(item.id)}
                        >
                            −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                            onClick={() => increaseQuantity(item.id)}
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="remove-button"
                        onClick={() => removeFromOrder(item.id)}
                    >
                        Remove
                    </button>

                </div>

            </div>
        </div>
    );
}

export default OrderItem;