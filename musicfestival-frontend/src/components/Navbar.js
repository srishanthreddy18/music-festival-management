import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const { pathname } = useLocation();

    return (
        <nav className="site-nav">
            <div className="nav-inner">
                <Link className="brand" to="/">
                    <span className="brand-mark" aria-hidden="true">♫</span>
                    <span className="brand-copy">
                        <span className="brand-name">Music Festival</span>
                        <span className="brand-caption">THE FESTIVAL DESK</span>
                    </span>
                </Link>

                <div className="nav-links">
                    <Link
                        className={`nav-link${pathname === "/" ? " nav-link-active" : ""}`}
                        to="/"
                    >
                        Festivals
                    </Link>
                    <Link
                        className={`nav-link nav-link-primary${pathname === "/add" ? " nav-link-active" : ""}`}
                        to="/add"
                    >
                        + Add festival
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
