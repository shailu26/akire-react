import React, {Component} from 'react';
import axios from '../../services/axios';
import './edit-user.css';
import {ToastContainer, toast} from 'react-toastify';
import {environment} from '../../environment'

class EditUser extends Component {
    state = {
        userCopy: null,
        email: '',
        name: '',
        onGoingRequest: true,
    }

    componentWillMount = () => {
        const userId = this.props.match.params.id;
        axios
            .get(`${environment.baseUrl}/api/user/getUserDetail/${userId}`)
            .then(result => {
                const userDetails = result.data.userDetails;
                this.setState({userCopy: result.data.userDetails});
                this.setState({
                    email: userDetails.email,
                    name: userDetails.full_name,
                    onGoingRequest: false
                });
                this.forceUpdate();
            })
            .catch(err => {
                this.setState({onGoingRequest: false})
            });
    }

    handleUpdateClick = (e) => {
        e.preventDefault()
        if (this.state.email && this.state.name) {
            axios
                .patch('http://localhost:8001/api/user/updateUserById', {
                "name": this.state.name,
                "email": this.state.email,
                "isEmailChanged": this.state.userCopy.email.toLowerCase() !== this.state.email.toLowerCase()
            })
                .then((response) => {
                    console.log('Success');
                    toast.success('Successfully updated :)', {position: toast.POSITION.BOTTOM_RIGHT}); 
                    this.state.userCopy.name = this.state.name;
                    this.state.userCopy.email = this.state.email;
                    this.forceUpdate();
                })
                .catch((error) => {
                    toast.error(error.response.data.error.code === 'ER_DUP_ENTRY'? 'Email Already Exist' : 'Something went wrong :(', {position: toast.POSITION.BOTTOM_RIGHT});
                });
        }

    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
        let elem = document.getElementById('email')
        this.validate(elem, event)
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
        let elem = document.getElementById('name')
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
        return this.state.name && this.state.email;
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
                                    <h5 className="card-title text-center">Edit User</h5>
                                    <form className="form-signin">
                                        <div className="pd-bt-25">
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control"
                                                placeholder="*Full Name"
                                                onChange={this.handleNameChange}
                                                value={this.state.name}
                                                required
                                                autoFocus/>
                                        </div>

                                        <div className="pd-bt-25">
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="*Email address"
                                                onChange={this.handleEmailChange}
                                                value={this.state.email}
                                                required
                                                autoFocus/>
                                        </div>

                                        {this.state.name && this.state.email ? <button
                                            className="btn btn-lg btn-primary btn-block text-uppercase"
                                            type="submit"
                                            onClick={this.handleUpdateClick}>Update</button>:
                                            <button
                                            className="btn btn-lg btn-dark btn-disabled btn-block text-uppercase"
                                            type="submit"
                                            >Update</button>}
                                      
                                    </form>
                                    <ToastContainer></ToastContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditUser
