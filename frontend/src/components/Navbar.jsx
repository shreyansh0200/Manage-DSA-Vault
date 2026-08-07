import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <div className="navbar">

            <h2>Manage DSA Vault</h2>

            <div className="nav-right">

                <span>{user?.fullname}</span>

                <button onClick={handleLogout}>

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;