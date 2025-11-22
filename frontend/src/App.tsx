import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: 'admin' | 'manager';
  } | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Mock authentication
    if (username && password) {
      setCurrentUser({
        name: username === 'admin' ? 'Администратор' : 'Менеджер',
        role: username === 'admin' ? 'admin' : 'manager'
      });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard user={currentUser!} onLogout={handleLogout} />;
}
