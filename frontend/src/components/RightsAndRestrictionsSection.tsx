import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Plus, Edit, Trash2, History } from 'lucide-react';

interface RightsAndRestrictionsSectionProps {
  userRole: string;
}

interface Right {
  id: number;
  property: string;
  type: string;
  owner: string;
  registrationDate: string;
  document: string;
}

interface Restriction {
  id: number;
  property: string;
  type: string;
  imposedDate: string;
  removedDate: string;
  basis: string;
}

export default function RightsAndRestrictionsSection({ userRole }: RightsAndRestrictionsSectionProps) {
  const [rights, setRights] = useState<Right[]>([
    { id: 1, property: 'ул. Ленина, 45', type: 'Собственность', owner: 'Иванов И.И.', registrationDate: '2023-03-15', document: 'ДКП №12345' },
    { id: 2, property: 'пос. Солнечный, 12', type: 'Собственность', owner: 'Петрова М.С.', registrationDate: '2022-08-20', document: 'ДКП №12346' },
    { id: 3, property: 'ул. Мира, 8', type: 'Аренда', owner: 'Сидоров А.В.', registrationDate: '2024-01-10', document: 'Договор аренды №567' },
  ]);

  const [restrictions, setRestrictions] = useState<Restriction[]>([
    { id: 1, property: 'ул. Ленина, 45', type: 'Залог', imposedDate: '2023-04-01', removedDate: '', basis: 'Ипотечный кредит' },
    { id: 2, property: 'пр. Победы, 23', type: 'Арест', imposedDate: '2023-11-15', removedDate: '2024-02-20', basis: 'Решение суда №456' },
  ]);

  const [isRightDialogOpen, setIsRightDialogOpen] = useState(false);
  const [isRestrictionDialogOpen, setIsRestrictionDialogOpen] = useState(false);
  const [selectedRight, setSelectedRight] = useState<Right | null>(null);
  const [selectedRestriction, setSelectedRestriction] = useState<Restriction | null>(null);

  const [rightFormData, setRightFormData] = useState({
    property: '',
    type: '',
    owner: '',
    registrationDate: '',
    document: '',
  });

  const [restrictionFormData, setRestrictionFormData] = useState({
    property: '',
    type: '',
    imposedDate: '',
    removedDate: '',
    basis: '',
  });

  const handleAddRight = () => {
    setRightFormData({ property: '', type: '', owner: '', registrationDate: '', document: '' });
    setSelectedRight(null);
    setIsRightDialogOpen(true);
  };

  const handleEditRight = (right: Right) => {
    setRightFormData({
      property: right.property,
      type: right.type,
      owner: right.owner,
      registrationDate: right.registrationDate,
      document: right.document,
    });
    setSelectedRight(right);
    setIsRightDialogOpen(true);
  };

  const handleSaveRight = () => {
    if (selectedRight) {
      setRights(rights.map(r =>
        r.id === selectedRight.id ? { ...r, ...rightFormData } : r
      ));
    } else {
      const newRight = {
        id: Math.max(...rights.map(r => r.id)) + 1,
        ...rightFormData,
      };
      setRights([...rights, newRight]);
    }
    setIsRightDialogOpen(false);
  };

  const handleDeleteRight = (id: number) => {
    setRights(rights.filter(r => r.id !== id));
  };

  const handleAddRestriction = () => {
    setRestrictionFormData({ property: '', type: '', imposedDate: '', removedDate: '', basis: '' });
    setSelectedRestriction(null);
    setIsRestrictionDialogOpen(true);
  };

  const handleEditRestriction = (restriction: Restriction) => {
    setRestrictionFormData({
      property: restriction.property,
      type: restriction.type,
      imposedDate: restriction.imposedDate,
      removedDate: restriction.removedDate,
      basis: restriction.basis,
    });
    setSelectedRestriction(restriction);
    setIsRestrictionDialogOpen(true);
  };

  const handleSaveRestriction = () => {
    if (selectedRestriction) {
      setRestrictions(restrictions.map(r =>
        r.id === selectedRestriction.id ? { ...r, ...restrictionFormData } : r
      ));
    } else {
      const newRestriction = {
        id: Math.max(...restrictions.map(r => r.id)) + 1,
        ...restrictionFormData,
      };
      setRestrictions([...restrictions, newRestriction]);
    }
    setIsRestrictionDialogOpen(false);
  };

  const handleDeleteRestriction = (id: number) => {
    setRestrictions(restrictions.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-4">
      <h1>Права собственности и ограничения</h1>

      <Tabs defaultValue="rights" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="rights">Права собственности</TabsTrigger>
          <TabsTrigger value="restrictions">Ограничения</TabsTrigger>
        </TabsList>

        <TabsContent value="rights" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleAddRight} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
              <Plus className="h-4 w-4 mr-2" />
              Добавить право
            </Button>
          </div>

          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Объект</TableHead>
                    <TableHead>Вид права</TableHead>
                    <TableHead>Собственник</TableHead>
                    <TableHead>Дата регистрации</TableHead>
                    <TableHead>Документ</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rights.map((right) => (
                    <TableRow key={right.id}>
                      <TableCell>{right.property}</TableCell>
                      <TableCell>{right.type}</TableCell>
                      <TableCell>{right.owner}</TableCell>
                      <TableCell>{new Date(right.registrationDate).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>{right.document}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl"
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditRight(right)}
                            className="rounded-xl"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRight(right.id)}
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
        </TabsContent>

        <TabsContent value="restrictions" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={handleAddRestriction} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
              <Plus className="h-4 w-4 mr-2" />
              Добавить ограничение
            </Button>
          </div>

          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Объект</TableHead>
                    <TableHead>Вид ограничения</TableHead>
                    <TableHead>Дата наложения</TableHead>
                    <TableHead>Дата снятия</TableHead>
                    <TableHead>Основание</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restrictions.map((restriction) => (
                    <TableRow key={restriction.id}>
                      <TableCell>{restriction.property}</TableCell>
                      <TableCell>{restriction.type}</TableCell>
                      <TableCell>{new Date(restriction.imposedDate).toLocaleDateString('ru-RU')}</TableCell>
                      <TableCell>
                        {restriction.removedDate 
                          ? new Date(restriction.removedDate).toLocaleDateString('ru-RU')
                          : '—'
                        }
                      </TableCell>
                      <TableCell>{restriction.basis}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl"
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditRestriction(restriction)}
                            className="rounded-xl"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRestriction(restriction.id)}
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
        </TabsContent>
      </Tabs>

      {/* Rights Dialog */}
      <Dialog open={isRightDialogOpen} onOpenChange={setIsRightDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedRight ? 'Редактировать право' : 'Добавить право'}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о праве собственности
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="property" className="col-span-2 text-right">
                Объект
              </Label>
              <Select 
                value={rightFormData.property} 
                onValueChange={(value) => setRightFormData({ ...rightFormData, property: value })}
              >
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
              <Label htmlFor="type" className="col-span-2 text-right">
                Вид права
              </Label>
              <Select 
                value={rightFormData.type} 
                onValueChange={(value) => setRightFormData({ ...rightFormData, type: value })}
              >
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Собственность">Собственность</SelectItem>
                  <SelectItem value="Аренда">Аренда</SelectItem>
                  <SelectItem value="Пользование">Пользование</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="owner" className="col-span-2 text-right">
                Собственник
              </Label>
              <Input
                id="owner"
                value={rightFormData.owner}
                onChange={(e) => setRightFormData({ ...rightFormData, owner: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="registrationDate" className="col-span-2 text-right">
                Дата регистрации
              </Label>
              <Input
                id="registrationDate"
                type="date"
                value={rightFormData.registrationDate}
                onChange={(e) => setRightFormData({ ...rightFormData, registrationDate: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="document" className="col-span-2 text-right">
                Документ
              </Label>
              <Input
                id="document"
                value={rightFormData.document}
                onChange={(e) => setRightFormData({ ...rightFormData, document: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRightDialogOpen(false)} className="rounded-xl">
              Отмена
            </Button>
            <Button onClick={handleSaveRight} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restrictions Dialog */}
      <Dialog open={isRestrictionDialogOpen} onOpenChange={setIsRestrictionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedRestriction ? 'Редактировать ограничение' : 'Добавить ограничение'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="property" className="col-span-2 text-right">
                Объект
              </Label>
              <Select 
                value={restrictionFormData.property} 
                onValueChange={(value) => setRestrictionFormData({ ...restrictionFormData, property: value })}
              >
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите объект" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ул. Ленина, 45">ул. Ленина, 45</SelectItem>
                  <SelectItem value="пос. Солнечный, 12">пос. Солнечный, 12</SelectItem>
                  <SelectItem value="пр. Победы, 23">пр. Победы, 23</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="type" className="col-span-2 text-right">
                Вид ограничения
              </Label>
              <Select 
                value={restrictionFormData.type} 
                onValueChange={(value) => setRestrictionFormData({ ...restrictionFormData, type: value })}
              >
                <SelectTrigger className="col-span-4 rounded-xl">
                  <SelectValue placeholder="Выберите вид" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Залог">Залог</SelectItem>
                  <SelectItem value="Арест">Арест</SelectItem>
                  <SelectItem value="Запрет">Запрет на отчуждение</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="imposedDate" className="col-span-2 text-right">
                Дата наложения
              </Label>
              <Input
                id="imposedDate"
                type="date"
                value={restrictionFormData.imposedDate}
                onChange={(e) => setRestrictionFormData({ ...restrictionFormData, imposedDate: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="removedDate" className="col-span-2 text-right">
                Дата снятия
              </Label>
              <Input
                id="removedDate"
                type="date"
                value={restrictionFormData.removedDate}
                onChange={(e) => setRestrictionFormData({ ...restrictionFormData, removedDate: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="basis" className="col-span-2 text-right">
                Основание
              </Label>
              <Input
                id="basis"
                value={restrictionFormData.basis}
                onChange={(e) => setRestrictionFormData({ ...restrictionFormData, basis: e.target.value })}
                className="col-span-4 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestrictionDialogOpen(false)} className="rounded-xl">
              Отмена
            </Button>
            <Button onClick={handleSaveRestriction} className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]">
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
