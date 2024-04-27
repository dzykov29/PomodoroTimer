import { FormEvent, useContext, useEffect, useState } from 'react'
import Button from '../Button/Button'
import './FormTodos.css'
import { TodoContext } from '../../../Context/TodoProvider'
import { TodoContextType } from '../../../utils/Todos'
import InputTodo from '../InputTodo/InputTodo'

const Form = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (value.length >= 5) {
            setError(false)
        }
    }, [value])

    const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (value.length >= 5) {
            todoContext.saveTodo({
                id: Date.now(),
                text: value,
                done: false,
                currentTomato: 1,
                tomatoCount: 1,
                timeToPaused: 0,
                timeToWork: 0,
                pausedCount: 0,
                dateEnd: null,
            })
            setValue('')
        } else {
            setError(true)
        }
    }

    return (
        <form className="form" onSubmit={handleAddTask}>
            <InputTodo error={error} value={value} setValue={setValue} />
            <Button className="btn btn__add-task" type="submit">
                Добавить
            </Button>
        </form>
    )
}

export default Form
