import React, {Component} from 'react';
import axios from '../../services/axios';
import './edit-password.css';
import {toast} from 'react-toastify';
import {environment} from '../../environment'

class EditUserPassword extends Component {
    state = {
        password: '',
        confirmPassword: '',
        onGoingRequest: false,
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    handleUpdateClick = (e) => {
        e.preventDefault()
        if (this.state.password && this.state.confirmPassword) {
            this._isMounted = true;
            axios
                .post(`${environment.baseUrl}/api/user/verifyPassword`, {
                "password": this.state.password,
                "confirmPassword": this.state.confirmPassword,
            })
                .then((response) => {
                    toast.success('Successfully changed password :)', {position: toast.POSITION.BOTTOM_RIGHT}); 
                    this.setState({password: '', confirmPassword: ''});
                })
                .catch((error) => {
                    toast.error(error.response.status && error.response.status === 401? 'Password fields is incorrect' : 'Something went wrong :(', {position: toast.POSITION.BOTTOM_RIGHT});
                });
        }

    }

    handleConfirmPasswordChange = (event) => {
        this.setState({confirmPassword: event.target.value});
        let elem = document.getElementById('confirm-password');
        this.validate(elem, event)
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
        let elem = document.getElementById('password')
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

    render() {
        
        return (
            <div className="edit-user-page">
                <div className="container">
                    {this.state.onGoingRequest ? <h3 className="text-center">Loading...</h3> : null}
                    <div className={this.state.onGoingRequest?'hidden': 'row'}>
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Change Password</h5>
                                    <form className="form-signin">
                                        <div className="pd-bt-25">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.handlePasswordChange}
                                                value={this.state.password}
                                                required
                                                autoFocus/>
                                        </div>

                                        <div className="pd-bt-25">
                                            <input
                                                type="password"
                                                id="confirm-password"
                                                className="form-control"
                                                placeholder="Confirm Password"
                                                onChange={this.handleConfirmPasswordChange}
                                                value={this.state.confirmPassword}
                                                required
                                                autoFocus/>
                                        </div>

                                        
                                        <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit"
                                            onClick={this.handleUpdateClick}>Update</button>

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

export default EditUserPassword
