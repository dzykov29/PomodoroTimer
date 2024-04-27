import { FC, useContext, useEffect, useRef, useState } from 'react'
import { Todo, TodoContextType } from '../../../utils/Todos'
import styles from './EditModal.module.css'
import EditModalWindow from '../EditModalWindow/EditModalWindow'
import { TodoContext } from '../../../Context/TodoProvider'

interface EditModalProps {
    todo: Todo
    setIsEditTodoText: (isEditTodoText: boolean) => void
}

const EditModal: FC<EditModalProps> = ({ todo, setIsEditTodoText }) => {
    const todoContext = useContext<TodoContextType>(TodoContext)

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const modalRef = useRef<HTMLDivElement>(null)

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setIsOpenModal(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpenModal])

    return (
        <div ref={modalRef}>
            <svg
                className={styles.edit}
                onClick={toggleModal}
                width="26"
                height="6"
                viewBox="0 0 26 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
                <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
                <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
            </svg>
            {isOpenModal && todoContext.updateTodo && (
                <EditModalWindow
                    updateTodo={todoContext.updateTodo}
                    setIsEditTodoText={setIsEditTodoText}
                    todo={todo}
                    setIsOpenModal={setIsOpenModal}
                    toggleOpenRemoveModal={todoContext.toggleOpenRemoveModal}
                />
            )}
        </div>
    )
}

export default EditModal
