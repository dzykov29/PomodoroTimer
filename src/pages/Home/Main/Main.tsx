import Timer from '../../../components/Timer/Timer';
import Instruction from '../../../components/Instruction/Instruction';
import styles from './Main.module.css'
import TodoList from '../../../components/Todos/TodoList/TodoList';
import Form from '../../../components/UI/FormTodos/FormTodos';
import { TodoContext } from '../../../Context/TodoProvider';
import { useContext } from 'react';
import { TodoContextType } from '../../../utils/Todos';
import RemoveConfirmModal from '../../../components/UI/RemoveConfirmModal/RemoveConfirmModal';

const Main = () => {
    const todoContext = useContext<TodoContextType>(TodoContext);

    return (
        <>
            <div className={styles.main}>
                <div className={styles.left__block}>
                    <Instruction />
                    <Form />
                    <TodoList />
                </div>
                <div className={styles.right__block}>
                    <Timer />
                </div>
            </div>
            {todoContext.isOpenRemoveModal && <RemoveConfirmModal />}
            
        </>
    )
};

export default Main;