import restaurant from "../../../assets/background.png";
import { NavLink } from "react-router-dom";

function StorySection() {
    return (
        <section className="story-section">
            <div className="story-text">
                <p className="section-label">Our Story</p>

                <h2>Crafted with fire. Served with heart.</h2>

                <p>
                    At Kitchen 27, we believe great food starts with real ingredients,
                    open flames, and passionate people.
                </p>

                <NavLink to="/contact
                " className="btn-secondary">
                    Learn More
                </NavLink>
            </div>

            <div className="story-image">
                <img
                    src={restaurant}
                    alt="Kitchen 27 restaurant interior"
                />
            </div>
        </section>
    );
}

export default StorySection;