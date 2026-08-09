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

            <div className="brand-block">

                <div className="brand-icon">🧠</div>

                <div>

                    <h2>ManageDSA Vault</h2>

                    <p>Your cozy practice hub</p>

                </div>

            </div>

            <div className="nav-right">

                <span className="user-chip">{user?.fullname || "Learner"}</span>

                <button onClick={handleLogout}>

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;