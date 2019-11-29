
import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import './navbar.css'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Navbar extends Component {

    state = {
        name: cookies.get('name')
    }

    constructor() {
        super()
        this.ismenuHidden = true;
    }
    signOut = () => {
        cookies.remove('token');
        console.log(cookies.get('token'));
        this
            .props
            .history
            .push(`/login`);
    }

    goToPath = (path) => {
        this
            .props
            .history
            .push(`${path}`);
    }

    render() {
        if (!cookies.get('token')) {
            return (<Redirect to={'/login'}/>)
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light height-70">
                <div className="navbar-brand cursor-pointer" onClick={() => this.goToPath('/')}> HOME</div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown mr-80">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Settings
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <div className="dropdown-item cursor-pointer" onClick={() => this.goToPath(`edit-user/${cookies.get('id')}`)}>Update Profile</div>
                        <div className="dropdown-item cursor-pointer" onClick={() => this.goToPath(`/change-password`)}>Change Password</div>
                        <div className="dropdown-item cursor-pointer" onClick={this.signOut}>Logout</div>
                        </div>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)
