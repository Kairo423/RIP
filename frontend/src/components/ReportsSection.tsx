import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { FileText, Download } from 'lucide-react';

export default function ReportsSection() {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    if (reportType && startDate && endDate) {
      setShowResults(true);
    }
  };

  const mockReportData = {
    sales: [
      { period: 'Неделя 1', deals: 5, amount: 42000000 },
      { period: 'Неделя 2', deals: 3, amount: 28000000 },
      { period: 'Неделя 3', deals: 7, amount: 56000000 },
      { period: 'Неделя 4', deals: 4, amount: 35000000 },
    ],
    properties: [
      { type: 'Квартира', count: 145, avgPrice: 7200000 },
      { type: 'Дом', count: 58, avgPrice: 15500000 },
      { type: 'Офис', count: 32, avgPrice: 12000000 },
      { type: 'Участок', count: 12, avgPrice: 3500000 },
    ],
    employees: [
      { name: 'Петров П.П.', deals: 12, revenue: 98000000 },
      { name: 'Сидорова С.С.', deals: 9, revenue: 75000000 },
      { name: 'Иванова И.И.', deals: 8, revenue: 68000000 },
    ],
  };

  return (
    <div className="space-y-4">
      <h1>Отчёты</h1>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Параметры отчёта</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Тип отчёта</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="reportType" className="rounded-xl">
                  <SelectValue placeholder="Выберите тип отчёта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Отчёт по продажам</SelectItem>
                  <SelectItem value="properties">Отчёт по объектам</SelectItem>
                  <SelectItem value="employees">Отчёт по сотрудникам</SelectItem>
                  <SelectItem value="revenue">Отчёт по выручке</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Период с</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Период по</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleGenerate}
              disabled={!reportType || !startDate || !endDate}
              className="rounded-xl bg-[#1677ff] hover:bg-[#1366d6]"
            >
              <FileText className="h-4 w-4 mr-2" />
              Сформировать
            </Button>
            {showResults && (
              <Button variant="outline" className="rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Экспорт в Excel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <>
          {reportType === 'sales' && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Отчёт по продажам</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Период</TableHead>
                      <TableHead>Количество сделок</TableHead>
                      <TableHead>Сумма</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReportData.sales.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.period}</TableCell>
                        <TableCell>{row.deals}</TableCell>
                        <TableCell>₽{row.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>Итого</TableCell>
                      <TableCell>
                        {mockReportData.sales.reduce((acc, row) => acc + row.deals, 0)}
                      </TableCell>
                      <TableCell>
                        ₽{mockReportData.sales.reduce((acc, row) => acc + row.amount, 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {reportType === 'properties' && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Отчёт по объектам</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Тип объекта</TableHead>
                      <TableHead>Количество</TableHead>
                      <TableHead>Средняя цена</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReportData.properties.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.count}</TableCell>
                        <TableCell>₽{row.avgPrice.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {reportType === 'employees' && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Отчёт по сотрудникам</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Сотрудник</TableHead>
                      <TableHead>Количество сделок</TableHead>
                      <TableHead>Выручка</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReportData.employees.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.deals}</TableCell>
                        <TableCell>₽{row.revenue.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>Итого</TableCell>
                      <TableCell>
                        {mockReportData.employees.reduce((acc, row) => acc + row.deals, 0)}
                      </TableCell>
                      <TableCell>
                        ₽{mockReportData.employees.reduce((acc, row) => acc + row.revenue, 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {reportType === 'revenue' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">Общая выручка</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">₽161,000,000</div>
                  <p className="text-xs text-gray-500">За выбранный период</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">Средний чек</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">₽8,473,684</div>
                  <p className="text-xs text-gray-500">По завершенным сделкам</p>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm">Рост</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-green-600">+18%</div>
                  <p className="text-xs text-gray-500">К предыдущему периоду</p>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
