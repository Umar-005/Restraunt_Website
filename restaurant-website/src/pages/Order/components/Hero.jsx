import orderHero from "../../../assets/orderHero.png";

function Hero() {
    return (
            <section
                className="order-hero"
                style={{ backgroundImage: `url(${orderHero})` }}
            >
            <div className="order-hero-content">
                <span>ORDER ONLINE</span>

                <h1>SAVOR AT HOME</h1>

                <p>
                    Choose your favourites and we'll take care of the rest.
                </p>

                <div className="order-methods">
                    <div>
                        <span>🚚</span>

                        <div>
                            <strong>Delivery</strong>
                            <p>To your door</p>
                        </div>
                    </div>

                    <div>
                        <span>👜</span>

                        <div>
                            <strong>Pickup</strong>
                            <p>Collect from restaurant</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;