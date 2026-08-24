import DishCard from "./DishCard";

import food1 from "../../../assets/food2.png";
import food2 from "../../../assets/food3.png";
import food3 from "../../../assets/food4.png";

function FeaturedDishes() {
  const dishes = [
    { name: "Signature Ribeye", price: "£28", image: food1 },
    { name: "Wood-Fired Salmon", price: "£22", image: food2 },
    { name: "Truffle Pasta", price: "£18", image: food3 }
  ];

  return (
    <section className="featured-section">
      <p className="section-label">Our Signature</p>
      <h2>Featured Dishes</h2>

      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.name}
            dish={dish}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedDishes;