// App.tsx
import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

// Настраиваем axios глобально (удобно для всех запросов)
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000'; // Адрес вашего FastAPI сервера

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: 'admin' | 'manager';
  } | null>(null);
  const [loginError, setLoginError] = useState<string>(''); // Для ошибок

  // ОБНОВЛЁННАЯ ФУНКЦИЯ ЛОГИНА
  const handleLogin = async (username: string, password: string) => {
    try {
      // 1. Сбрасываем предыдущую ошибку
      setLoginError('');
      
      // 2. Отправляем запрос к вашему эндпоинту /auth/login
      const response = await axios.post('/auth/login', {
        login: username,
        password: password,
      });
      
      // 3. Если успешно (код 200) - сохраняем данные пользователя
      console.log('Успешный вход!', response.data);
      
      setCurrentUser({
        name: response.data.login,
        role: username === 'admin' ? 'admin' : 'manager'
      });
      
      setIsAuthenticated(true);
      
    } catch (error: any) {
      // 4. Обрабатываем ошибки
      console.error('Ошибка входа:', error);
      
      if (error.response) {
        // Сервер ответил с кодом ошибки (401, 500, etc.)
        const message = error.response.data?.detail || 'Ошибка сервера';
        setLoginError(`Ошибка: ${message}`);
      } else if (error.request) {
        // Запрос был сделан, но нет ответа (проблемы сети)
        setLoginError('Нет ответа от сервера. Проверьте подключение.');
      } else {
        // Что-то пошло не так при настройке запроса
        setLoginError('Ошибка при отправке запроса');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginError(''); // Сбрасываем ошибку при выходе
  };

  if (!isAuthenticated) {
    // Передаём ошибку в LoginScreen для отображения
    return <LoginScreen onLogin={handleLogin} loginError={loginError} />;
  }

  return <Dashboard user={currentUser!} onLogout={handleLogout} />;
}