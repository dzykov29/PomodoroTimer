// TimerHeader.tsx
import React from 'react'
import styles from '../Timer.module.css'

interface TimerHeaderProps {
    taskName: string
    currentTomato: number
    isBreak: boolean
    work: boolean
}

const TimerHeader: React.FC<TimerHeaderProps> = ({
    taskName,
    currentTomato,
    isBreak,
    work,
}) => (
    <div
        className={styles.timer__header}
        style={
            work
                ? { backgroundColor: '#DC3E22' }
                : isBreak
                ? { backgroundColor: '#A8B64F' }
                : { backgroundColor: '#C4C4C4' }
        }
    >
        <span>{taskName}</span>
        {isBreak ? (
            <span>Помидор&nbsp;{currentTomato - 1}</span>
        ) : (
            <span>Помидор&nbsp;{currentTomato}</span>
        )}
    </div>
)

export default TimerHeader
