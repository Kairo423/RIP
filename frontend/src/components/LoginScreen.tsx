// LoginScreen.tsx
import { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, Loader2 } from 'lucide-react'; // Добавили Loader2 для индикатора

interface LoginScreenProps {
  onLogin: (username: string, password: string) => Promise<void>; // Теперь async!
  loginError?: string; // Новая пропса для ошибки
}

export default function LoginScreen({ onLogin, loginError }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация полей
    if (!username.trim() || !password.trim()) {
      return; // Кнопка disabled не даст отправить пустую форму
    }
    
    setIsLoading(true); // Включаем индикатор
    
    try {
      await onLogin(username, password); // Ждём завершения запроса
    } finally {
      setIsLoading(false); // Выключаем индикатор в любом случае
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-[#1677ff] flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>Агентство недвижимости</CardTitle>
          <p className="text-sm text-gray-500">Войдите в систему</p>
        </CardHeader>
        <CardContent>
          {/* Блок для отображения ошибок */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-xl"
                required
                disabled={isLoading} // Блокируем при загрузке
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
                required
                disabled={isLoading} // Блокируем при загрузке
              />
            </div>
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-[#1677ff] hover:bg-[#1366d6]"
              disabled={isLoading} // Блокируем кнопку при загрузке
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </Button>
            <div className="text-center">
              <a href="#" className="text-sm text-[#1677ff] hover:underline">
                Регистрация нового сотрудника
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}