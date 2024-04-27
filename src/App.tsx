import { Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './App.css'
import { TodoContext } from './Context/TodoProvider'
import Header from './components/Header/Header'
import Main from './pages/Home/Main/Main'
import Statistic from './pages/Statistic/Statistic'
import { Paper } from '@mui/material'
import { useContext, useEffect } from 'react'
import { TodoContextType } from './utils/Todos'
import SettingModal from './components/UI/SettingsGroup/SettingModal/SettingModal'

function App() {
    const todoContext = useContext<TodoContextType>(TodoContext)

    const mode = todoContext.mode
    
    const appTheme = createTheme({
        palette: {
            mode: mode ? 'dark' : 'light',
            background: {
                paper: mode ? '#333' : '#fff',
            },
        },
    })
    
    useEffect(() => {
        const body = document.querySelector('body')
        if (body) {
            body.style.setProperty(
                '--body-background-color',
                mode ? '#333' : '#fff'
            )
        }
    }, [mode])
    
    return (
        <ThemeProvider theme={appTheme}>
            <Paper
                elevation={0}
                sx={{ height: '100vh' }}
                className={mode ? 'dark-background' : 'light-background'}
                square
            >
                <Header />
                <Routes>
                    <Route path={'/'} element={<Main />} />
                    <Route path={'/statistic'} element={<Statistic />} />
                </Routes>
                {todoContext.isOpenSetting && <SettingModal />}
            </Paper>
        </ThemeProvider>
    )
}

export default App
