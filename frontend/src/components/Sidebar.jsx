import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <Link to="/dashboard">

                Dashboard

            </Link>

            <Link to="/upload">

                Upload Question

            </Link>

            <Link to="/profile">

                Profile

            </Link>

        </div>

    );

}

export default Sidebar;