import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import loginComponent from './components/login/login';
import Navbar from './components/navbar/navbar';
import homeComponent from './components/home/home';
import todoComponent from './components/todo/todo';
import signupComponent from './components/signup/signup'
import editTodoComponent from './components/edit-todo/edit-todo';
import editUserComponent from './components/edit-user/edit-user';
import changePasswordComponent from './components/edit-password/edit-password'
import './App.css';

let component = () => {
  return (
    <div className='main-container'>
      <Navbar />
      <Switch>
        <Route path='/' component={homeComponent} exact />
        <Route path='/home' component={homeComponent} exact />
        <Route path='/createtodo' component={todoComponent} exact />
        <Route path='/edit-todo/:id' component={editTodoComponent} />
        <Route path='/edit-user/:id' component={editUserComponent} />
        <Route path='/change-password' component={changePasswordComponent} />
      </Switch>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={loginComponent} />
         <Route exact path='/signup' component={signupComponent} />
        <Route path='/' component={component} />
      </Switch>
    </BrowserRouter >
  );
}

export default App;