import { CONFIG } from '../config.js';
import Datastore from '@seald-io/nedb';

class TodoService {
    constructor() {
        this.db = new Datastore({
            filename: CONFIG.data(process.env.DB_NAME || 'todos.db'),
            autoload: true,
        });
    }

    async getAll() {
        const docs = await this.db.findAsync({});
        return docs.map(this.#mapId);
    }

    async create(data) {
        const document = await this.db.insertAsync(data);
        return this.#mapId(document);
    }

    async update(id, data) {
        await this.db.updateAsync({ _id: id }, { $set: data });
    }

    async delete(id) {
        await this.db.removeAsync({ _id: id });
    }

    async getById(id) {
        const todo = await this.db.findOneAsync({ _id: id });
        if (!todo) return null;
        return this.#mapId(todo);
    }

    #mapId({ _id, ...rest }) {
        //nedb uses _id internally, frontend expects id
        return { id: _id, ...rest };
    }
}

export const todoService = new TodoService();
