import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from '../../services/axios';
import Cookies from 'universal-cookie';
import './login.css';
import jwt from 'jsonwebtoken'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies();

class Login extends Component {
    state = {
        email: '',
        password: '',
        redirect: cookies.get('token')
            ? true
            : false
    }

    handleLoginClick = (e) => {
        e.preventDefault()
        if (this.state.email && this.state.password) {
            axios
                .post('http://localhost:8001/api/user/login', {
                "email": this.state.email,
                "password": this.state.password
            })
                .then((response) => {
                    cookies.set('token', response.data.token, {path: '/'})
                    let data = jwt.decode(response.data.token);
                    for (let key in data) {
                        cookies.set(key.toString(), data[key], {path: '/'})
                    }
                    this.setState({redirect: true})
                })
                .catch((error) => {
                    toast.error('Email or Password does not exist', {position: toast.POSITION.BOTTOM_RIGHT});
                });
        }

    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
        let elem = document.getElementById('password')
        this.validate(elem, event)
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
        let elem = document.getElementById('email')
        this.validate(elem, event)
    }
    
    validate(elem, event) {
        if (!event.target.value) {
            if (!elem.classList.contains('input-danger')) {
                elem
                    .classList
                    .add('input-danger');
            }
        } else {
            if (elem.classList.contains('input-danger')) {
                elem
                    .classList
                    .remove('input-danger');
            }
        }
    }

    goToSignup = () => {
        this
            .props
            .history
            .push(`/signup`);
    }

    componentWillMount() {}

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/home'}/>)
        }
        return (
            <div className="login-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form className="form-signin">
                                        <div className="pd-bt-25">
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="Email address"
                                                onChange={this.handleEmailChange}
                                                required
                                                autoFocus/>
                                        </div>

                                        <div className="pd-bt-25">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.handlePasswordChange}
                                                required/>
                                        </div>

                                        <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit"
                                            onClick={this.handleLoginClick}>Sign in</button>
                                        <hr className="my-4"/>
                                        <div className="or-option">OR</div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.goToSignup}>Signup</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
