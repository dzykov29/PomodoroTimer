import { FC, useContext, useEffect, useState } from 'react'
import { Todo, TodoContextType } from '../../../utils/Todos'
import './TodoItem.css'
import EditModal from '../../UI/EditModal/EditModal'
import InputTodo from '../../UI/InputTodo/InputTodo'
import { TodoContext } from '../../../Context/TodoProvider'

interface TodoItemProps {
    todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const todoContext = useContext<TodoContextType>(TodoContext)

    const [isEditTodoText, setIsEditTodoText] = useState<boolean>(false)
    const [value, setValue] = useState<string>(todo.text) // Инициализируем значение ввода текстом задачи
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (value.length >= 5) {
            setError(false)
        }
    }, [value])

    const handleEnter = () => {
        if (value.trim().length >= 5) {
            setIsEditTodoText(false)
            todoContext.editTextTodo({ ...todo, text: value })
        } else {
            setError(true)
        }
    }

    const handleBlur = () => {
        if (value.trim().length >= 5) {
            setIsEditTodoText(false)
            todoContext.editTextTodo({ ...todo, text: value })
        } else {
            setError(true)
        }
    }

    return (
        <li className="item">
            <div className="tomato__count">{todo.tomatoCount}</div>
            {isEditTodoText ? (
                <InputTodo
                    error={error}
                    value={value}
                    setValue={setValue}
                    handleEnter={handleEnter}
                    handleBlur={handleBlur}
                />
            ) : (
                <span className="item__text">{todo.text}</span>
            )}
            <EditModal setIsEditTodoText={setIsEditTodoText} todo={todo} />
        </li>
    )
}

export default TodoItem
