import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Auth from "../auth/auth";
import { useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {
    const [loggedIn, setState] = useState(Auth.isAuthinticated())
    const navigate = useNavigate();
    const Location = useLocation();
    useEffect(() => {
        setState(Auth.isAuthinticated())
    }, [Location])

    const handleClick = useCallback(
        (e) => {
            Auth.LogOut()
            navigate('/log-in');
        }, [navigate]
    );
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                {loggedIn ? <Link className="navbar-brand" to="/">Home</Link> : ''}
                            </li>
                            <li className="nav-item">
                                {!loggedIn ? <Link className="navbar-brand" to="/sign-up">Sign Up</Link> : ''}
                            </li>
                            <li className="nav-item">
                                {!loggedIn ? <Link className="navbar-brand" to="/log-in">Log In</Link> : ''}
                            </li>
                            <li className="nav-item">
                                {loggedIn ? <Link className="navbar-brand" onClick={handleClick} to="/log-in">log Out</Link> : ''}
                            </li >
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

