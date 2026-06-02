export default class Todo {
  constructor(title, dateDue, importance, description, completed) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.importance = importance;
    this.dateDue = dateDue;
    this.description = description;
    this.dateCreated = new Date();
    this.completed = completed || false;
  }
}
