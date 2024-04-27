import { Todo } from './Todos'

// Функция для поиска первого элемента с done = false
export function findFirstUndoneTask(todos: Todo[] | undefined) {
    if (todos) {
        for (let i = 0; i < todos.length; i++) {
            if (!todos[i].done) {
                return todos[i]
            }
        }
    }
    return null // Если не найдено ни одной задачи с done = false
}
