import { useContext } from 'react'
import styles from './Instruction.module.css'
import { TodoContextType } from '../../utils/Todos'
import { TodoContext } from '../../Context/TodoProvider'

const Instruction = () => {
    const { mode } = useContext<TodoContextType>(TodoContext)

    return (
        <div>
            <h2
                className={
                    mode
                        ? styles.instruction__title_dark
                        : styles.instruction__title_light
                }
            >
                Ура! Теперь можно начать работать:
            </h2>
            <ul className={styles.instruction__list}>
                <li
                    className={
                        mode
                            ? styles.instruction__item_dark
                            : styles.instruction__item_light
                    }
                >
                    Выберите категорию и&nbsp;напишите название текущей задачи
                </li>
                <li
                    className={
                        mode
                            ? styles.instruction__item_dark
                            : styles.instruction__item_light
                    }
                >
                    Запустите таймер (&laquo;помидор&raquo;)
                </li>
                <li
                    className={
                        mode
                            ? styles.instruction__item_dark
                            : styles.instruction__item_light
                    }
                >
                    Работайте пока &laquo;помидор&raquo; не&nbsp;прозвонит
                </li>
                <li
                    className={
                        mode
                            ? styles.instruction__item_dark
                            : styles.instruction__item_light
                    }
                >
                    Сделайте короткий перерыв (3-5&nbsp;минут)
                </li>
                <li
                    className={
                        mode
                            ? styles.instruction__item_dark
                            : styles.instruction__item_light
                    }
                >
                    Продолжайте работать &laquo;помидор&raquo;
                    за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будут
                    выполнена. Каждые 4&nbsp;&laquo;помидора&raquo; делайте
                    длинный перерыв (15-30&nbsp;минут).
                </li>
            </ul>
        </div>
    )
}

export default Instruction
