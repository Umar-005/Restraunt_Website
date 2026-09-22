function StaffHeader({
    isAdmin
}) {


    const scrollToAddStaff = () => {

        const form = document.getElementById(
            "add-staff-form"
        );


        if (form) {

            form.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    };


    return (
        <header className="staff-header">

            <div className="staff-header-content">

                <h1>
                    Staff Management
                </h1>

                <p>
                    {isAdmin
                        ? "Add, view and manage staff accounts for the dashboard."
                        : "View staff accounts and their current status."
                    }
                </p>

            </div>


            {isAdmin && (

                <button
                    className="add-staff-header-button"
                    onClick={scrollToAddStaff}
                >

                    <span className="add-icon">
                        +
                    </span>

                    Add New Staff

                </button>

            )}

        </header>
    );
}


export default StaffHeader;