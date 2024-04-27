import { useContext } from 'react'
import { getNameDayOfWeek } from '../../utils/getDayOfWeek'
import styles from './Statistic.module.css'
import { TodoContextType } from '../../utils/Todos'
import { TodoContext } from '../../Context/TodoProvider'
import MyChart from '../../components/UI/Chart/Chart'
import { getDateForDayOfWeek } from '../../utils/findDoneTasks'
import { convertSecondsToHoursMinutesSeconds } from '../../utils/convertTime'
import { correctName } from '../../utils/correctNamedTomato'
import Select from '../../components/UI/Select/Select'
import { determineTimeSize } from '../../utils/correctNamedTimeWork'
import { calculateFocus } from '../../utils/CalculateFocus'

const Statistic = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)
    const { mode } = useContext<TodoContextType>(TodoContext)
    const dayData = getDateForDayOfWeek(
        todoContext.todos,
        todoContext.selectedOptionsWeek,
        todoContext.barNumber
    )

    // Проходимся по массиву dayData и суммируем значения tomatoCount и pausedTime
    const {
        totalTomatoCount,
        totalPausedTimeInSeconds,
        totalpausedCount,
        totalWorkTime,
    } = dayData.reduce(
        (accumulator, todo) => {
            accumulator.totalTomatoCount += todo.tomatoCount
            accumulator.totalPausedTimeInSeconds += todo.timeToPaused
            accumulator.totalpausedCount += todo.pausedCount
            accumulator.totalWorkTime += todo.timeToWork
            return accumulator
        },
        {
            totalTomatoCount: 0,
            totalPausedTimeInSeconds: 0,
            totalpausedCount: 0,
            totalWorkTime: 0,
        }
    )
    // Преобразуем сумму времени пауз из секунд в часы, минуты и секунды
    const totalPausedTime = convertSecondsToHoursMinutesSeconds(
        totalPausedTimeInSeconds
    )

    const today = getNameDayOfWeek(
        todoContext.barNumber === 6 ? 0 : todoContext.barNumber + 1
    )

    const focus = calculateFocus(totalWorkTime, totalPausedTimeInSeconds)
    const correctNameTomato = correctName(totalTomatoCount)

    return (
        <div className={styles.statistic__page}>
            <div className={styles.title__wrapper}>
                <h2 className={mode ? styles.title_dark : styles.title_light}>
                    Ваша активность
                </h2>
                <Select />
            </div>
            <div className={styles.data__wrapper}>
                <div className={styles.left__block}>
                    <div
                        className={
                            mode ? styles.today_dark : styles.today_light
                        }
                    >
                        <h2
                            className={
                                mode ? styles.title_dark : styles.title_light
                            }
                        >
                            {today}
                        </h2>
                        {totalWorkTime !== 0 ? (
                            <p className={styles.timeWork__descr}>
                                Вы работали над задачами в течение{' '}
                                <span className={styles.timeWork__text}>
                                    {determineTimeSize(totalWorkTime)}
                                </span>
                            </p>
                        ) : (
                            <p>Нет данных</p>
                        )}
                    </div>
                    <div
                        className={
                            mode ? styles.tomato_dark : styles.tomato_light
                        }
                    >
                        <div className={styles.tomato__countWrapper}>
                            {totalTomatoCount > 0 ? (
                                <img src="./assets/tomato1.png" />
                            ) : (
                                <img src="./assets/tomato.png" />
                            )}
                            {totalTomatoCount > 0 && (
                                <span
                                    className={
                                        mode
                                            ? styles.tomato__count_dark
                                            : styles.tomato__count_light
                                    }
                                >
                                    x{totalTomatoCount}
                                </span>
                            )}
                        </div>
                        {totalTomatoCount > 0 && (
                            <p className={styles.tomato__countDescr}>
                                {totalTomatoCount} {correctNameTomato}
                            </p>
                        )}
                    </div>
                </div>
                <div
                    className={
                        mode ? styles.diagram_dark : styles.diagram_light
                    }
                >
                    <MyChart />
                </div>
                <div
                    className={
                        totalWorkTime !== 0
                            ? styles.focus
                            : mode
                            ? styles.focus_empty_dark
                            : styles.focus_empty_light
                    }
                >
                    <div className={styles.focus__left}>
                        <h2
                            className={
                                totalWorkTime !== 0
                                    ? styles.title_light
                                    : mode
                                    ? styles.title_dark
                                    : styles.title_light
                            }
                        >
                            Фокус
                        </h2>
                        {focus ? (
                            <span className={styles.focus__descr_light}>
                                {focus}%
                            </span>
                        ) : (
                            <span
                                className={
                                    mode
                                        ? styles.focus__descr_dark
                                        : styles.focus__descr_light
                                }
                            >
                                0%
                            </span>
                        )}
                    </div>
                    {totalWorkTime !== 0 ? (
                        <img src="./assets/focus.svg" />
                    ) : (
                        <img src="./assets/focusEmpty.svg" />
                    )}
                </div>
                <div
                    className={
                        totalWorkTime !== 0
                            ? styles.paused
                            : mode
                            ? styles.paused_empty_dark
                            : styles.paused_empty_light
                    }
                >
                    <div className={styles.paused__left}>
                        <h2
                            className={
                                totalWorkTime !== 0
                                    ? styles.title_light
                                    : mode
                                    ? styles.title_dark
                                    : styles.title_light
                            }
                        >
                            Время на паузе
                        </h2>
                        {totalWorkTime !== 0 ? (
                            <span className={styles.paused__descr_light}>
                                {totalPausedTime}
                            </span>
                        ) : (
                            <span
                                className={
                                    mode
                                        ? styles.paused__descr_dark
                                        : styles.paused__descr_light
                                }
                            >
                                {totalPausedTime}
                            </span>
                        )}
                    </div>
                    {totalWorkTime !== 0 ? (
                        <img src="./assets/time.svg" />
                    ) : (
                        <img src="./assets/timeEmpty.svg" />
                    )}
                </div>
                <div
                    className={
                        totalWorkTime !== 0
                            ? styles.reststop
                            : mode
                            ? styles.reststop_empty_dark
                            : styles.reststop_empty_light
                    }
                >
                    <div className={styles.reststop__left}>
                        <h2
                            className={
                                totalWorkTime !== 0
                                    ? styles.title_light
                                    : mode
                                    ? styles.title_dark
                                    : styles.title_light
                            }
                        >
                            Остановки
                        </h2>

                        {totalWorkTime !== 0 ? (
                            <span className={styles.reststop__descr_light}>
                                {totalpausedCount}
                            </span>
                        ) : (
                            <span
                                className={
                                    mode
                                        ? styles.reststop__descr_dark
                                        : styles.reststop__descr_light
                                }
                            >
                                {totalpausedCount}
                            </span>
                        )}
                    </div>
                    {totalWorkTime !== 0 ? (
                        <img src="./assets/pause.svg" />
                    ) : (
                        <img src="./assets/pauseEmpty.svg" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Statistic
