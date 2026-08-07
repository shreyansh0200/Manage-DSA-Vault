import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={{ padding: 40 }}>
            <h2>Page Not Found</h2>
            <p>The page you requested does not exist.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
}

export default NotFound;
