export type Todo = {
    id: number
    text: string
    done: boolean
    currentTomato: number
    tomatoCount: number
    timeToPaused: number
    timeToWork: number
    pausedCount: number
    dateEnd: Date | null
}

export type TodoContextType = {
    todos: Todo[]
    isOpenRemoveModal: boolean
    selectedOptionsWeek: number
    barNumber: number
    mode: boolean
    TIME_FOR_WORK: number
    TIME_FOR_BREAK: number
    TIME_FOR_LONG_BREAK: number
    isOpenSetting: boolean
    countTomatoForLongBreak: number
    mute: boolean
    setMute: (mute: boolean) => void
    setCountTomatoForLongBreak: (count: number) => void
    toggleOpenSetting: (isOpenSetting: boolean) => void
    setTIME_FOR_WORK: (time: number) => void
    setTIME_FOR_BREAK: (time: number) => void
    setTIME_FOR_LONG_BREAK: (time: number) => void
    toggleOpenRemoveModal: (
        isOpenRemoveModal: boolean,
        id: number | null
    ) => void
    setSelectedOptionsWeek: (count: number) => void
    saveTodo: (todo: Todo) => void
    updateTodo: (updatedTodo: Todo, strim: boolean) => void
    editTextTodo: (todo: Todo) => void
    setDoneTask: (
        todo: Todo,
        timeToPaused: number,
        pausedCount: number,
        timeToWork: number
    ) => void
    setCompleteTomato: (todo: Todo) => void
    removeTodo: () => void
    setDayNumber: (clickedBarIndex: number) => void
    toggleTheme: () => void
}
