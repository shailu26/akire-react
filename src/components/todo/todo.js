import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import {environment} from '../../environment'
import axios from '../../services/axios';
import DatePicker from 'react-date-picker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './todo.css';

class Todo extends Component {

    state = {
        date: new Date(),
        title: '',
        status: 'pending',
        validForm: false
    }
    onDateChange = date => {
        this.setState({date});
        this.forceUpdate();
        this.validate()
    }

    validate = () => {
        this.setState({
            validForm: this.state.date && this.state.title && this.state.status
                ? true
                : false
        });
    }
    handleTitle = (e) => {
        let value = document
            .getElementById('input-title')
            .value
        this.setState({title: value});
        this.forceUpdate();
        this.validate();
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.validForm) {
            axios
                .post(`${environment.baseUrl}/api/todo/createTodo`, {
                date: this.state.date,
                title: this.state.title,
                status: this.state.status
            })
                .then(result => {
                    toast.success("suceessfully created", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
                .catch(err => {
                    toast.error('Something went wrong :(', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
        }
    }
    render() {

        return (

            <div className="todo-container">
                <form className="todo-create-form">
                    <DatePicker onChange={this.onDateChange} value={this.state.date}/>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="input-title"
                            aria-describedby="todotitle"
                            placeholder="Enter title"
                            onChange={this.handleTitle}
                            value={this.state.title}
                            required/> {!this.state.title.length
                            ? <small id="todotitle" className="form-text danger">* Can not left blank</small>
                            : <small id="todotitle" className="form-text text-muted mg-tp-2"></small>}
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="select-status"
                            onChange={(e) => this.setState({status: e.target.value})}>
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="text-center pd-tp-15">
                        {this.state.validForm
                            ? <button className="btn btn-outline-success" onClick={this.handleSubmit}>Create</button>
                            : <button className="btn btn-outline-dark" disabled>Create</button>
}

                    </div>
                </form>
            </div>

        )
    }
}

export default Todo
