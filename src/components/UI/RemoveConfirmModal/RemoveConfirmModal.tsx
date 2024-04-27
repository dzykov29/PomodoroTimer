import { useContext } from 'react'
import { TodoContext } from '../../../Context/TodoProvider'
import { TodoContextType } from '../../../utils/Todos'
import Button from '../Button/Button'
import styles from './RemoveConfirmModal.module.css'

const RemoveConfirmModal = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)
    return (
        <div
            className={styles.overlay}
            onClick={() => todoContext.toggleOpenRemoveModal(false, null)}
        >
            <div
                className={
                    todoContext.mode
                        ? styles.removeModal__wrapper_dark
                        : styles.removeModal__wrapper_light
                }
            >
                <img
                    className={styles.closeButton}
                    src="./assets/closeModal.svg"
                    alt="Закрыть модальное окно"
                    onClick={() =>
                        todoContext.toggleOpenRemoveModal(false, null)
                    }
                />
                <p className={styles.modal__descr}> Удалить задачу? </p>
                <div className={styles.modalBtn__wrapper}>
                    <Button
                        type="button"
                        className="btn btn__remove"
                        onClick={todoContext.removeTodo}
                    >
                        Удалить
                    </Button>
                    <Button
                        type="button"
                        className={
                            todoContext.mode
                                ? 'btn btn__cancel_dark'
                                : 'btn btn__cancel_light'
                        }
                        onClick={() =>
                            todoContext.toggleOpenRemoveModal(false, null)
                        }
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RemoveConfirmModal
