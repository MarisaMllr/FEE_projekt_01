export default class TodoDialogView {
    constructor() {
        this.dialog = document.querySelector('#dialog-create-todo');
        this.todoList = document.querySelector('#todos');
        this.todoHeader = document.querySelector('.todos__header');
        this.form = document.querySelector('#form-create-todo');
        this.btnSave = this.form.querySelector('.btn--save');
        this.btnSaveOverview = this.form.querySelector('.btn--save-overview');
    }

    #openDialog() {
        const headerHeight =
            document.querySelector('#main-header').offsetHeight;
        const rem = parseFloat(
            getComputedStyle(document.documentElement).fontSize,
        );
        this.dialog.style.top = `${headerHeight + rem}px`;
        this.dialog.classList.add('dialog--open');
        this.todoList.classList.add('hidden');
        this.todoHeader.classList.add('hidden');
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }

    openCreate() {
        this.#openDialog();
        this.form.querySelector('.btn--save').innerText = 'Erstellen';
        this.form.querySelector('.btn--save-overview').innerText =
            'Erstellen & Übersicht';
    }

    openEdit(todo) {
        this.#openDialog();
        this.form.querySelector('.btn--save').innerText = 'Speichern';
        this.form.querySelector('.btn--save-overview').innerText =
            'Speichern & Übersicht';
        this.form.querySelector('#editing-id').value = todo.id;
        this.form.querySelector('#title').value = todo.title;
        this.form.querySelector('#date_due').value = todo.dateDue;
        this.form.querySelector(`#importance-${todo.importance}`).checked =
            true;
        this.form.querySelector('#completed').checked = todo.completed;
        this.form.querySelector('#description').value = todo.description;
    }

    close() {
        this.todoList.classList.remove('hidden');
        this.todoHeader.classList.remove('hidden');
        this.dialog.classList.remove('dialog--open');
        document.querySelector('#form-create-todo').reset();
        document.querySelector('#editing-id').value = '';
    }

    bindResetForm(handler) {
        this.form.addEventListener('reset', (event) => {
            event.preventDefault();
            handler();
        });
    }

    bindClose(handler) {
        document
            .querySelector('.dialog__actions .btn--close')
            .addEventListener('click', handler);
    }

    bindSubmit(handler) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const submitButton = event.submitter;
            handler({
                editingId: formData.get('editing_id') || null,
                title: formData.get('title'),
                dateDue: formData.get('date_due'),
                importance: formData.get('importance'),
                description: formData.get('description'),
                completed: formData.get('completed') === 'on',

                action: submitButton?.value || null,
            });

            if (submitButton.value === 'create') {
                this.btnSave.innerText = 'Speichern';
                this.btnSaveOverview.innerText = 'Speichern & Übersicht';
            }
        });
    }

    setEditingId(id) {
        this.form.querySelector('#editing-id').value = id;
    }

    showFormError(message) {
        const existing = this.form.querySelector('.error-message');
        if (existing) existing.remove();
        const error = document.createElement('p');
        error.className = 'error-message';
        error.textContent = message;
        this.form.prepend(error);
    }
}
