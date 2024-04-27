import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { formatTime } from '../../utils/convertTime'
import styles from './Timer.module.css'
import { TodoContextType } from '../../utils/Todos'
import { TodoContext } from '../../Context/TodoProvider'
import { findFirstUndoneTask } from '../../utils/findFirstUndoneTask'
import ButtonGroup from './ButtonGroup/ButtonGroup'
import addNotification from 'react-push-notification'
import TimerBody from './TimerBody/TimerBody'
import TimerHeader from './TimerHeader/TimerHeader'

const Timer: FC = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)
    const todo = findFirstUndoneTask(todoContext.todos)
    const tomatoCount = todo ? todo.tomatoCount : 0
    const taskName = todo ? todo.text : 'Задач нет'
    const currentTomato = todo ? todo.currentTomato : 1
    const TIME_FOR_WORK = todoContext.TIME_FOR_WORK
    const TIME_FOR_BREAK = todoContext.TIME_FOR_BREAK
    const TIME_FOR_LONG_BREAK = todoContext.TIME_FOR_LONG_BREAK
    const countTomatoForLongBreak = todoContext.countTomatoForLongBreak
    const mute = todoContext.mute

    const [time, setTime] = useState<number>(TIME_FOR_WORK)
    const [timeToPaused, setTimeToPaused] = useState<number>(0)
    const [timeToWork, setTimeToWork] = useState<number>(0)
    const [work, setWork] = useState<boolean>(false)
    const [emptyData, setEmptyData] = useState<boolean>(true)
    const [isBreak, setIsBreak] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const [stopDisabled, setStopDisabled] = useState<boolean>(true)
    const [addTimeDisabled, setAddTimeDisabled] = useState<boolean>(false)
    const [pausedCount, setPausedCount] = useState<number>(0)
    const [timeVisible, setTimeVisible] = useState<boolean>(false)

    const pushShow = useCallback(
        (text: string, subtitle: string) => {
            const messageSound = new Audio('./assets/message.mp3')
            addNotification({
                title: 'Время вышло!',
                subtitle: subtitle,
                message: text,
                theme: todoContext.mode ? 'light' : 'darkblue',
            })
            !mute && messageSound.play()
        },
        [mute, todoContext]
    )

    //Старт работы над задачей
    const handleStartWork = () => {
        setWork(true)
        setIsBreak(false)
        setPaused(false)
        setTime(TIME_FOR_WORK) // Устанавливаем время работы
    }

    //Старт перерыва между помидорами
    const handleStartBreak = () => {
        setWork(false)
        setIsBreak(true)
        setPaused(false)
        setTime(TIME_FOR_BREAK) // Устанавливаем время перерыва
    }

    const handlePaused = () => {
        setPaused(true)
        setPausedCount((prev) => prev + 1)
        setTimeVisible(false)
    }

    //сброс в начальное состояние
    const handleStopTimer = useCallback(() => {
        setStopDisabled(true)
        setAddTimeDisabled(false)
        setWork(false)
        setIsBreak(false)
        setPaused(false)
        setTimeVisible(false)
        setTime(TIME_FOR_WORK) // Reset the timer to work time
    }, [
        setStopDisabled,
        setAddTimeDisabled,
        setWork,
        setIsBreak,
        setPaused,
        setTimeVisible,
        setTime,
        TIME_FOR_WORK,
    ])

    //Добавить минуту в таймер
    const handleAddTimer = () => {
        setTime((prev) => prev + 60)
    }

    //Закончить помидор, перейти к следующему начальному состоянию
    const handleComplete = () => {
        pushShow('Время работы закончено', 'Сделайте перерыв')
        if (todo && currentTomato <= tomatoCount) {
            handleStopTimer()
            setWork(false)
            setIsBreak(true)
            setPaused(true)
            setTimeVisible(false)
            // Устанавливаем время перерыва
            if (currentTomato % countTomatoForLongBreak === 0) {
                setTime(TIME_FOR_LONG_BREAK)
            } else {
                setTime(TIME_FOR_BREAK)
            }
            todoContext.setCompleteTomato(todo)
        }
    }

    //Пропустить перерыв и перейти к начальному состоянию следующего помидора
    const handleSkipBreak = () => {
        setIsBreak(false)
        setPaused(false)
        setStopDisabled(true)
        setAddTimeDisabled(false)
        setTime(TIME_FOR_WORK)
        setTimeVisible(false)
        pushShow('Перерыв окончен', 'Пора работать')
        if (todo && currentTomato > tomatoCount) {
            handleStopTimer()
            todoContext.setDoneTask(todo, timeToPaused, pausedCount, timeToWork)
        }
    }

    useEffect(() => {
        if (todoContext === null || todo === null) {
            setEmptyData(true)
            setAddTimeDisabled(true)
        } else {
            setEmptyData(false)
            setAddTimeDisabled(false)
        }

        if (!isBreak) {
            setTime(TIME_FOR_WORK)
        } // Устанавливаем время перерыва
        else if (!work && currentTomato % countTomatoForLongBreak === 0) {
            setTime(TIME_FOR_LONG_BREAK)
        } else if (!work) {
            setTime(TIME_FOR_BREAK)
        }
    }, [
        todoContext,
        todo,
        work,
        isBreak,
        currentTomato,
        TIME_FOR_WORK,
        TIME_FOR_LONG_BREAK,
        TIME_FOR_BREAK,
        countTomatoForLongBreak,
    ])

    useEffect(() => {
        let timerInterval: number
        let timerToPaused: number

        if (todo) {
            if (
                (work || isBreak) &&
                !paused &&
                currentTomato <= tomatoCount + 1
            ) {
                setAddTimeDisabled(true)
                setStopDisabled(false)
                setTimeVisible(true)
                timerInterval = setInterval(() => {
                    setTime((prev) => (prev > 0 ? prev - 1 : 0))
                    setTimeToWork((prev) => prev + 1)
                }, 1000)
            }
            if (paused) {
                timerToPaused = setInterval(() => {
                    setTimeToPaused((prev) => prev + 1)
                }, 1000)
            }

            if (time === 0) {
                setTimeVisible(false)
                setPaused(true) // При достижении 0 времени останавливаем таймер
                if (work) {
                    setWork(false)
                    setIsBreak(true)
                    setAddTimeDisabled(false)
                    pushShow('Время работы закончено', 'Сделайте перерыв')
                    // Устанавливаем время перерыва
                    if (currentTomato % countTomatoForLongBreak === 0) {
                        setTime(TIME_FOR_LONG_BREAK)
                    } else {
                        setTime(TIME_FOR_BREAK)
                    }
                    todoContext.setCompleteTomato(todo)
                } else if (isBreak) {
                    setWork(true)
                    setIsBreak(false)
                    setAddTimeDisabled(false)
                    pushShow('Перерыв окончен', 'Пора работать')
                    setTime(TIME_FOR_WORK) // Устанавливаем время работы
                }
            }
            if (currentTomato > tomatoCount && work) {
                handleStopTimer()
                todoContext.setDoneTask(
                    todo,
                    timeToPaused,
                    pausedCount,
                    timeToWork
                )
            }
        }

        return () => {
            clearInterval(timerInterval) // Возвращаем функцию для очистки интервала при размонтировании компонента
            clearInterval(timerToPaused)
        }
    }, [
        work,
        isBreak,
        paused,
        time,
        currentTomato,
        todo,
        todoContext,
        tomatoCount,
        timeToPaused,
        pausedCount,
        timeToWork,
        timeVisible,
        TIME_FOR_LONG_BREAK,
        TIME_FOR_BREAK,
        TIME_FOR_WORK,
        handleStopTimer,
        countTomatoForLongBreak,
        mute,
        pushShow,
    ])

    return (
        <div
            className={
                todoContext.mode
                    ? styles.timerContainer_dark
                    : styles.timerContainer_light
            }
        >
            <TimerHeader
                taskName={taskName}
                currentTomato={currentTomato}
                isBreak={isBreak}
                work={work}
            />
            <TimerBody
                time={time}
                formatTime={formatTime}
                handleAddTimer={handleAddTimer}
                addTimeDisabled={addTimeDisabled}
                timeVisible={timeVisible}
                mode={todoContext.mode}
            />

            <ButtonGroup
                work={work}
                isBreak={isBreak}
                paused={paused}
                emptyData={emptyData}
                setPaused={setPaused}
                handleComplete={handleComplete}
                handlePaused={handlePaused}
                handleSkipBreak={handleSkipBreak}
                handleStartBreak={handleStartBreak}
                handleStartWork={handleStartWork}
                handleStopTimer={handleStopTimer}
                stopDisabled={stopDisabled}
            />
        </div>
    )
}

export default Timer
