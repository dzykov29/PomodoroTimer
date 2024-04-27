import { FC, ReactNode, createContext, useState } from 'react'
import { Todo, TodoContextType } from '../utils/Todos'
import { useMediaQuery } from '@mui/material'

export const TodoContext = createContext<TodoContextType>(null!)

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const currentDay = new Date().getDay()
    const savedTodos = localStorage.getItem('todos')
    const savedSettings = localStorage.getItem('settings') !== null ? JSON.parse(localStorage.getItem('settings')!) : null

    const [todos, setTodos] = useState<Todo[]>(
        savedTodos !== null ? JSON.parse(savedTodos) : []
    )
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(false)
    const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false)
    const [TIME_FOR_WORK, setTIME_FOR_WORK] = useState<number>(savedSettings !== null ? savedSettings.timeWork : 1500)
    const [TIME_FOR_BREAK, setTIME_FOR_BREAK] = useState<number>(savedSettings !== null ? savedSettings.timeBreak : 180)
    const [TIME_FOR_LONG_BREAK, setTIME_FOR_LONG_BREAK] =
        useState<number>(savedSettings !== null ? savedSettings.timeLongBreak : 900)
    const [countTomatoForLongBreak, setCountTomatoForLongBreak] =
        useState<number>(savedSettings !== null ? savedSettings.countTomatoForLongBreak : 4)
    const [mute, setMute] = useState<boolean>(savedSettings !== null ? savedSettings.mute : false)
    const [removeId, setRemoveId] = useState<number | null>(null)
    const [selectedOptionsWeek, setSelectedOptionsWeek] = useState<number>(0)
    const [barNumber, setBarNumber] = useState<number>(
        currentDay === 0 ? 6 : currentDay - 1
    )
    // Получение предпочитаемой темы из localStorage, если она доступна
    const savedMode = localStorage.getItem('mode')
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    // Использование сохраненного значения или значения по умолчанию
    const [mode, setMode] = useState<boolean>(
        savedMode !== null ? JSON.parse(savedMode) : prefersDarkMode
    )

    const saveTodo = (todo: Todo) => {
        setTodos((prevTodos) => {
            const newTodos = [...prevTodos, todo]
            localStorage.setItem('todos', JSON.stringify(newTodos))
            return newTodos
        })
    }

    const toggleTheme = () => {
        setMode(!mode)
        localStorage.setItem('mode', JSON.stringify(!mode))
    }

    const toggleOpenRemoveModal = (
        isOpenRemoveModal: boolean,
        id: number | null
    ) => {
        setIsOpenRemoveModal(isOpenRemoveModal)
        setRemoveId(id)
    }

    const toggleOpenSetting = (isOpenSetting: boolean) => {
        setIsOpenSetting(isOpenSetting)
    }

    const removeTodo = () => {
        const removedTodo = todos.filter((todo) => todo.id !== removeId)
        setTodos(() => {
            const newTodos = removedTodo
            localStorage.setItem('todos', JSON.stringify(newTodos))
            return newTodos
        })
        setIsOpenRemoveModal(false)
        setRemoveId(null)
    }

    const updateTodo = (updatedTodo: Todo, strim: boolean) => {
        const increment = strim ? 1 : -1
        const updatedTodos = todos.map((todo) =>
            todo.id === updatedTodo.id
                ? { ...todo, tomatoCount: todo.tomatoCount + increment }
                : todo
        )
        setTodos(() => {
            const newTodos = updatedTodos
            localStorage.setItem('todos', JSON.stringify(newTodos))
            return newTodos
        })
    }

    const editTextTodo = (editTextTodo: Todo) => {
        const editedTodos = todos.map((todo) =>
            todo.id === editTextTodo.id
                ? { ...todo, text: editTextTodo.text }
                : todo
        )

        setTodos(() => {
            const newTodos = editedTodos
            localStorage.setItem('todos', JSON.stringify(newTodos))
            return newTodos
        })
    }

    const setCompleteTomato = (completeTomato: Todo) => {
        const doneTodo = todos.map((todo) =>
            todo.id === completeTomato.id
                ? { ...todo, currentTomato: completeTomato.currentTomato + 1 }
                : todo
        )

        setTodos(() => {
            const newTodos = doneTodo
            localStorage.setItem('todos', JSON.stringify(newTodos))
            return newTodos
        })
    }

    const setDoneTask = (
        completeTodo: Todo,
        timeToPaused: number,
        pausedCount: number,
        timeToWork: number
    ) => {
        const doneTodo = todos.map((todo) =>
            todo.id === completeTodo.id
                ? {
                      ...todo,
                      currentTomato: completeTodo.currentTomato - 1,
                      done: true,
                      dateEnd: new Date(),
                      timeToPaused: timeToPaused,
                      pausedCount: pausedCount,
                      timeToWork: timeToWork,
                  }
                : todo
        )

        setTodos(() => {
            const newTodos = doneTodo
            localStorage.setItem('todos', JSON.stringify(newTodos))
            return newTodos
        })
    }

    const setDayNumber = (clickedBarIndex: number) => {
        setBarNumber(clickedBarIndex)
    }

    return (
        <TodoContext.Provider
            value={{
                todos,
                isOpenRemoveModal,
                selectedOptionsWeek,
                barNumber,
                mode,
                TIME_FOR_WORK,
                TIME_FOR_BREAK,
                TIME_FOR_LONG_BREAK,
                isOpenSetting,
                countTomatoForLongBreak,
                mute,
                setMute,
                setCountTomatoForLongBreak,
                toggleOpenSetting,
                setTIME_FOR_WORK,
                setTIME_FOR_BREAK,
                setTIME_FOR_LONG_BREAK,
                toggleOpenRemoveModal,
                saveTodo,
                updateTodo,
                editTextTodo,
                setDoneTask,
                setCompleteTomato,
                removeTodo,
                setSelectedOptionsWeek,
                setDayNumber,
                toggleTheme,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
