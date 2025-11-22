import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, role: 'admin' | 'manager') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Простая демо-логика: admin/admin = администратор, иначе менеджер
    const role = username === 'admin' && password === 'admin' ? 'admin' : 'manager';
    onLogin(username || 'Пользователь', role);
  };

  if (showRegister) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1677ff] flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <CardTitle className="text-center">Регистрация сотрудника</CardTitle>
            <CardDescription className="text-center">
              Только для администраторов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowRegister(false); }}>
              <div className="space-y-2">
                <Label htmlFor="reg-fullname">ФИО</Label>
                <Input id="reg-fullname" placeholder="Иванов Иван Иванович" className="rounded-md" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-username">Логин</Label>
                <Input id="reg-username" placeholder="ivanov" className="rounded-md" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Пароль</Label>
                <Input id="reg-password" type="password" placeholder="••••••••" className="rounded-md" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-role">Должность</Label>
                <Input id="reg-role" placeholder="Менеджер по продажам" className="rounded-md" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1 rounded-md bg-[#1677ff] hover:bg-[#1677ff]/90">
                  Зарегистрировать
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 rounded-md"
                  onClick={() => setShowRegister(false)}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-[#1677ff] flex items-center justify-center">
              <Building2 className="w-9 h-9 text-white" />
            </div>
          </div>
          <CardTitle className="text-center">Панель управления</CardTitle>
          <CardDescription className="text-center">
            Агентство недвижимости
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                className="rounded-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="rounded-md"
              />
            </div>
            <Button type="submit" className="w-full rounded-md bg-[#1677ff] hover:bg-[#1677ff]/90">
              Войти
            </Button>
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="w-full text-center text-[#1677ff] hover:underline"
            >
              Регистрация нового сотрудника
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
