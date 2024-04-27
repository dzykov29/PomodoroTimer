import { FC } from 'react'
import Button from '../../UI/Button/Button'

interface ButtonGroupProps {
    work: boolean
    isBreak: boolean
    emptyData: boolean
    paused: boolean
    setPaused: (paused: boolean) => void
    handleStartBreak: () => void
    handleStartWork: () => void
    handlePaused: () => void
    stopDisabled: boolean
    handleStopTimer: () => void
    handleComplete: () => void
    handleSkipBreak: () => void
}

const ButtonGroup: FC<ButtonGroupProps> = ({
    work,
    isBreak,
    paused,
    emptyData,
    setPaused,
    handleComplete,
    handlePaused,
    handleSkipBreak,
    handleStartBreak,
    handleStartWork,
    handleStopTimer,
    stopDisabled,
}) => {
    return (
        <div className="button__wrapper">
            {!work && !isBreak && !paused && (
                <Button
                    type="button"
                    className="btn btn__start"
                    onClick={work ? handleStartBreak : handleStartWork}
                    disabled={emptyData}
                >
                    Старт
                </Button>
            )}
            {(work || isBreak) && !paused && (
                <Button
                    type="button"
                    className="btn btn__start"
                    onClick={handlePaused}
                >
                    Пауза
                </Button>
            )}
            {!paused && !isBreak && (
                <Button
                    type="button"
                    className="btn btn__stop"
                    onClick={handleStopTimer}
                    disabled={stopDisabled}
                >
                    Стоп
                </Button>
            )}
            {paused && (
                <Button
                    type="button"
                    className="btn btn__start"
                    onClick={() => setPaused(false)}
                >
                    Продолжить
                </Button>
            )}
            {paused && !isBreak && (
                <Button
                    type="button"
                    className="btn btn__complete"
                    onClick={handleComplete}
                >
                    Сделано
                </Button>
            )}
            {isBreak && (
                <Button
                    type="button"
                    className="btn btn__complete"
                    onClick={handleSkipBreak}
                >
                    Пропустить
                </Button>
            )}
        </div>
    )
}

export default ButtonGroup
