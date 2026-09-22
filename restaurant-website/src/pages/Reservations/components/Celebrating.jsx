import celebratingImage from "../../../assets/celebrating.png";


function Celebrating() {
    return (
        <section className="celebrating">

            <img
                className="celebrating-image"
                src={celebratingImage}
                alt="Restaurant table prepared for a special occasion"
            />

            <div className="celebrating-content">

                <h2>
                    Celebrating
                    <br />
                    Something Special?
                </h2>

                <p>
                    Let us know about your special occasion when you
                    arrive and we'll do our best to make it memorable.
                </p>

            </div>

        </section>
    );
}


export default Celebrating;