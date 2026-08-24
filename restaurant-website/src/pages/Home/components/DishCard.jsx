function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} />

    <div className="dish-content">
        <div className="dish-header">
          <h3>{dish.name}</h3>
          <span>{dish.price}</span>
        </div>

        <p>
          Crafted with premium ingredients and
          cooked with care over open flame.
        </p>

        <button className="dish-link">
          View Details →
        </button>
      </div>
    </div>
  );
}

export default DishCard;