import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import {environment} from '../../environment'
import axios from '../../services/axios';
import DatePicker from 'react-date-picker';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './edit-todo.css';

class EditTodo extends Component {

    state = {
        date: new Date(),
        title: '',
        status: 'pending',
        validForm: false,
        todoDetails: null,
        onGoingRequest: true
    }
    componentWillMount = () => {
        const todoId = this.props.match.params.id;
        axios
            .get(`${environment.baseUrl}/api/todo/getTodoById/${todoId}`)
            .then(result => {
                const todo = result.data.todo;
                this.setState({
                    todoDetails: result.data.todo,
                    date: new Date(todo.date),
                    title: todo.title,
                    status: todo.status,
                    onGoingRequest: false
                });
                this.forceUpdate();
                this.validate();
            })
            .catch(err => {
                this.setState({onGoingRequest: false})
            });
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
                .patch(`${environment.baseUrl}/api/todo/updateTodoById/${this.state.todoDetails.id}`, {
                date: this.state.date,
                title: this.state.title,
                status: this.state.status
            })
                .then(result => {
                    toast.success("suceessfully updated", {position: toast.POSITION.BOTTOM_RIGHT});
                })
                .catch(err => {
                    toast.error('Something went wrong :(', {position: toast.POSITION.BOTTOM_RIGHT});
                })
        }
    }
    render() {
        const {onGoingRequest} = this.state
        return (
            
            <div className="todo-container">
                {onGoingRequest ? <h3 className="text-center">Loading...</h3> : null}
                <form className={onGoingRequest?'hidden': 'todo-create-form'}>
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
                            onChange={(e) => this.setState({status: e.target.value})}
                            value={this.state.status}>
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="text-center pd-tp-15">
                        {this.state.validForm
                            ? <button className="btn btn-outline-success" onClick={this.handleSubmit}>Update</button>
                            : <button className="btn btn-outline-dark" disabled>Update</button>
                        }

                    </div>
                </form>
                <ToastContainer/>
            </div>

        )
    }
}

export default EditTodo
