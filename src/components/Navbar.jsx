import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render() {
        return(
            <Fragment>
                    <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-info">
                        <Link className="navbar-brand" to="/">Pokedex</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        </ul>
                    </nav>                    
            </Fragment>
        )
    }
}

export default Navbar;