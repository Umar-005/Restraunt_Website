import { useState } from "react";


function BookTable() {

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [partySize, setPartySize] = useState("");

    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // Generate the next 30 days.
    // Starts at tomorrow so today cannot be selected.

    const dates = [];

    for (let i = 1; i <= 30; i++) {

        const date = new Date();

        date.setDate(date.getDate() + i);

        dates.push(date);
    }


    // Times accepted by the backend

    const times = [
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30"
    ];


    const handleSubmit = async (e) => {

        e.preventDefault();

        setReservation(null);
        setError("");
        setLoading(true);


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/reservations/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        date,
                        time,
                        party_size: Number(partySize),
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.error ||
                    data.date?.[0] ||
                    data.time?.[0] ||
                    data.party_size?.[0] ||
                    data.name?.[0] ||
                    data.email?.[0] ||
                    data.phone?.[0] ||
                    "Unable to make reservation."
                );

                return;
            }


            // Reservation was successful

            setReservation(data);


            // Clear form

            setName("");
            setEmail("");
            setPhone("");
            setDate("");
            setTime("");
            setPartySize("");


        } catch (error) {

            setError(
                "Unable to connect to the reservation system."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <section className="book-table">

            <h2>Book a Table</h2>


            <form
                className="reservation-form"
                onSubmit={handleSubmit}
            >

                {/* NAME + EMAIL */}

                <div className="form-row">

                    <label>
                        Full Name

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your full name"
                            required
                        />
                    </label>


                    <label>
                        Email Address

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email address"
                            required
                        />
                    </label>

                </div>


                {/* PHONE */}

                <label>
                    Phone Number

                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                        placeholder="Enter your phone number"
                        required
                    />
                </label>


                {/* DATE + TIME + GUESTS */}

                <div className="form-row form-row-three">

                    <label>
                        Date

                        <select
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select date
                            </option>


                            {dates.map(date => {

                                const value =
                                    date.toISOString().split("T")[0];


                                const display =
                                    date.toLocaleDateString(
                                        "en-GB",
                                        {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "short"
                                        }
                                    );


                                return (
                                    <option
                                        key={value}
                                        value={value}
                                    >
                                        {display}
                                    </option>
                                );

                            })}

                        </select>

                    </label>


                    <label>
                        Time

                        <select
                            value={time}
                            onChange={(e) =>
                                setTime(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select time
                            </option>


                            {times.map(time => (

                                <option
                                    key={time}
                                    value={time}
                                >
                                    {time}
                                </option>

                            ))}

                        </select>

                    </label>


                    <label>
                        Guests

                        <select
                            value={partySize}
                            onChange={(e) =>
                                setPartySize(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select guests
                            </option>


                            {[1, 2, 3, 4, 5, 6].map(size => (

                                <option
                                    key={size}
                                    value={size}
                                >
                                    {size}{" "}
                                    {size === 1
                                        ? "person"
                                        : "people"}
                                </option>

                            ))}

                        </select>

                    </label>

                </div>


                {/* RESERVATION INFORMATION */}

                <div className="reservation-policy-note">

                    <strong>
                        Reservation Information
                    </strong>

                    <p>
                        Reservations are available for up to
                        6 guests and can be made up to 30 days
                        in advance.
                    </p>

                    <p>
                        Tables are reserved for 90 minutes.
                    </p>

                </div>


                {/* SUBMIT */}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "BOOKING..."
                        : "CONFIRM RESERVATION"}
                </button>


                {/* ERROR */}

                {error && (
                    <p className="reservation-error">
                        {error}
                    </p>
                )}

            </form>


            {/* CONFIRMATION */}

            {reservation && (

                <div className="reservation-confirmation">

                    <h2>
                        Reservation Confirmed
                    </h2>


                    <p className="confirmation-thanks">
                        Thank you, {reservation.name}!
                    </p>


                    <div className="confirmation-details">

                        <div>
                            <span>Date</span>

                            <strong>
                                {reservation.date}
                            </strong>
                        </div>


                        <div>
                            <span>Time</span>

                            <strong>
                                {reservation.time}
                            </strong>
                        </div>


                        <div>
                            <span>Party</span>

                            <strong>
                                {reservation.party_size}{" "}
                                {reservation.party_size === 1
                                    ? "person"
                                    : "people"}
                            </strong>
                        </div>


                        <div>
                            <span>Table</span>

                            <strong>
                                Table {reservation.table_number}
                            </strong>
                        </div>

                    </div>


                    <p className="confirmation-message">
                        We look forward to seeing you.
                    </p>

                </div>

            )}

        </section>
    );
}


export default BookTable;