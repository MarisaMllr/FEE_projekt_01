export default class TodoService {
  getAllTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

  saveTodo(todo) {
    const todos = this.getAllTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  deleteTodo(id) {
    const todos = this.getAllTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
  }
}
