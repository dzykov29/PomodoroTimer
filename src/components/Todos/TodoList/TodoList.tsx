import { FC, useContext, useMemo } from 'react'
import { Todo, TodoContextType } from '../../../utils/Todos'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './TodoList.css'
import TodoItem from '../TodoItem/TodoItem'
import { convertSecondsToHoursMinutesSeconds } from '../../../utils/convertTime'
import { TodoContext } from '../../../Context/TodoProvider'

const TodoList: FC = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)
    const undoneTodos = todoContext.todos.filter((todo:Todo) => !todo.done)

    console.log(undoneTodos);
    const totalTime = useMemo(() => {
        let totalTime = 0
        todoContext.todos.forEach((todo: Todo) => {
            if (!todo.done) {
                totalTime += todo.tomatoCount * todoContext.TIME_FOR_WORK
            }
        })
        return totalTime
    }, [todoContext.TIME_FOR_WORK, todoContext.todos])

    if (!todoContext.todos) {
        return null
    }

    return (
        <>
            <TransitionGroup component={'ul'} className="todo__list">
                {undoneTodos.map(
                    (todo: Todo) =>
                            <CSSTransition
                                key={todo.id}
                                timeout={500}
                                classNames="item"
                            >
                                <TodoItem todo={todo} />
                            </CSSTransition>
                )}
            </TransitionGroup>
            {totalTime !== 0 && (
                <p className="total__time">
                    {convertSecondsToHoursMinutesSeconds(totalTime)}
                </p>
            )}
        </>
    )
}

export default TodoList
