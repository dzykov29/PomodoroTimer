import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TodoProvider } from './Context/TodoProvider.tsx'
import { Notifications } from 'react-push-notification'

// Функция для рендеринга приложения
const renderApp = () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <BrowserRouter>
            <TodoProvider>
                <Notifications position={'bottom-right'} />
                <App />
            </TodoProvider>
        </BrowserRouter>
    )
}

// Рендерим приложение
renderApp()


