export default class FilterService {
    static filterIncomplete(todos) {
        return todos.filter((todo) => !todo.completed);
    }

    static sort(todos, key, direction) {
        return [...todos].sort((a, b) => {
            const valA = a[key];
            const valB = b[key];

            if (key === "dateDue" || key === "dateCreated") {
                const dateA = new Date(valA);
                const dateB = new Date(valB);

                if (isNaN(dateA)) return 1;
                if (isNaN(dateB)) return -1;

                return (dateA - dateB) * direction;
            }

            if (!isNaN(valA)) {
                return (Number(valA) - Number(valB)) * direction;
            }

            return valA.localeCompare(valB) * direction;
        });
    }
}
