export default class TodoService {
    async #fetch(url, options = {}) {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error();
            return res;
        } catch {
            throw new Error(
                'Verbindungsfehler. Bitte versuche es später erneut.',
            );
        }
    }

    async getAllTodos() {
        const res = await this.#fetch('/api/todos');
        return res.json();
    }

    async saveTodo(todo) {
        const res = await this.#fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        return res.json();
    }

    async getTodoById(id) {
        const res = await this.#fetch(`/api/todos/${id}`);
        return res.json();
    }

    async updateTodo(id, data) {
        await this.#fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    async deleteTodo(id) {
        await this.#fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        });
    }
}
