import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import DashboardNavbar from "../../DashboardNavbar/DashboardNavbar";

import StaffHeader from "./components/StaffHeader";
import AddStaffForm from "./components/AddStaffForm";
import StaffTable from "./components/StaffTable";

import "./Staff.css";


function Staff() {

    const navigate = useNavigate();


    const [staff, setStaff] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [adding, setAdding] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const [editing, setEditing] = useState(false);

    const [transferring, setTransferring] = useState(false);


    const token = localStorage.getItem(
        "token"
    );

    const currentUsername =
        localStorage.getItem(
            "username"
        );

    const isAdmin =
        localStorage.getItem(
            "is_superuser"
        ) === "true";


    const fetchStaff = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/staff/`,
                {
                    method: "GET",

                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );


            if (!response.ok) {

                if (
                    response.status === 401
                ) {

                    throw new Error(
                        "You are not authorised. Please log in again."
                    );

                }


                if (
                    response.status === 403
                ) {

                    throw new Error(
                        "You do not have permission to view staff."
                    );

                }


                throw new Error(
                    "Failed to load staff."
                );

            }


            const data =
                await response.json();


            setStaff(data);

        } catch (error) {

            setError(
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchStaff();

    }, []);


    const handleAddStaff = async (
        staffData
    ) => {

        if (!isAdmin) {

            return {
                success: false,
                error:
                    "Only administrators can add staff."
            };

        }


        try {

            setAdding(true);

            setError("");


            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/staff/`,
                {
                    method: "POST",

                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(
                        staffData
                    )
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                if (
                    typeof data ===
                    "object"
                ) {

                    const firstError =
                        Object.values(
                            data
                        )[0];


                    if (
                        Array.isArray(
                            firstError
                        )
                    ) {

                        throw new Error(
                            firstError[0]
                        );

                    }


                    throw new Error(
                        firstError
                    );

                }


                throw new Error(
                    "Failed to create staff account."
                );

            }


            setStaff(
                (currentStaff) => [

                    ...currentStaff,

                    data

                ]
            );


            return {
                success: true
            };


        } catch (error) {

            setError(
                error.message
            );


            return {
                success: false,
                error: error.message
            };

        } finally {

            setAdding(false);

        }

    };


    const handleDeleteStaff = async (
        staffMember
    ) => {

        if (!isAdmin) {

            setError(
                "Only administrators can remove staff."
            );

            return;

        }


        const confirmed =
            window.confirm(
                `Are you sure you want to remove "${staffMember.username}"?`
            );


        if (!confirmed) {

            return;

        }


        try {

            setDeleting(true);

            setError("");


            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/api/staff/${staffMember.id}/`,
                    {
                        method: "DELETE",

                        headers: {
                            Authorization:
                                `Token ${token}`
                        }
                    }
                );


            if (!response.ok) {

                const data =
                    await response
                        .json()
                        .catch(
                            () => ({})
                        );


                throw new Error(
                    data.error ||
                    "Failed to remove staff member."
                );

            }


            setStaff(
                (currentStaff) =>

                    currentStaff.filter(
                        (member) =>
                            member.id !==
                            staffMember.id
                    )

            );


        } catch (error) {

            setError(
                error.message
            );

        } finally {

            setDeleting(false);

        }

    };


    const handleEditStaff = async (
        staffMember,
        updatedData
    ) => {

        if (!isAdmin) {

            return {
                success: false,
                error:
                    "Only administrators can edit staff."
            };

        }


        try {

            setEditing(true);

            setError("");


            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/api/staff/${staffMember.id}/`,
                    {
                        method: "PATCH",

                        headers: {
                            Authorization:
                                `Token ${token}`,

                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            updatedData
                        )
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                if (
                    typeof data ===
                    "object"
                ) {

                    const firstError =
                        Object.values(
                            data
                        )[0];


                    if (
                        Array.isArray(
                            firstError
                        )
                    ) {

                        throw new Error(
                            firstError[0]
                        );

                    }


                    throw new Error(
                        firstError
                    );

                }


                throw new Error(
                    "Failed to update staff member."
                );

            }


            setStaff(
                (currentStaff) =>

                    currentStaff.map(
                        (member) =>

                            member.id ===
                            data.id
                                ? data
                                : member

                    )

            );


            return {
                success: true
            };


        } catch (error) {

            setError(
                error.message
            );


            return {
                success: false,
                error: error.message
            };

        } finally {

            setEditing(false);

        }

    };


    const handleTransferAdmin = async (
        staffMember
    ) => {

        if (!isAdmin) {

            setError(
                "Only administrators can transfer admin privileges."
            );

            return;

        }


        const confirmed =
            window.confirm(
                `Transfer administrator privileges to "${staffMember.username}"?\n\nYou will immediately lose administrator privileges and will be logged out.`
            );


        if (!confirmed) {

            return;

        }


        try {

            setTransferring(true);

            setError("");


            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/api/staff/${staffMember.id}/transfer-admin/`,
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Token ${token}`,

                            "Content-Type":
                                "application/json"
                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Failed to transfer administrator privileges."
                );

            }


            
             // The current user is no longer an admin, so remove their session and return them to the login page.
             

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "username"
            );

            localStorage.removeItem(
                "is_staff"
            );

            localStorage.removeItem(
                "is_superuser"
            );


            alert(
                data.message ||
                "Administrator privileges transferred successfully."
            );


            navigate(
                "/login"
            );


        } catch (error) {

            setError(
                error.message
            );

            setTransferring(false);

        }

    };


    return (

        <div className="dashboard">

            <DashboardNavbar />


            <main className="staff-main">

                <StaffHeader
                    isAdmin={isAdmin}
                />


                {error && (

                    <div className="staff-error">

                        <span>
                            !
                        </span>

                        {error}

                    </div>

                )}


                <AddStaffForm
                    onAddStaff={
                        handleAddStaff
                    }
                    adding={adding}
                    isAdmin={isAdmin}
                />


                <StaffTable
                    staff={staff}

                    search={search}

                    setSearch={setSearch}

                    loading={loading}

                    deleting={deleting}

                    editing={editing}

                    transferring={
                        transferring
                    }

                    isAdmin={isAdmin}

                    currentUsername={
                        currentUsername
                    }

                    onDelete={
                        handleDeleteStaff
                    }

                    onEdit={
                        handleEditStaff
                    }

                    onTransferAdmin={
                        handleTransferAdmin
                    }
                />

            </main>

        </div>

    );

}


export default Staff;