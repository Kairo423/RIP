import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
import { Textarea } from './ui/textarea';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Badge } from './ui/badge';

interface PropertiesSectionProps {
  userRole: string;
}

interface Property {
  id: number;
  type: string;
  address: string;
  area: number;
  price: number;
  status: string;
}

export default function PropertiesSection({ userRole }: PropertiesSectionProps) {
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, type: 'Квартира', address: 'ул. Ленина, 45', area: 75, price: 8500000, status: 'Продажа' },
    { id: 2, type: 'Дом', address: 'пос. Солнечный, 12', area: 180, price: 12000000, status: 'Продажа' },
    { id: 3, type: 'Квартира', address: 'ул. Мира, 8', area: 52, price: 6200000, status: 'Аренда' },
    { id: 4, type: 'Офис', address: 'пр. Победы, 23', area: 120, price: 15000000, status: 'Продажа' },
    { id: 5, type: 'Квартира', address: 'ул. Гагарина, 56', area: 68, price: 7800000, status: 'Продано' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    type: '',
    address: '',
    area: '',
    price: '',
    status: '',
    description: '',
  });

  const handleAdd = () => {
    setFormData({ type: '', address: '', area: '', price: '', status: '', description: '' });
    setSelectedProperty(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (property: Property) => {
    setFormData({
      type: property.type,
      address: property.address,
      area: property.area.toString(),
      price: property.price.toString(),
      status: property.status,
      description: '',
    });
    setSelectedProperty(property);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedProperty) {
      setProperties(properties.map(p =>
        p.id === selectedProperty.id
          ? { ...p, ...formData, area: Number(formData.area), price: Number(formData.price) }
          : p
      ));
    } else {
      const newProperty = {
        id: Math.max(...properties.map(p => p.id)) + 1,
        type: formData.type,
        address: formData.address,
        area: Number(formData.area),
        price: Number(formData.price),
        status: formData.status,
      };
      setProperties([...properties, newProperty]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailOpen(true);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Продажа': return 'bg-blue-100 text-blue-800';
      case 'Аренда': return 'bg-green-100 text-green-800';
      case 'Продано': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Объекты недвижимости</h1>
        <Button onClick={handleAdd} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
          <Plus className="h-4 w-4 mr-2" />
          Добавить объект
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск по адресу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 rounded-xl">
                <SelectValue placeholder="Тип объекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Квартира">Квартира</SelectItem>
                <SelectItem value="Дом">Дом</SelectItem>
                <SelectItem value="Офис">Офис</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 rounded-xl">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="Продажа">Продажа</SelectItem>
                <SelectItem value="Аренда">Аренда</SelectItem>
                <SelectItem value="Продано">Продано</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Площадь (м²)</TableHead>
                <TableHead>Стоимость</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.area}</TableCell>
                  <TableCell>₽{property.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(property)}
                        className="rounded-xl"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(property)}
                        className="rounded-xl"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(property.id)}
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
              {selectedProperty ? 'Редактировать объект' : 'Добавить объект'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию об объекте недвижимости
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="type" className="col-span-2 text-right">
                Тип объекта
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Квартира">Квартира</SelectItem>
                  <SelectItem value="Дом">Дом</SelectItem>
                  <SelectItem value="Офис">Офис</SelectItem>
                  <SelectItem value="Участок">Участок</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="address" className="col-span-2 text-right">
                Адрес
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="area" className="col-span-2 text-right">
                Площадь (м²)
              </Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="price" className="col-span-2 text-right">
                Стоимость (₽)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                  <SelectItem value="Продажа">Продажа</SelectItem>
                  <SelectItem value="Аренда">Аренда</SelectItem>
                  <SelectItem value="Продано">Продано</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-start gap-4">
              <Label htmlFor="description" className="col-span-2 text-right pt-2">
                Описание
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-4 rounded-xl"
                rows={4}
              />
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
            <DialogTitle>Детали объекта</DialogTitle>
            <DialogDescription>
              Подробная информация об объекте недвижимости
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Тип объекта</p>
                  <p>{selectedProperty.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Статус</p>
                  <Badge className={getStatusColor(selectedProperty.status)}>
                    {selectedProperty.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Адрес</p>
                  <p>{selectedProperty.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Площадь</p>
                  <p>{selectedProperty.area} м²</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Стоимость</p>
                  <p>₽{selectedProperty.price.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">История прав</p>
                <div className="border rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Регистрация права собственности</span>
                    <span className="text-gray-500">15.03.2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Переход права собственности</span>
                    <span className="text-gray-500">08.01.2023</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
