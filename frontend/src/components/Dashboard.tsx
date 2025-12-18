import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import axios from 'axios';
import { 
  Home, 
  Users, 
  FileText, 
  UserCog, 
  BarChart3, 
  Scale, 
  XCircle,
  LogOut,
  Building2,
  TrendingUp,
  DollarSign,
  CheckCircle
} from 'lucide-react';
import PropertiesSection from './PropertiesSection';
import ClientsSection from './ClientsSection';
import DealsSection from './DealsSection';
import EmployeesSection from './EmployeesSection';
import ReportsSection from './ReportsSection';
import RightsAndRestrictionsSection from './RightsAndRestrictionsSection';

interface DashboardProps {
  user: {
    name: string;
    role: string;
  };
  onLogout: () => void;
}

type Section = 'home' | 'properties' | 'clients' | 'deals' | 'employees' | 'reports' | 'rights';

interface RecentDeal {
  client: string;
  property: string;
  amount: number;
}

interface NewProperty {
  address: string;
  type: string;
  price: number;
}

interface DashboardStats {
  total_properties: number;
  total_clients: number;
  active_deals: number;
}

interface DashboardData {
  stats: DashboardStats;
  recent_deals: RecentDeal[];
  new_properties: NewProperty[];
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
   axios.get('/dashboard/')
     .then((response) => setDashboardData(response.data))
     .catch((err) => console.error('Failed to load dashboard data', err));
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  const { stats, recent_deals, new_properties } = dashboardData;

  const menuItems = [
    { id: 'home' as Section, label: 'Главная', icon: Home },
    { id: 'properties' as Section, label: 'Объекты', icon: Building2 },
    { id: 'clients' as Section, label: 'Клиенты', icon: Users },
    { id: 'deals' as Section, label: 'Сделки', icon: FileText },
    { id: 'employees' as Section, label: 'Сотрудники', icon: UserCog },
    { id: 'reports' as Section, label: 'Отчёты', icon: BarChart3 },
    { id: 'rights' as Section, label: 'Права и ограничения', icon: Scale },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-4">
            <h1>Панель управления</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Объекты недвижимости</CardTitle>
                  <Building2 className="h-4 w-4 text-[#1677ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.total_properties}</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Клиенты</CardTitle>
                  <Users className="h-4 w-4 text-[#1677ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.total_clients}</div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Активные сделки</CardTitle>
                  <TrendingUp className="h-4 w-4 text-[#1677ff]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{stats.active_deals}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Последние сделки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recent_deals.map((deal, idx) => (
                      <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="text-sm">{deal.client}</p>
                          <p className="text-xs text-gray-500">{deal.property}</p>
                        </div>
                        <div className="text-sm">₽{deal.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Новые объекты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {new_properties.map((property, idx) => (
                      <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                        <div>
                          <p className="text-sm">{property.address}</p>
                          <p className="text-xs text-gray-500">{property.type}</p>
                        </div>
                        <div className="text-sm">₽{property.price.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'properties':
        return <PropertiesSection userRole={user.role} />;
      case 'clients':
        return <ClientsSection userRole={user.role} />;
      case 'deals':
        return <DealsSection userRole={user.role} />;
      case 'employees':
        return <EmployeesSection userRole={user.role} />;
      case 'reports':
        return <ReportsSection />;
      case 'rights':
        return <RightsAndRestrictionsSection userRole={user.role} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1677ff] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm">{user.name}</div>
              <div className="text-xs text-gray-500">
                {user.role === 'admin' ? 'Администратор' : 'Менеджер'}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="rounded-xl"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-57px)] p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#1677ff] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
