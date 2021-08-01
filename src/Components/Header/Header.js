import {Link} from 'react-router-dom';

function Header(props) {

    return (
        <header className="App-header">
            <nav className="navbar navbar-light bg-light">
                <Link to="/login" className="navbar-brand">Login</Link>
            </nav>
        </header>
    );
}

export default Header;