import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface DealsSectionProps {
  userRole: string;
}

interface Deal {
  id: number;
  type: string;
  property: string;
  client: string;
  employee: string;
  date: string;
  amount: number;
  status: string;
}

export default function DealsSection({ userRole }: DealsSectionProps) {
  const [deals, setDeals] = useState<Deal[]>([
    { id: 1, type: 'Продажа', property: 'ул. Ленина, 45', client: 'Иванов И.И.', employee: 'Петров П.П.', date: '2024-11-05', amount: 8500000, status: 'В процессе' },
    { id: 2, type: 'Продажа', property: 'пос. Солнечный, 12', client: 'Петрова М.С.', employee: 'Сидорова С.С.', date: '2024-10-28', amount: 12000000, status: 'Завершена' },
    { id: 3, type: 'Аренда', property: 'ул. Мира, 8', client: 'Сидоров А.В.', employee: 'Петров П.П.', date: '2024-11-01', amount: 45000, status: 'В процессе' },
    { id: 4, type: 'Продажа', property: 'пр. Победы, 23', client: 'Козлова Е.Н.', employee: 'Иванова И.И.', date: '2024-10-15', amount: 15000000, status: 'Завершена' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    type: '',
    property: '',
    client: '',
    employee: '',
    date: '',
    amount: '',
    status: '',
  });

  const handleAdd = () => {
    setFormData({ type: '', property: '', client: '', employee: '', date: '', amount: '', status: '' });
    setSelectedDeal(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (deal: Deal) => {
    setFormData({
      type: deal.type,
      property: deal.property,
      client: deal.client,
      employee: deal.employee,
      date: deal.date,
      amount: deal.amount.toString(),
      status: deal.status,
    });
    setSelectedDeal(deal);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedDeal) {
      setDeals(deals.map(d =>
        d.id === selectedDeal.id
          ? { ...d, ...formData, amount: Number(formData.amount) }
          : d
      ));
    } else {
      const newDeal = {
        id: Math.max(...deals.map(d => d.id)) + 1,
        type: formData.type,
        property: formData.property,
        client: formData.client,
        employee: formData.employee,
        date: formData.date,
        amount: Number(formData.amount),
        status: formData.status,
      };
      setDeals([...deals, newDeal]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setDeals(deals.filter(d => d.id !== id));
  };

  const filteredDeals = deals.filter(deal => {
    const matchesType = filterType === 'all' || deal.type === filterType;
    const matchesStatus = filterStatus === 'all' || deal.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В процессе': return 'bg-yellow-100 text-yellow-800';
      case 'Завершена': return 'bg-green-100 text-green-800';
      case 'Отменена': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Сделки</h1>
        <Button onClick={handleAdd} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
          <Plus className="h-4 w-4 mr-2" />
          Создать сделку
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 rounded-xl">
                <SelectValue placeholder="Тип сделки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Продажа">Продажа</SelectItem>
                <SelectItem value="Аренда">Аренда</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 rounded-xl">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="В процессе">В процессе</SelectItem>
                <SelectItem value="Завершена">Завершена</SelectItem>
                <SelectItem value="Отменена">Отменена</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип сделки</TableHead>
                <TableHead>Объект</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Сотрудник</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>{deal.type}</TableCell>
                  <TableCell>{deal.property}</TableCell>
                  <TableCell>{deal.client}</TableCell>
                  <TableCell>{deal.employee}</TableCell>
                  <TableCell>{new Date(deal.date).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>₽{deal.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(deal.status)}>
                      {deal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(deal)}
                        className="rounded-xl"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(deal.id)}
                        className="rounded-xl text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDeal ? 'Редактировать сделку' : 'Создать сделку'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о сделке
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="type" className="col-span-2 text-right">
                Тип сделки
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Продажа">Продажа</SelectItem>
                  <SelectItem value="Аренда">Аренда</SelectItem>
                  <SelectItem value="Обмен">Обмен</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="property" className="col-span-2 text-right">
                Объект
              </Label>
              <Select value={formData.property} onValueChange={(value) => setFormData({ ...formData, property: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите объект" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ул. Ленина, 45">ул. Ленина, 45</SelectItem>
                  <SelectItem value="пос. Солнечный, 12">пос. Солнечный, 12</SelectItem>
                  <SelectItem value="ул. Мира, 8">ул. Мира, 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="client" className="col-span-2 text-right">
                Клиент
              </Label>
              <Select value={formData.client} onValueChange={(value) => setFormData({ ...formData, client: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Иванов И.И.">Иванов И.И.</SelectItem>
                  <SelectItem value="Петрова М.С.">Петрова М.С.</SelectItem>
                  <SelectItem value="Сидоров А.В.">Сидоров А.В.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="employee" className="col-span-2 text-right">
                Сотрудник
              </Label>
              <Select value={formData.employee} onValueChange={(value) => setFormData({ ...formData, employee: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Петров П.П.">Петров П.П.</SelectItem>
                  <SelectItem value="Сидорова С.С.">Сидорова С.С.</SelectItem>
                  <SelectItem value="Иванова И.И.">Иванова И.И.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="date" className="col-span-2 text-right">
                Дата
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="amount" className="col-span-2 text-right">
                Сумма (₽)
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="status" className="col-span-2 text-right">
                Статус
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="В процессе">В процессе</SelectItem>
                  <SelectItem value="Завершена">Завершена</SelectItem>
                  <SelectItem value="Отменена">Отменена</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
              Отмена
            </Button>
            <Button onClick={handleSave} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
