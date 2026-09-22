import "./Contact.css";

function Contact() {
    return (
        <main className="contact-page">

            <section className="contact-hero">
                <p className="section-label">Get In Touch</p>

                <h1>Contact Us</h1>

                <p>
                    Whether you're planning a special evening, have a question
                    about your reservation, or simply want to say hello,
                    we'd love to hear from you.
                </p>
            </section>


            <section className="contact-content">

                <div className="contact-info">
                    <p className="section-label">Visit Us</p>

                    <h2>Come Dine With Us</h2>

                    <p>
                        Find us in the heart of Manchester, where great food,
                        good company, and open flames come together.
                    </p>

                    <div className="contact-details">

                        <div className="contact-detail">
                            <h3>Address</h3>

                            <p>
                                123 Oakfire Street
                                <br />
                                Manchester, M1 2AQ
                            </p>
                        </div>


                        <div className="contact-detail">
                            <h3>Phone</h3>

                            <p>
                                0161 123 4567
                            </p>
                        </div>


                        <div className="contact-detail">
                            <h3>Email</h3>

                            <p>
                                hello@kitchen27.co.uk
                            </p>
                        </div>


                        <div className="contact-detail">
                            <h3>Opening Hours</h3>

                            <p>
                                Mon – Thu: 12:00 – 22:00
                                <br />
                                Fri – Sat: 12:00 – 23:00
                                <br />
                                Sunday: 12:00 – 21:00
                            </p>
                        </div>

                    </div>
                </div>

            </section>


            <section className="contact-bottom">
                <p className="section-label">Kitchen 27</p>

                <h2>
                    Crafted With Fire. Served With Heart.
                </h2>

                <p>
                    We look forward to welcoming you.
                </p>
            </section>

        </main>
    );
}

export default Contact;