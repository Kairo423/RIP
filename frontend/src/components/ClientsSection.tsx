import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Badge } from './ui/badge';

interface ClientsSectionProps {
  userRole: 'admin' | 'manager';
}

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  type: string;
  relatedObjects: number;
  relatedDeals: number;
}

export default function ClientsSection({ userRole }: ClientsSectionProps) {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: 'Иванов Иван Иванович', phone: '+7 (999) 123-45-67', email: 'ivanov@mail.ru', type: 'Покупатель', relatedObjects: 2, relatedDeals: 1 },
    { id: 2, name: 'Петрова Мария Сергеевна', phone: '+7 (999) 234-56-78', email: 'petrova@mail.ru', type: 'Продавец', relatedObjects: 1, relatedDeals: 1 },
    { id: 3, name: 'Сидоров Алексей Владимирович', phone: '+7 (999) 345-67-89', email: 'sidorov@mail.ru', type: 'Арендатор', relatedObjects: 1, relatedDeals: 0 },
    { id: 4, name: 'Козлова Елена Николаевна', phone: '+7 (999) 456-78-90', email: 'kozlova@mail.ru', type: 'Покупатель', relatedObjects: 3, relatedDeals: 2 },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
  });

  const handleAdd = () => {
    setFormData({ name: '', phone: '', email: '', type: '' });
    setSelectedClient(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (client: Client) => {
    setFormData({
      name: client.name,
      phone: client.phone,
      email: client.email,
      type: client.type,
    });
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedClient) {
      setClients(clients.map(c =>
        c.id === selectedClient.id
          ? { ...c, ...formData }
          : c
      ));
    } else {
      const newClient = {
        id: Math.max(...clients.map(c => c.id)) + 1,
        ...formData,
        relatedObjects: 0,
        relatedDeals: 0,
      };
      setClients([...clients, newClient]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailOpen(true);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Покупатель': return 'bg-blue-100 text-blue-800';
      case 'Продавец': return 'bg-green-100 text-green-800';
      case 'Арендатор': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Клиенты</h1>
        <Button onClick={handleAdd} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
          <Plus className="h-4 w-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Поиск по ФИО, телефону или email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Тип клиента</TableHead>
                <TableHead>Объекты</TableHead>
                <TableHead>Сделки</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(client.type)}>
                      {client.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.relatedObjects}</TableCell>
                  <TableCell>{client.relatedDeals}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(client)}
                        className="rounded-xl"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(client)}
                        className="rounded-xl"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(client.id)}
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
              {selectedClient ? 'Редактировать клиента' : 'Добавить клиента'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о клиенте
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="col-span-2 text-right">
                ФИО
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="phone" className="col-span-2 text-right">
                Телефон
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="email" className="col-span-2 text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="type" className="col-span-2 text-right">
                Тип клиента
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Покупатель">Покупатель</SelectItem>
                  <SelectItem value="Продавец">Продавец</SelectItem>
                  <SelectItem value="Арендатор">Арендатор</SelectItem>
                  <SelectItem value="Арендодатель">Арендодатель</SelectItem>
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

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Карточка клиента</DialogTitle>
            <DialogDescription>
              Подробная информация о клиенте
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ФИО</p>
                  <p>{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Тип клиента</p>
                  <Badge className={getTypeColor(selectedClient.type)}>
                    {selectedClient.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Телефон</p>
                  <p>{selectedClient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedClient.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Связанные объекты</p>
                <div className="border rounded-xl p-4">
                  <p className="text-sm">Объектов: {selectedClient.relatedObjects}</p>
                  <p className="text-sm">Сделок: {selectedClient.relatedDeals}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
