import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import {environment} from '../../environment'
import axios from '../../services/axios';
import './home.css';
import { ToastContainer, toast } from 'react-toastify';

const getTodoListByUser = () => {
    return axios.get(`${environment.baseUrl}/api/todo/getLoggedinUserTodo`);
}

class Home extends Component {

    state = {
        todoList: [],
        onGoingRequest: true
    }

    routeChange = () => {
        let path = 'createtodo';
        this
            .props
            .history
            .push(path);
    }

    componentWillMount() {
        getTodoListByUser().then(result => {
            this.setState({todoList: result.data.todoList});
            this.setState({todoListCopy: result.data.todoList});
            this.setState({onGoingRequest: false});
        }).catch(err => {
            this.setState({onGoingRequest: false});
        })
    }

    deleteTodo = (todoId, todoIndex) => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            axios
                .delete(`${environment.baseUrl}/api/todo/deleteByTodoId/${todoId}`)
                .then(result => {
                    toast.success('Successfully Deleted', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    let data = this.state.todoList.filter((list, index) => {
                        return index !== todoIndex;
                    })
                    this.setState({todoList: data}); 
                    this.forceUpdate();   
                })
                .catch(err => {
                    toast.error('Something went wrong :(', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                })
        }
    }

    editTodo = (id) => {
        this.props.history.push(`edit-todo/${id}`);
    }

    render() {

        return (

            <div className='container-fluid home-container'>
                <div className="text-right">
                    <button className="btn btn-outline-primary" onClick={this.routeChange}>Create</button>
                </div>
                {this.state.onGoingRequest
                    ? <h3 className="text-center">Loading...</h3>
                    : (this.state.todoList.length
                        ? (
                            <div className="">
                                <div className="todo-list">
                                    {this
                                        .state
                                        .todoList
                                        .map((todo, index) => {
                                            let date = `${new Date(todo.date).getDate()}-${new Date(todo.date).getMonth() + 1}-${new Date(todo.date).getFullYear()}`;
                                            let time = `${new Date(todo.date).getHours()}:${new Date(todo.date).getMinutes()}:${new Date(todo.date).getSeconds()}`
                                            return <div className="todo-list-container">
                                                <div key={index} className="list">
                                                    <span className="float-left">
                                                        <span className="todo-title">
                                                            {todo.title}

                                                        </span>
                                                        <span className="todo-date">
                                                            ({date + ' ' + time})

                                                        </span>
                                                    </span>
                                                    <span className="float-right">
                                                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                        <button
                                                            className={`btn btn-${todo.status === 'pending'
                                                            ? 'danger'
                                                            : (todo.status === 'in progress'
                                                                ? 'primary in-progress'
                                                                : 'success')}`}>{todo.status}</button>
                                                        <span className="hz-ln"></span>

                                                    </span>
                                                </div>
                                                <div className="edit-delete-box">
                                                    <span className="edit-todo">
                                                        <i className="fa fa-pencil" onClick={() => this.editTodo(todo.id)}></i>
                                                    </span>
                                                    <span className="delete-todo">
                                                        <i
                                                            className="fa fa-trash-o"
                                                            aria-hidden="true"
                                                            onClick={() => this.deleteTodo(todo.id, index)}></i>
                                                    </span>
                                                </div>
                                            </div>
                                        })}
                                </div>
                                <ToastContainer />
                            </div>
                        )
                        : <div className="text-center">
                            <h3>
                                No list to show
                            </h3>
                        </div>)}
            </div>

        )
    }
}

export default Home
