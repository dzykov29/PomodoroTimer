import { FormEvent, useContext, useState } from 'react'
import styles from './SettingModal.module.css'
import { TodoContextType } from '../../../../utils/Todos'
import { TodoContext } from '../../../../Context/TodoProvider'
import Button from '../../Button/Button'
import SettingInput from '../SettingInput/SettingInput'
import addNotification from 'react-push-notification'
import { Switch } from '@mui/material'

const SettingModal = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)
    const mode = todoContext.mode
    const [timeWork, setTimeWork] = useState<number>(
        todoContext.TIME_FOR_WORK / 60
    )
    const [timeBreak, setTimeBreak] = useState<number>(
        todoContext.TIME_FOR_BREAK / 60
    )
    const [timeLongBreak, setTimeLongBreak] = useState<number>(
        todoContext.TIME_FOR_LONG_BREAK / 60
    )
    const [countTomatoForLongBreak, setCountTomatoForLongBreak] =
        useState<number>(todoContext.countTomatoForLongBreak)

    const [mute, setMute] = useState<boolean>(todoContext.mute)

    // Функция для предотвращения закрытия модального окна при клике внутри него
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }
    const pushShow = () => {
        const messageSound = new Audio('./assets/message.mp3')
        addNotification({
            title: 'Ошибка данных',
            message: 'Нужно заполнить все поля!',
            theme: todoContext.mode ? 'light' : 'darkblue',
        })
        messageSound.play()
    }
    
    const handleSaveSettings = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (timeWork && timeBreak && timeLongBreak && countTomatoForLongBreak) {
            todoContext.toggleOpenSetting(false)
            todoContext.setTIME_FOR_WORK(timeWork * 60)
            todoContext.setTIME_FOR_BREAK(timeBreak * 60)
            todoContext.setTIME_FOR_LONG_BREAK(timeLongBreak * 60)
            todoContext.setCountTomatoForLongBreak(countTomatoForLongBreak)
            todoContext.setMute(mute)
            const valueSettings = {
                timeWork: timeWork * 60,
                timeBreak: timeBreak * 60,
                timeLongBreak: timeLongBreak * 60,
                countTomatoForLongBreak: countTomatoForLongBreak,
                mute: mute,
            }
            localStorage.setItem('settings', JSON.stringify(valueSettings))
        } else {
            pushShow()
        }
    }

    return (
        <div
            className={styles.overlay}
            onClick={() => todoContext.toggleOpenSetting(false)}
        >
            <div
                className={
                    todoContext.mode
                        ? styles.settingModal__wrapper_dark
                        : styles.settingModal__wrapper_light
                }
                onClick={handleModalClick}
            >
                <img
                    className={styles.closeButton}
                    src="./assets/closeModal.svg"
                    alt="Закрыть модальное окно"
                    onClick={() => todoContext.toggleOpenSetting(false)}
                />
                <h2 className={styles.modal__title}> Настройки </h2>

                <form
                    className={styles.formSetting}
                    onSubmit={handleSaveSettings}
                >
                    <SettingInput
                        mode={mode}
                        name={'timeWork'}
                        type={'number'}
                        labelText={'Время одной помидорки'}
                        value={timeWork}
                        units={'(мин)'}
                        placeholder={'25'}
                        onChange={(event) =>
                            setTimeWork(parseInt(event.target.value))
                        }
                    />
                    <SettingInput
                        mode={mode}
                        name={'timeBreak'}
                        type={'number'}
                        labelText={'Время короткого перерыва'}
                        value={timeBreak}
                        units={'(мин)'}
                        placeholder={'5'}
                        onChange={(event) =>
                            setTimeBreak(parseInt(event.target.value))
                        }
                    />
                    <SettingInput
                        mode={mode}
                        name={'timeLongBreak'}
                        type={'number'}
                        labelText={'Время длинного перерыва'}
                        value={timeLongBreak}
                        units={'(мин)'}
                        placeholder={'15'}
                        onChange={(event) =>
                            setTimeLongBreak(parseInt(event.target.value))
                        }
                    />
                    <SettingInput
                        mode={mode}
                        name={'countTomatoForLongBreak'}
                        type={'number'}
                        units={'(шт)'}
                        labelText={'Количество томатов для длинного перерыва'}
                        value={countTomatoForLongBreak}
                        placeholder={'4'}
                        onChange={(event) =>
                            setCountTomatoForLongBreak(
                                parseInt(event.target.value)
                            )
                        }
                    />
                    <span>Тихий режим</span>
                    <Switch
                        color="default"
                        checked={mute}
                        onChange={() => setMute(!mute)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <div className={styles.btn__wrapper}>
                        <Button type="submit" className={'btn btn__start'}>
                            Сохранить
                        </Button>
                        <Button
                            type="button"
                            className={
                                mode
                                    ? 'btn btn__exit_dark'
                                    : 'btn btn__exit_light'
                            }
                            onClick={() => todoContext.toggleOpenSetting(false)}
                        >
                            Выйти
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SettingModal
