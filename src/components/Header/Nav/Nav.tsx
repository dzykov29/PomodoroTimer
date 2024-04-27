import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import { Switch } from '@mui/material'
import { useContext } from 'react'
import { TodoContext } from '../../../Context/TodoProvider'
import { TodoContextType } from '../../../utils/Todos'

const Nav = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)
    const mode = todoContext.mode

    return (
        <nav className={mode ? styles.nav_dark : styles.nav_light}>
            <NavLink to={'/'}>
                <img src="./assets/logo.png" />
            </NavLink>
            <div className={styles.rightBlock}>
                <NavLink className={styles.navLink} to={'/statistic'}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z"
                                fill="#DC3E22"
                            />
                        </g>
                    </svg>
                    Статистика
                </NavLink>
                <button
                    className={styles.btn__setting}
                    onClick={() => todoContext.toggleOpenSetting(true)}
                >
                    <img
                        className={styles.setting__icon}
                        src="./assets/setting.png"
                    />
                </button>
                <Switch
                    color="default"
                    checked={todoContext.mode}
                    onChange={todoContext.toggleTheme}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </nav>
    )
}

export default Nav
