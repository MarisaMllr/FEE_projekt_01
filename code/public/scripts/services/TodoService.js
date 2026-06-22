export default class TodoService {
    async getAllTodos() {
        const res = await fetch("/api/todos");
        return res.json();
    }

    async saveTodo(todo) {
        const res = await fetch("/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        return res.json();
    }

    async getTodoById(id) {
        const res = await fetch(`/api/todos/${id}`);
        return res.json();
    }

    async updateTodo(id, data) {
        await fetch(`/api/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    async deleteTodo(id) {
        await fetch(`/api/todos/${id}`, {
            method: "DELETE",
        });
    }
}
