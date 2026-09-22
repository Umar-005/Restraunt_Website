import { useState } from "react";


function AddStaffForm({
    onAddStaff,
    adding,
    isAdmin
}) {


    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [formError, setFormError] = useState("");


    const resetForm = () => {

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFormError("");

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setFormError("");


        if (!username.trim()) {

            setFormError(
                "Username is required."
            );

            return;
        }


        if (!email.trim()) {

            setFormError(
                "Email is required."
            );

            return;
        }


        if (!password) {

            setFormError(
                "Password is required."
            );

            return;
        }


        if (password.length < 8) {

            setFormError(
                "Password must be at least 8 characters."
            );

            return;
        }


        if (password !== confirmPassword) {

            setFormError(
                "Passwords do not match."
            );

            return;
        }


        const result = await onAddStaff({
            username: username.trim(),
            email: email.trim(),
            password: password
        });


        if (result.success) {

            resetForm();

        } else {

            setFormError(
                result.error ||
                "Failed to create staff account."
            );

        }
    };


    const handleCancel = () => {

        resetForm();

    };


    if (!isAdmin) {

        return null;

    }


    return (
        <section
            id="add-staff-form"
            className="add-staff-card"
        >

            <div className="add-staff-title">

                <h2>
                    Add New Staff Member
                </h2>

            </div>


            {formError && (

                <div className="form-error">

                    {formError}

                </div>

            )}


            <form onSubmit={handleSubmit}>

                <div className="staff-form-grid">

                    <div className="form-group">

                        <label htmlFor="staff-username">

                            Username

                            <span>
                                *
                            </span>

                        </label>

                        <input
                            id="staff-username"
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            disabled={adding}
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="staff-email">

                            Email

                            <span>
                                *
                            </span>

                        </label>

                        <input
                            id="staff-email"
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            disabled={adding}
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="staff-password">

                            Password

                            <span>
                                *
                            </span>

                        </label>

                        <input
                            id="staff-password"
                            type="password"
                            placeholder="Enter password (min. 8 characters)"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            disabled={adding}
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="staff-confirm-password">

                            Confirm Password

                            <span>
                                *
                            </span>

                        </label>

                        <input
                            id="staff-confirm-password"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            disabled={adding}
                        />

                    </div>

                </div>


                <div className="staff-form-actions">

                    <button
                        type="button"
                        className="cancel-staff-button"
                        onClick={handleCancel}
                        disabled={adding}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="submit-staff-button"
                        disabled={adding}
                    >

                        {adding
                            ? "Adding..."
                            : "Add Staff"
                        }

                    </button>

                </div>

            </form>

        </section>
    );
}


export default AddStaffForm;