import {Link} from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom">
            <div className="container">
                <Link className="navbar-brand" to='/'>Geordie Nation</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav"></div>
                <div className="navbar-text">
                    <Link to='register' className="btn btn-outline-primary">Register</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;