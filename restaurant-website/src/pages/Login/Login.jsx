import { useState } from "react";
import "./Login.css";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/login/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                setError(
                    data.error ||
                    "Unable to log in."
                );

                return;
            }


            // Store authentication token

            localStorage.setItem(
                "token",
                data.token
            );


            // Store username

            localStorage.setItem(
                "username",
                data.username
            );


            // Store staff/admin status

            localStorage.setItem(
                "is_staff",
                data.is_staff
            );


            localStorage.setItem(
                "is_superuser",
                data.is_superuser
            );


            // Redirect to dashboard

            window.location.href = "/dashboard";


        } catch (error) {

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="login-page">

            <div className="login-card">

                <h1>Staff Login</h1>

                <p>
                    Sign in to access the restaurant management system.
                </p>


                <form onSubmit={handleSubmit}>

                    <label>
                        Username

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter username"
                            required
                        />
                    </label>


                    <label>
                        Password

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />
                    </label>


                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "LOGGING IN..."
                            : "LOGIN"}
                    </button>

                </form>

            </div>

        </div>
    );
}


export default Login;