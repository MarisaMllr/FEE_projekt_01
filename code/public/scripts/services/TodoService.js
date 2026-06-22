export default class TodoService {
    async #fetch(url, options = {}) {
        let res;
        try {
            res = await fetch(url, options);
        } catch {
            throw new Error(
                'Verbindungsfehler. Bitte versuche es später erneut.',
            );
        }
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message || 'Ein Fehler ist aufgetreten.');
        }
        return res;
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
