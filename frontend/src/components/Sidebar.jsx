import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <div className="sidebar-brand">Study Space</div>

            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>

                Dashboard

            </NavLink>

            <NavLink to="/upload" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>

                Upload Question

            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>

                Profile

            </NavLink>

        </div>

    );

}

export default Sidebar;