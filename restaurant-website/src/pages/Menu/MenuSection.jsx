function MenuSection({ title, items, onAddToOrder }) {
    return (
        <section className="menu-section">
            <h2>{title}</h2>

            <div className="menu-grid">
                {items.map(item => (
                    <div className="menu-card" key={item.id}>
                        <img
                            className="menu-card-image"
                            src={item.image}
                            alt={item.name}
                        />

                        <h3>{item.name}</h3>

                        <p>{item.description}</p>

                        <div className="menu-card-bottom">
                            <span>£{item.price}</span>
                        <button onClick={() => onAddToOrder(item)}>
                            Add to Order
                        </button>
                        </div>
                    </div>
                ))}
            </div>
            
        </section>
    );
}

export default MenuSection;