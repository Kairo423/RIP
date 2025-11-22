import React from 'react';
import { Building2, Home, Users, FileText, UserCog, BarChart3, Scale, AlertOctagon, LogOut, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
  username: string;
  role: 'admin' | 'manager';
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Главная', icon: Home },
  { id: 'properties', label: 'Объекты', icon: Building2 },
  { id: 'clients', label: 'Клиенты', icon: Users },
  { id: 'deals', label: 'Сделки', icon: FileText },
  { id: 'employees', label: 'Сотрудники', icon: UserCog },
  { id: 'reports', label: 'Отчёты', icon: BarChart3 },
  { id: 'rights', label: 'Права собственности', icon: Scale },
  { id: 'restrictions', label: 'Ограничения', icon: AlertOctagon },
];

function Sidebar({ currentSection, onSectionChange }: { currentSection: string; onSectionChange: (section: string) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1677ff] flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-foreground">EstatePanel</h2>
            <p className="text-muted-foreground">Управление</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-[#1677ff] text-white'
                  : 'text-foreground hover:bg-accent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export function DashboardLayout({
  children,
  currentSection,
  onSectionChange,
  username,
  role,
  onLogout,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-md">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar currentSection={currentSection} onSectionChange={onSectionChange} />
            </SheetContent>
          </Sheet>
          <h1 className="text-foreground">
            {menuItems.find(item => item.id === currentSection)?.label || 'Главная'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-foreground">{username}</div>
            <Badge variant="secondary" className="rounded-md">
              {role === 'admin' ? 'Администратор' : 'Менеджер'}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onLogout}
            className="rounded-md"
            title="Выйти"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - desktop */}
        <div className="hidden lg:block w-64 bg-white border-r">
          <Sidebar currentSection={currentSection} onSectionChange={onSectionChange} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
