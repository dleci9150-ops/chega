import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LeidyHeader from '../../components/Layout/LeidyHeader';
import LeidyFooter from '../../components/Layout/LeidyFooter';

// Mock data - Em produção, vem do backend
const mockSalesData = [
  { month: 'Jan', sales: 4000, revenue: 2400 },
  { month: 'Fev', sales: 3000, revenue: 1398 },
  { month: 'Mar', sales: 2000, revenue: 9800 },
  { month: 'Abr', sales: 2780, revenue: 3908 },
  { month: 'Mai', sales: 1890, revenue: 4800 },
  { month: 'Jun', sales: 2390, revenue: 3800 },
];

const mockServiceData = [
  { name: 'Residencial', value: 45, color: '#2e7d32' },
  { name: 'Comercial', value: 25, color: '#4caf50' },
  { name: 'Estofados', value: 18, color: '#8bc34a' },
  { name: 'Vidros', value: 12, color: '#66bb6a' },
];

const mockBookings = [
  { id: 1, client: 'João Silva', service: 'Limpeza Residencial', date: '2026-02-10', status: 'Confirmado', price: 150 },
  { id: 2, client: 'Maria Santos', service: 'Limpeza Comercial', date: '2026-02-11', status: 'Pendente', price: 250 },
  { id: 3, client: 'Pedro Costa', service: 'Limpeza Estofados', date: '2026-02-12', status: 'Concluído', price: 200 },
  { id: 4, client: 'Ana Oliveira', service: 'Limpeza de Vidros', date: '2026-02-13', status: 'Confirmado', price: 120 },
];

const COLORS = ['#2e7d32', '#4caf50', '#8bc34a', '#66bb6a'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 18098,
    totalBookings: 256,
    averageRating: 4.8,
    conversionRate: 68,
  });

  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    // Em produção, buscar dados do backend
    // fetch('/api/admin/dashboard')
  }, [timeRange]);

  const getStatusColor = (status) => {
    const colors = {
      'Confirmado': 'bg-green-100 text-green-800 border-green-300',
      'Pendente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Concluído': 'bg-blue-100 text-blue-800 border-blue-300',
      'Cancelado': 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || colors['Pendente'];
  };

  return (
    <>
      <Head>
        <title>Dashboard Admin - Leidy Cleaner</title>
        <meta name="description" content="Dashboard administrativo com análise de vendas e agendamentos" />
      </Head>

      <LeidyHeader />

      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-900 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Análise de vendas, agendamentos e receita</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">RECEITA TOTAL</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">R$ {stats.totalRevenue.toLocaleString('pt-BR')}</p>
                  <p className="text-green-600 text-xs mt-2">+12% vs mês anterior</p>
                </div>
                <div className="text-5xl text-green-200">
                  <i className="fas fa-dollar-sign"></i>
                </div>
              </div>
            </div>

            {/* Total Bookings */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">AGENDAMENTOS</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{stats.totalBookings}</p>
                  <p className="text-blue-600 text-xs mt-2">+8% vs mês anterior</p>
                </div>
                <div className="text-5xl text-blue-200">
                  <i className="fas fa-calendar-check"></i>
                </div>
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">AVALIAÇÃO MÉDIA</p>
                  <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.averageRating}</p>
                  <div className="text-yellow-500 mt-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
                <div className="text-5xl text-yellow-200">
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-semibold">TAXA CONVERSÃO</p>
                  <p className="text-3xl font-bold text-purple-900 mt-1">{stats.conversionRate}%</p>
                  <p className="text-purple-600 text-xs mt-2">+5% vs mês anterior</p>
                </div>
                <div className="text-5xl text-purple-200">
                  <i className="fas fa-chart-pie"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sales & Revenue Line Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-green-900 mb-4">Vendas vs Receita</h2>
              <div className="flex justify-end mb-4">
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 border border-green-300 rounded text-sm focus:outline-none focus:border-green-500"
                >
                  <option value="week">Esta Semana</option>
                  <option value="month">Este Mês</option>
                  <option value="year">Este Ano</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString('pt-BR')} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#2e7d32" 
                    strokeWidth={2}
                    dot={{ fill: '#2e7d32', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4caf50" 
                    strokeWidth={2}
                    dot={{ fill: '#4caf50', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Services Distribution Pie Chart */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-green-900 mb-4">Distribuição de Serviços</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockServiceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockServiceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {mockServiceData.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{service.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Revenue Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 mb-4">Receita Mensal</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                  contentStyle={{ backgroundColor: '#f5f5f5', border: '1px solid #2e7d32', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#2e7d32" name="Receita (R$)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-green-900 mb-4">Agendamentos Recentes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-green-200">
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Cliente</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Serviço</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Data</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-gray-700 font-semibold">Valor</th>
                    <th className="px-4 py-3 text-center text-gray-700 font-semibold">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 font-medium">{booking.client}</td>
                      <td className="px-4 py-3 text-gray-700">{booking.service}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {new Date(booking.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-semibold">R$ {booking.price.toLocaleString('pt-BR')}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-700 transition">
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="px-6 py-2 border-2 border-green-600 text-green-600 font-semibold rounded hover:bg-green-50 transition">
                Ver Todos os Agendamentos
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeidyFooter />
    </>
  );
}
