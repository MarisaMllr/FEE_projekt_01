import TodoDialogView from "./TodoDialogView.js";
import TodoListView from "./TodoListView.js";

export default class TodoView {
    #dialog;
    #list;

    constructor() {
        this.#dialog = new TodoDialogView();
        this.#list = new TodoListView();
    }

    bindCreateTodo(handler) {
        document
            .querySelector("#btn-create-todo")
            .addEventListener("click", handler);
    }

    bindCloseDialog(handler) {
        this.#dialog.bindClose(handler);
    }
    bindSubmitForm(handler) {
        this.#dialog.bindSubmit(handler);
    }
    bindEditTodo(handler) {
        this.#list.bindEdit(handler);
    }
    openCreateDialog() {
        this.#dialog.openCreate();
    }
    openEditDialog(todo) {
        this.#dialog.openEdit(todo);
    }
    closeDialog() {
        this.#dialog.close();
    }
    renderTodos(todos) {
        this.#list.render(todos);
    }
    setEditingId(id) {
        this.#dialog.setEditingId(id);
    }
    bindSortTodos(sort) {
        this.#list.bindSort(sort);
    }
    bindFilterTodos(handler) {
        this.#list.bindFilterTodos(handler);
    }
    setActiveSortButton(sort, direction) {
        this.#list.setActiveSortButton(sort, direction);
    }
    setFilterButton(active) {
        this.#list.setFilterButton(active);
    }
    bindDeleteTodo(handler) {
        this.#list.bindDelete(handler);
    }
    setDynamicTitle(todos) {
        this.#list.setDynamicTitle(todos);
    }
}
