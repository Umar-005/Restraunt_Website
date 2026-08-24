import { useState } from "react";
import { NavLink } from "react-router-dom";

import hero1 from "../../../assets/food1.png";
import hero2 from "../../../assets/food2.png";
import hero3 from "../../../assets/food3.png";

function HeroSection(){
      const slides = [hero1, hero2, hero3];
      const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${slides[currentSlide]})` }}
        >
             <div className="hero-overlay"></div>

             <div className="hero-content">
               <h1>Kitchen 27</h1>
               <h2>Modern Fire-Cooked Dining</h2>
               <p>Where fire, flavour, and craftsmanship come together.</p>

               <div className="hero-buttons">
                 <NavLink to="/reservations" className="btn-primary">Book a Table</NavLink>
                 <NavLink to="/menu" className="btn-secondary">View Menu</NavLink>
               </div>
             </div>

             <div className="slider-dots">
               {slides.map((slide, index) => (
                 <button
                   key={index}
                   className={currentSlide === index ? "dot active-dot" : "dot"}
                   onClick={() => setCurrentSlide(index)}
                 ></button>
               ))}
             </div>
        </section>
    )
     
}       

export default HeroSection;