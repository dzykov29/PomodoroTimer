import { useContext, useEffect, useRef, useState } from 'react'
import { TodoContextType } from '../../../utils/Todos'
import { TodoContext } from '../../../Context/TodoProvider'
import './Select.css'

const Select = () => {
    const { setSelectedOptionsWeek } = useContext<TodoContextType>(TodoContext)
    const [choosedWeek, setChoosedWeek] = useState<string>('Эта неделя')
    const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null)
    const { mode } = useContext<TodoContextType>(TodoContext)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setSelectIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [selectRef])

    useEffect(() => {
        setSelectIsOpen(false)

        switch (choosedWeek) {
            case 'Эта неделя':
                setSelectedOptionsWeek(0)
                break
            case 'Прошедшая неделя':
                setSelectedOptionsWeek(-1)
                break
            case '2 недели назад':
                setSelectedOptionsWeek(-2)
                break
            default:
                setSelectedOptionsWeek(0)
        }
    }, [choosedWeek, setSelectedOptionsWeek])

    return (
        <div
            className={
                mode
                    ? 'selectWrapper_dark forbidUserSelect'
                    : 'selectWrapper_light forbidUserSelect'
            }
            ref={selectRef}
        >
            <div
                className="selectValueWrapper"
                id="selectValueWrapper"
                onClick={() => setSelectIsOpen(!selectIsOpen)}
            >
                <div className="selectValue" id="selectValue">
                    {choosedWeek}
                </div>
                <div
                    className={
                        selectIsOpen
                            ? 'selectArrow selectArrowActive'
                            : 'selectArrow'
                    }
                    id="selectArrow"
                >
                    <img
                        src="./assets/arrowSelect.svg"
                        alt=""
                        className="selectArrowImg"
                    />
                </div>
            </div>

            <div
                className={
                    selectIsOpen
                        ? 'selectListWrapper'
                        : 'selectListWrapper displayNone'
                }
                id="selectListWrapper"
            >
                <div
                    className={mode ? 'selectList_dark' : 'selectList_light'}
                    id="selectList"
                >
                    <div
                        className={
                            choosedWeek === 'Эта неделя'
                                ? 'selectListElem displayNone'
                                : 'selectListElem'
                        }
                        onClick={() => setChoosedWeek('Эта неделя')}
                    >
                        Эта неделя
                    </div>
                    <div
                        className={
                            choosedWeek === 'Прошедшая неделя'
                                ? 'selectListElem displayNone'
                                : 'selectListElem'
                        }
                        onClick={() => setChoosedWeek('Прошедшая неделя')}
                    >
                        Прошедшая неделя
                    </div>
                    <div
                        className={
                            choosedWeek === '2 недели назад'
                                ? 'selectListElem displayNone'
                                : 'selectListElem'
                        }
                        onClick={() => setChoosedWeek('2 недели назад')}
                    >
                        2 недели назад
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Select
