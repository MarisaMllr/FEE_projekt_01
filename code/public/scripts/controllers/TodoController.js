import Todo from '../models/Todo.js';
import FilterService from '../services/FilterService.js';

export default class TodoController {
    constructor(view, service) {
        this.view = view;
        this.service = service;

        this.currentSort = null;
        this.filterActive = false;

        const savedSort = localStorage.getItem('sortOption') || 'title';
        const savedDirection =
            Number(localStorage.getItem('sortDirection')) || 1;
        this.sortDirection = savedDirection;
        this.handleSortTodos(savedSort);

        this.view.bindCreateTodo(this.handleOpenDialog.bind(this));
        this.view.bindCloseDialog(this.handleCloseDialog.bind(this));
        this.view.bindEditTodo(this.handleEditTodo.bind(this));
        this.view.bindSubmitForm(this.handleSubmitForm.bind(this));
        this.view.bindSortTodos(this.handleSortTodos.bind(this));
        this.view.bindSortToggle();
        this.view.bindFilterTodos(this.handleFilterTodos.bind(this));
        this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this));
    }

    async applyFilterAndSort() {
        try {
            let todos = await this.service.getAllTodos();
            this.view.setDynamicTitle(todos);

            if (this.filterActive) {
                todos = FilterService.filterIncomplete(todos);
            }

            if (this.currentSort) {
                todos = FilterService.sort(
                    todos,
                    this.currentSort,
                    this.sortDirection,
                );
            }

            this.view.renderTodos(todos);
        } catch (err) {
            this.view.showError(err.message);
        }
    }

    handleFilterTodos() {
        this.filterActive = !this.filterActive;
        this.view.setFilterButton(this.filterActive);
        this.applyFilterAndSort();
    }

    handleSortTodos(sort) {
        if (this.currentSort === sort) {
            this.sortDirection *= -1;
        } else {
            this.sortDirection = 1;
        }
        this.currentSort = sort;

        localStorage.setItem('sortOption', sort);
        localStorage.setItem('sortDirection', this.sortDirection);

        this.view.setActiveSortButton(sort, this.sortDirection);
        this.applyFilterAndSort();
    }

    handleOpenDialog() {
        this.view.openCreateDialog();
    }

    handleCloseDialog(event) {
        event.preventDefault();
        this.view.closeDialog();
    }

    async handleEditTodo(id) {
        try {
            const todo = await this.service.getTodoById(id);
            this.view.openEditDialog(todo);
        } catch (err) {
            this.view.showError(err.message);
        }
    }

    async handleSubmitForm(formData) {
        try {
            if (formData.editingId) {
                await this.service.updateTodo(formData.editingId, {
                    title: formData.title,
                    dateDue: formData.dateDue,
                    importance: formData.importance,
                    description: formData.description,
                    completed: formData.completed,
                });
            } else {
                const newTodo = new Todo(
                    formData.title,
                    formData.dateDue,
                    formData.importance,
                    formData.description,
                    formData.completed,
                );
                const created = await this.service.saveTodo(newTodo);
                this.view.setEditingId(created.id);
            }
            if (formData.action === 'create-overview') {
                this.view.closeDialog();
            }
            await this.applyFilterAndSort();
        } catch (err) {
            this.view.showFormError(err.message);
        }
    }

    async handleDeleteTodo(id) {
        try {
            await this.service.deleteTodo(id);
            await this.applyFilterAndSort();
        } catch (err) {
            this.view.showError(err.message);
        }
    }
}
