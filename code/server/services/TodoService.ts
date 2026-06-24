import Datastore from '@seald-io/nedb';
import { CONFIG } from '../config.js';
import { Todo, TodoData } from '../types.js';

type StoredTodo = TodoData & { _id: string };

class TodoService {
    private db: Datastore<TodoData>;

    constructor() {
        this.db = new Datastore<TodoData>({
            filename: CONFIG.data(process.env.DB_NAME ?? 'todos.db'),
            autoload: true,
        });
    }

    async getAll(): Promise<Todo[]> {
        const docs = (await this.db.findAsync({})) as unknown as StoredTodo[];
        return docs.map(this.#mapId);
    }

    async create(data: TodoData): Promise<Todo> {
        const document = (await this.db.insertAsync(data)) as unknown as StoredTodo;
        return this.#mapId(document);
    }

    async update(id: string, data: Partial<TodoData>): Promise<void> {
        await this.db.updateAsync({ _id: id }, { $set: data });
    }

    async delete(id: string): Promise<void> {
        await this.db.removeAsync({ _id: id }, {});
    }

    async getById(id: string): Promise<Todo | null> {
        const todo = (await this.db.findOneAsync({ _id: id })) as unknown as StoredTodo | null;
        if (!todo) return null;
        return this.#mapId(todo);
    }

    #mapId({ _id, ...rest }: StoredTodo): Todo {
        return { id: _id, ...rest };
    }
}

export const todoService = new TodoService();
