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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface EmployeesSectionProps {
  userRole: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  role: string;
  phone: string;
  email: string;
}

export default function EmployeesSection({ userRole }: EmployeesSectionProps) {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Петров Петр Петрович', position: 'Старший менеджер', role: 'Менеджер', phone: '+7 (999) 111-11-11', email: 'petrov@agency.ru' },
    { id: 2, name: 'Сидорова Светлана Сергеевна', position: 'Менеджер по продажам', role: 'Менеджер', phone: '+7 (999) 222-22-22', email: 'sidorova@agency.ru' },
    { id: 3, name: 'Иванова Ирина Ивановна', position: 'Администратор', role: 'Администратор', phone: '+7 (999) 333-33-33', email: 'ivanova@agency.ru' },
    { id: 4, name: 'Козлов Константин Константинович', position: 'Менеджер', role: 'Менеджер', phone: '+7 (999) 444-44-44', email: 'kozlov@agency.ru' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    role: '',
    phone: '',
    email: '',
  });

  const isAdmin = userRole === 'admin';

  const handleAdd = () => {
    if (!isAdmin) return;
    setFormData({ name: '', position: '', role: '', phone: '', email: '' });
    setSelectedEmployee(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    if (!isAdmin) return;
    setFormData({
      name: employee.name,
      position: employee.position,
      role: employee.role,
      phone: employee.phone,
      email: employee.email,
    });
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedEmployee) {
      setEmployees(employees.map(e =>
        e.id === selectedEmployee.id
          ? { ...e, ...formData }
          : e
      ));
    } else {
      const newEmployee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        ...formData,
      };
      setEmployees([...employees, newEmployee]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (!isAdmin) return;
    setEmployees(employees.filter(e => e.id !== id));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Администратор': return 'bg-purple-100 text-purple-800';
      case 'Менеджер': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1>Сотрудники</h1>
        <Button 
          onClick={handleAdd} 
          disabled={!isAdmin}
          className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6] disabled:opacity-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить сотрудника
        </Button>
      </div>

      {!isAdmin && (
        <Card className="shadow-sm bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-sm text-blue-800">
              У вас нет прав для добавления или редактирования сотрудников. Обратитесь к администратору.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ФИО</TableHead>
                <TableHead>Должность</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(employee.role)}>
                      {employee.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(employee)}
                        disabled={!isAdmin}
                        className="rounded-xl disabled:opacity-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(employee.id)}
                        disabled={!isAdmin}
                        className="rounded-xl text-red-600 hover:text-red-700 disabled:opacity-50"
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
              {selectedEmployee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о сотруднике
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
              <Label htmlFor="position" className="col-span-2 text-right">
                Должность
              </Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="role" className="col-span-2 text-right">
                Роль
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Менеджер">Менеджер</SelectItem>
                  <SelectItem value="Администратор">Администратор</SelectItem>
                </SelectContent>
              </Select>
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
