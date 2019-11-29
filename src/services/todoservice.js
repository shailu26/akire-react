import './axios';
import {environment} from '../environment';

class TodoService {
    getTodoListByUser() {
        return axios.get(`${environment.baseUrl}/api/todo/getLoggedinUserTodo`);
    }
}

export default TodoService;