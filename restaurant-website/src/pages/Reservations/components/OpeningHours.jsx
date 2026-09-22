function OpeningHours() {

    return (
        <section className="opening-hours">

            <h2>Opening Hours</h2>


            <div className="opening-hours-list">

                <div>
                    <span>Monday – Thursday</span>
                    <strong>12:00 – 22:00</strong>
                </div>

                <div>
                    <span>Friday – Saturday</span>
                    <strong>12:00 – 23:00</strong>
                </div>

                <div>
                    <span>Sunday</span>
                    <strong>13:00 – 22:00</strong>
                </div>

            </div>


            <div className="reservation-hours">

                <span className="hours-icon">◷</span>

                <p>
                    <strong>
                        RESERVATIONS
                    </strong>

                    <br />

                    Available daily from 17:00
                    to 21:30
                </p>

            </div>

        </section>
    );
}


export default OpeningHours;