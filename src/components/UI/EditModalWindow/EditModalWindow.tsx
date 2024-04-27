import { FC, useContext } from 'react'
import styles from './EditModalWindow.module.css'
import { Todo, TodoContextType } from '../../../utils/Todos'
import { TodoContext } from '../../../Context/TodoProvider'

interface EditModalWindowProps {
    setIsOpenModal: (isOpen: boolean) => void
    todo: Todo
    updateTodo: (updatedTodo: Todo, strim: boolean) => void
    setIsEditTodoText: (isEdit: boolean) => void
    toggleOpenRemoveModal: (
        isOpenRemoveModal: boolean,
        id: number | null
    ) => void
}

const EditModalWindow: FC<EditModalWindowProps> = ({
    setIsOpenModal,
    todo,
    updateTodo,
    setIsEditTodoText,
    toggleOpenRemoveModal,
}) => {
    const { mode } = useContext<TodoContextType>(TodoContext)

    const handleAddTomato = () => {
        updateTodo(todo, true)
        setIsOpenModal(false)
    }

    const handleMinusTomato = () => {
        if (todo.tomatoCount === 1) {
            return
        } else {
            updateTodo(todo, false)
            setIsOpenModal(false)
        }
    }

    const handleEditTodo = () => {
        setIsEditTodoText(true)
        setIsOpenModal(false)
    }

    const handleRemove = () => {
        toggleOpenRemoveModal(true, todo.id)
        setIsOpenModal(false)
    }

    return (
        <div className={mode ? styles.modal_dark : styles.modal_light}>
            <ul className={styles.list}>
                <li
                    onClick={handleAddTomato}
                    className={mode ? styles.item_dark : styles.item_light}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="M9.75 5.25H8.25V8.25H5.25V9.75H8.25V12.75H9.75V9.75H12.75V8.25H9.75V5.25ZM9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                                fill="#A8B64F"
                            />
                        </g>
                    </svg>
                    Увеличить
                </li>
                <li
                    onClick={handleMinusTomato}
                    className={mode ? styles.item_dark : styles.item_light}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                                fill="#C4C4C4"
                            />
                            <path
                                d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z"
                                fill="#C4C4C4"
                            />
                        </g>
                    </svg>
                    Уменьшить
                </li>
                <li
                    onClick={handleEditTodo}
                    className={mode ? styles.item_dark : styles.item_light}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.545 4.765L9.235 5.455L2.44 12.25H1.75V11.56L8.545 4.765ZM11.245 0.25C11.0575 0.25 10.8625 0.325 10.72 0.4675L9.3475 1.84L12.16 4.6525L13.5325 3.28C13.825 2.9875 13.825 2.515 13.5325 2.2225L11.7775 0.4675C11.6275 0.3175 11.44 0.25 11.245 0.25ZM8.545 2.6425L0.25 10.9375V13.75H3.0625L11.3575 5.455L8.545 2.6425Z"
                            fill="#A8B64F"
                        />
                    </svg>
                    Редактировать
                </li>
                <li
                    onClick={handleRemove}
                    className={mode ? styles.item_dark : styles.item_light}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="M12 6.75V14.25H6V6.75H12ZM10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625L10.875 2.25ZM13.5 5.25H4.5V14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25Z"
                                fill="#A8B64F"
                            />
                        </g>
                    </svg>
                    Удалить
                </li>
            </ul>
        </div>
    )
}

export default EditModalWindow
