// TimerBody.tsx
import React from 'react'
import styles from '../Timer.module.css'
import Button from '../../UI/Button/Button'

interface TimerBodyProps {
    time: number
    formatTime: (time: number) => string
    handleAddTimer: () => void
    addTimeDisabled: boolean
    mode: boolean
    timeVisible: boolean
}

const TimerBody: React.FC<TimerBodyProps> = ({
    time,
    formatTime,
    handleAddTimer,
    addTimeDisabled,
    mode,
    timeVisible,
}) => (
    <div className={styles.timer__body}>
        <span
            className={`${mode ? styles.clock_dark : styles.clock_light} ${
                timeVisible ? styles.show : ''
            }`}
        >
            {formatTime(time)}
        </span>
        <Button
            type="button"
            className="btn btn__add-time"
            onClick={handleAddTimer}
            disabled={addTimeDisabled}
        >
            <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="25" cy="25" r="25" fill="#A8B64F" />
                <path
                    d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
                    fill="white"
                />
            </svg>
        </Button>
    </div>
)

export default TimerBody
