import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./DashboardNavbar.css";


function DashboardNavbar() {

    const navigate = useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");

        navigate("/login");

    };


    return (
        <aside className="dashboard-sidebar">

            <div className="dashboard-brand">

                <img
                    src={logo}
                    alt="Ember & Oak"
                    className="dashboard-logo"
                />

            </div>


            <nav className="dashboard-nav">

                <NavLink
                    to="/dashboard"
                    end
                    className="dashboard-nav-link"
                >
                    Dashboard
                </NavLink>


                <NavLink
                    to="/dashboard/orders"
                    className="dashboard-nav-link"
                >
                    Orders
                </NavLink>


                <NavLink
                    to="/dashboard/reservations"
                    className="dashboard-nav-link"
                >
                    Reservations
                </NavLink>


                <NavLink
                    to="/dashboard/menu"
                    className="dashboard-nav-link"
                >
                    Menu
                </NavLink>


                <NavLink
                    to="/dashboard/tables"
                    className="dashboard-nav-link"
                >
                    Tables
                </NavLink>


                <NavLink
                    to="/dashboard/staff"
                    className="dashboard-nav-link"
                >
                    Staff
                </NavLink>

            </nav>


            <div className="dashboard-sidebar-bottom">

                <NavLink
                    to="/"
                    className="dashboard-nav-link"
                >
                    View Website
                </NavLink>


                <button
                    className="dashboard-logout"
                    onClick={handleLogout}
                >
                    Log Out
                </button>

            </div>

        </aside>
    );
}


export default DashboardNavbar;