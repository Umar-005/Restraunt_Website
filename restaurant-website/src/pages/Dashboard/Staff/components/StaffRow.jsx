import { useState } from "react";


function StaffRow({
    staffMember,
    isAdmin,
    currentUsername,
    deleting,
    editing,
    transferring,
    onDelete,
    onEdit,
    onTransferAdmin
}) {


    const [editMode, setEditMode] = useState(false);

    const [username, setUsername] = useState(
        staffMember.username
    );

    const [email, setEmail] = useState(
        staffMember.email || ""
    );

    const [password, setPassword] = useState("");

    const [isActive, setIsActive] = useState(
        staffMember.is_active
    );

    const [error, setError] = useState("");


    const isStaffAdmin =
        staffMember.role === "Admin" ||
        staffMember.is_superuser === true;


    const isCurrentUser =
        staffMember.username === currentUsername;


    const formatDate = (dateString) => {

        if (!dateString) {

            return "-";

        }


        const date = new Date(
            dateString
        );


        return date.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };


    const handleEdit = () => {

        setUsername(
            staffMember.username
        );

        setEmail(
            staffMember.email || ""
        );

        setPassword("");

        setIsActive(
            staffMember.is_active
        );

        setError("");

        setEditMode(true);

    };


    const handleCancel = () => {

        setEditMode(false);

        setError("");

        setPassword("");

    };


    const handleSave = async () => {

        setError("");


        if (!username.trim()) {

            setError(
                "Username is required."
            );

            return;
        }


        if (!email.trim()) {

            setError(
                "Email is required."
            );

            return;
        }


        if (
            password &&
            password.length < 8
        ) {

            setError(
                "Password must be at least 8 characters."
            );

            return;
        }


        const updatedData = {
            username: username.trim(),
            email: email.trim(),
            is_active: isActive
        };


        if (password) {

            updatedData.password = password;

        }


        const result = await onEdit(
            staffMember,
            updatedData
        );


        if (result.success) {

            setEditMode(false);

            setPassword("");

        } else {

            setError(
                result.error ||
                "Failed to update staff member."
            );

        }

    };


    const handleTransferAdmin = () => {

        onTransferAdmin(
            staffMember
        );

    };


    if (editMode) {

        return (
            <tr className="staff-row editing-row">

                <td>
                    {staffMember.id}
                </td>


                <td>

                    <input
                        className="staff-edit-input"
                        type="text"
                        value={username}
                        onChange={(event) =>
                            setUsername(
                                event.target.value
                            )
                        }
                    />


                    {error && (

                        <small className="row-error">

                            {error}

                        </small>

                    )}

                </td>


                <td>

                    <input
                        className="staff-edit-input"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                    />

                </td>


                <td>

                    <span className="staff-role-badge staff">

                        Staff

                    </span>

                </td>


                <td>

                    <select
                        className="staff-edit-select"
                        value={
                            isActive
                                ? "active"
                                : "inactive"
                        }
                        onChange={(event) =>
                            setIsActive(
                                event.target.value ===
                                "active"
                            )
                        }
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>

                </td>


                <td>

                    <input
                        className="staff-edit-input"
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                    />

                </td>


                <td>

                    <div className="staff-actions">

                        <button
                            className="save-staff-button"
                            onClick={handleSave}
                            disabled={editing}
                            title="Save changes"
                        >
                            ✓
                        </button>


                        <button
                            className="cancel-edit-button"
                            onClick={handleCancel}
                            disabled={editing}
                            title="Cancel"
                        >
                            ×
                        </button>

                    </div>

                </td>

            </tr>
        );
    }


    return (
        <tr className="staff-row">

            <td>
                {staffMember.id}
            </td>


            <td className="staff-username">

                {staffMember.username}

            </td>


            <td className="staff-email">

                {staffMember.email || "-"}

            </td>


            <td>

                <span
                    className={
                        `staff-role-badge ${
                            isStaffAdmin
                                ? "admin"
                                : "staff"
                        }`
                    }
                >

                    {isStaffAdmin
                        ? "Admin"
                        : "Staff"
                    }

                </span>

            </td>


            <td>

                <span
                    className={
                        staffMember.is_active
                            ? "staff-status active"
                            : "staff-status inactive"
                    }
                >

                    <span className="status-dot"></span>

                    {staffMember.is_active
                        ? "Active"
                        : "Inactive"
                    }

                </span>

            </td>


            <td className="staff-date">

                {formatDate(
                    staffMember.date_joined
                )}

            </td>


            <td>

                {isAdmin ? (

                    <div className="staff-actions">

                        <button
                            className="edit-staff-button"
                            onClick={handleEdit}
                            title="Edit staff member"
                            disabled={
                                deleting ||
                                editing ||
                                transferring
                            }
                        >
                            ✎
                        </button>


                        {!isStaffAdmin && (

                            <button
                                className="transfer-admin-button"
                                onClick={handleTransferAdmin}
                                title="Transfer admin privileges"
                                disabled={
                                    deleting ||
                                    editing ||
                                    transferring
                                }
                            >
                                ★
                            </button>

                        )}


                        {!isStaffAdmin &&
                            !isCurrentUser && (

                            <button
                                className="delete-staff-button"
                                onClick={() =>
                                    onDelete(
                                        staffMember
                                    )
                                }
                                title="Delete staff member"
                                disabled={
                                    deleting ||
                                    editing ||
                                    transferring
                                }
                            >
                                🗑
                            </button>

                        )}

                    </div>

                ) : (

                    <span className="staff-view-only">
                        View only
                    </span>

                )}

            </td>

        </tr>
    );
}


export default StaffRow;