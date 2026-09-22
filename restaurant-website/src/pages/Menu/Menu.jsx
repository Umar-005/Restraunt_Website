import "./Menu.css";
import MenuSection from "./MenuSection";
import { useState, useEffect } from "react";


function Menu({ order, addToOrder }) {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/menu/`)
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    const filteredItems = category === "All"
    ? items
    : items.filter(item => item.category === category);

    const categories = ["Starters", "Mains", "Sides", "Desserts", "Drinks"];


    return (
        <>
            <section className="menu-hero">
                <h1>Our Menu</h1>
                <p>Discover our selection of carefully crafted dishes.</p>
            </section>
            <div className="menu-categories">
                <button
                    className={category === "All" ? "active" : ""}
                    onClick={() => setCategory("All")}
                >
                    All Menu
                </button>

                <button
                    className={category === "Starters" ? "active" : ""}
                    onClick={() => setCategory("Starters")}
                >
                    Starters
                </button>

                <button
                    className={category === "Mains" ? "active" : ""}
                    onClick={() => setCategory("Mains")}
                >
                    Mains
                </button>

                <button
                    className={category === "Sides" ? "active" : ""}
                    onClick={() => setCategory("Sides")}
                >
                    Sides
                </button>

                <button
                    className={category === "Desserts" ? "active" : ""}
                    onClick={() => setCategory("Desserts")}
                >
                    Desserts
                </button>

                <button
                    className={category === "Drinks" ? "active" : ""}
                    onClick={() => setCategory("Drinks")}
                >
                    Drinks
                </button>
            </div>

            {category === "All"
                ? categories.map(cat => (
                    <MenuSection
                        key={cat}
                        title={cat}
                        items={items.filter(item => item.category === cat)}
                        onAddToOrder={addToOrder}
                    />
                ))
                : <MenuSection title={category} items={filteredItems} onAddToOrder={addToOrder} />
            }

            
        </>
    );
}

export default Menu;