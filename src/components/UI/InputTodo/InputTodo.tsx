import { FC, KeyboardEvent, useContext, useEffect, useRef } from 'react'
import { TodoContextType } from '../../../utils/Todos'
import { TodoContext } from '../../../Context/TodoProvider'

interface InputTodoProps {
    error: boolean
    value: string
    setValue: (value: string) => void
    handleEnter?: () => void // Функция для обработки нажатия клавиши Enter
    handleBlur?: () => void // Функция для обработки потери фокуса
}

const InputTodo: FC<InputTodoProps> = ({
    error,
    value,
    setValue,
    handleEnter,
    handleBlur,
}) => {
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (handleEnter) {
                handleEnter() // Вызываем функцию для обработки нажатия клавиши Enter
            }
        }
    }
    const inputRef = useRef<HTMLInputElement>(null)
    const { mode } = useContext<TodoContextType>(TodoContext)

    useEffect(() => {
        // Устанавливаем фокус на инпут при его отрисовке
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <>
            <input
                ref={inputRef}
                type="text"
                className={mode ? 'form__input_dark' : 'form__input_light'}
                placeholder="Название задачи"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyPress={handleKeyPress} // Обрабатываем события нажатия клавиши
                onBlur={handleBlur} // Обрабатываем событие потери фокуса
            />
            {error && (
                <label className="error__label">
                    Название задачи должно состоять минимум из 5 символов
                </label>
            )}
        </>
    )
}

export default InputTodo
