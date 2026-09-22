import { useEffect, useState } from "react";

import DishCard from "./DishCard";

function FeaturedDishes() {

  const [dishes, setDishes] = useState([]);

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/api/menu/`)
      .then((response) => response.json())
      .then((data) => {

        setDishes(data.slice(0, 3));

      })
      .catch((error) => {

        console.error(
          "Unable to load featured dishes:",
          error
        );

      });

  }, []);

  return (
    <section className="featured-section">

      <p className="section-label">
        Our Signature
      </p>

      <h2>
        Featured Dishes
      </h2>

      <div className="dish-grid">

        {dishes.map((dish) => (

          <DishCard
            key={dish.id}
            dish={dish}
          />

        ))}

      </div>

    </section>
  );
}

export default FeaturedDishes;