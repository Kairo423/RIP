import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Building2, Users, FileText, TrendingUp } from 'lucide-react';

export function DashboardHome() {
  const stats = [
    { label: 'Объекты недвижимости', value: '247', icon: Building2, color: 'bg-blue-500' },
    { label: 'Клиенты', value: '1,823', icon: Users, color: 'bg-green-500' },
    { label: 'Активные сделки', value: '34', icon: FileText, color: 'bg-orange-500' },
    { label: 'Доход за месяц', value: '₽12.4M', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Добро пожаловать!</h2>
        <p className="text-muted-foreground">Обзор текущей деятельности</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground">{stat.label}</CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Последние объекты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Квартира', address: 'ул. Ленина, 45', price: '₽8.5M' },
                { type: 'Дом', address: 'пр. Победы, 12', price: '₽25M' },
                { type: 'Офис', address: 'ул. Гагарина, 7', price: '₽15M' },
              ].map((property, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-foreground">{property.type}</div>
                    <div className="text-muted-foreground">{property.address}</div>
                  </div>
                  <div className="text-[#1677ff]">{property.price}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Активные сделки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { client: 'Петров А.И.', property: 'Квартира, ул. Ленина, 45', status: 'Согласование' },
                { client: 'Сидорова М.П.', property: 'Дом, пр. Победы, 12', status: 'Оформление' },
                { client: 'ООО "Рога и копыта"', property: 'Офис, ул. Гагарина, 7', status: 'Подписание' },
              ].map((deal, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-foreground">{deal.client}</div>
                    <span className="px-2 py-1 bg-[#1677ff] text-white rounded text-sm">
                      {deal.status}
                    </span>
                  </div>
                  <div className="text-muted-foreground">{deal.property}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
