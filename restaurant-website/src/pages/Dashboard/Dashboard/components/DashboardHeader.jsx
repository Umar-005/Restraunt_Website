function DashboardHeader({
    displayDate
}) {

    const username =
        localStorage.getItem("username") ||
        "Staff";


    return (

        <header className="dashboard-header">

            <div>

                <p className="dashboard-eyebrow">
                    STAFF AREA
                </p>

                <h2>
                    Dashboard
                </h2>

                <p className="dashboard-date">
                    {displayDate}
                </p>

            </div>


            <div className="dashboard-user">

                <div className="dashboard-user-icon">

                    {username[0].toUpperCase()}

                </div>


                <div>

                    <strong>
                        {username}
                    </strong>

                    <span>
                        Staff
                    </span>

                </div>

            </div>

        </header>

    );

}


export default DashboardHeader;