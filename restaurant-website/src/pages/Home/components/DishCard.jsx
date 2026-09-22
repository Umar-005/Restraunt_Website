import { NavLink } from "react-router-dom";

function DishCard({ dish }) {

    const imageUrl = dish.image
        ? dish.image.startsWith("http")
            ? dish.image
            : `${import.meta.env.VITE_API_URL}${dish.image}`
        : null;


    return (
        <div className="dish-card">

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={dish.name}
                />
            )}


            <div className="dish-content">

                <div className="dish-header">

                    <h3>
                        {dish.name}
                    </h3>

                    <span>
                        £{dish.price}
                    </span>

                </div>


                <p>
                    {dish.description}
                </p>


                <NavLink
                    to="/menu"
                    className="dish-link"
                >
                    View Details →
                </NavLink>

            </div>

        </div>
    );
}

export default DishCard;