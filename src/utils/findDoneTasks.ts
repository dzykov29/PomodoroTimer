import { Todo } from './Todos'
import { getDateOnWeek } from './getDateOnWeek'

// Функция для поиска элементов с done = true
export function findDoneTasks(todos: Todo[]): Todo[] {
    if (!todos) {
        return [] // Если todos не определен или пустой массив, вернуть пустой массив
    }

    return todos.filter((todo) => todo.done) // Вернуть массив задач с done = true
}

//Выполненные задачи, которые сделаны на выбранной неделе
export function findDoneTasksToWeek(todos: Todo[], weekCount: number): Todo[] {
    const doneTasks = todos.filter((todo) => todo.done)
    const { monday, sunday } = getDateOnWeek(weekCount)
    // Фильтруем выполненные задачи, оставляя только те, которые были выполнены в указанный период
    return doneTasks.filter((task) => {
        // Если dateEnd не существует, считаем задачу выполненной
        if (!task.dateEnd) return true
        const dt = new Date(task.dateEnd)
        // Иначе проверяем, что дата завершения находится в указанном периоде
        return dt <= sunday && dt >= monday
    })
}

export function getDateForDayOfWeek(
    todos: Todo[],
    weekCount: number,
    dayOfWeek: number
): Todo[] {
    const doneTasks = todos.filter((todo) => todo.done)
    
    const { monday } = getDateOnWeek(weekCount)
    // Копируем дату понедельника и добавляем дни для получения нужной даты
    const dateForDayOfWeek = new Date(monday)
    dateForDayOfWeek.setDate(monday.getDate() + dayOfWeek)
    // dateForDayOfWeek.setDate(monday.getDate() + dayOfWeek - 1)

    // Фильтруем выполненные задачи, оставляя только те, которые были выполнены в указанный период
    return doneTasks.filter((task) => {
        // Если dateEnd не существует, считаем задачу выполненной
        if (!task.dateEnd) return true
        const dt = new Date(task.dateEnd)
        // Иначе проверяем, что дата завершения находится в указанном периоде
        return dt.toDateString() === dateForDayOfWeek.toDateString()
    })
}