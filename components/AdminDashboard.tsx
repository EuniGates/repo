import React, { useState } from 'react';
import TrendingUpIcon from './icons/TrendingUpIcon';
import TrendingDownIcon from './icons/TrendingDownIcon';
import DocumentReportIcon from './icons/DocumentReportIcon';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import CalendarIcon from './icons/CalendarIcon';
import ExclamationIcon from './icons/ExclamationIcon';
import FilterModal from './FilterModal';
import WalletIcon from './icons/WalletIcon';

const kpiData = [
  {
    title: 'Total Sales',
    value: '$124,560',
    change: '+12.5%',
    changeType: 'positive' as 'positive' | 'negative',
    icon: TrendingUpIcon,
    iconBgColor: 'bg-green-100',
    iconTextColor: 'text-green-600',
    isClickable: true,
  },
  {
    title: 'Total Expenses',
    value: '$78,920',
    change: '+8.2%',
    changeType: 'negative' as 'positive' | 'negative',
    icon: TrendingDownIcon,
    iconBgColor: 'bg-red-100',
    iconTextColor: 'text-red-600',
    isClickable: true,
  },
  {
    title: 'Total Wages',
    value: '$45,640',
    change: '+5.1% this month',
    changeType: 'negative' as 'positive' | 'negative',
    icon: WalletIcon,
    iconBgColor: 'bg-blue-100',
    iconTextColor: 'text-blue-600',
    isClickable: true,
  },
  {
    title: 'Pending Requests',
    value: '8',
    change: '3 new',
    changeType: 'neutral' as 'positive' | 'negative' | 'neutral',
    icon: DocumentReportIcon,
    iconBgColor: 'bg-yellow-100',
    iconTextColor: 'text-yellow-600',
    isClickable: false,
  },
];

const inboxData = [
  {
    id: 1,
    employee: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
    type: 'Time Off Request',
    details: '5 days (Nov 18 - Nov 22)',
    date: '2024-11-10',
    icon: CalendarIcon,
    iconBg: 'bg-purple-100 text-purple-600'
  },
  {
    id: 2,
    employee: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
    type: 'Report Submission',
    details: 'Broken equipment in warehouse',
    date: '2024-11-09',
    icon: ExclamationIcon,
    iconBg: 'bg-orange-100 text-orange-600'
  },
  {
    id: 3,
    employee: { name: 'Peter Jones', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
    type: 'Time Off Request',
    details: '1 day (Nov 20)',
    date: '2024-11-09',
    icon: CalendarIcon,
    iconBg: 'bg-purple-100 text-purple-600'
  }
];


const AdminDashboard: React.FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterMetricTitle, setFilterMetricTitle] = useState('');
  const [filterMetricValue, setFilterMetricValue] = useState('');

  const handleKpiClick = (title: string, value: string) => {
    setFilterMetricTitle(title);
    setFilterMetricValue(value);
    setIsFilterModalOpen(true);
  };
  
  const KpiCard = ({ item }: { item: typeof kpiData[0] }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-start justify-between h-full">
      <div>
        <p className="text-sm font-medium text-gray-500">{item.title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{item.value}</p>
        <p className={`text-xs mt-2 font-semibold ${item.changeType === 'positive' ? 'text-green-600' : item.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'}`}>
          {item.change}
        </p>
      </div>
      <div className={`p-3 rounded-full ${item.iconBgColor}`}>
        <item.icon className={`h-6 w-6 ${item.iconTextColor}`} />
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((item) =>
            item.isClickable ? (
              <button
                key={item.title}
                onClick={() => handleKpiClick(item.title, item.value)}
                className="text-left w-full h-full rounded-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <KpiCard item={item} />
              </button>
            ) : (
              <div key={item.title}>
                <KpiCard item={item} />
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inbox */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-gray-800">Inbox</h3>
              <p className="text-sm text-gray-500 mt-1">Manage employee requests and reports.</p>
            </div>
            <ul className="divide-y divide-slate-200">
              {inboxData.map((item) => (
                <li key={item.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${item.iconBg}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.type}</p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">{item.employee.name}</span> &ndash; {item.details}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex-shrink-0 flex items-center space-x-2">
                      {item.type === 'Time Off Request' && (
                        <>
                          <button className="px-3 py-1.5 text-xs font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors flex items-center space-x-1">
                            <CheckIcon className="h-4 w-4" />
                            <span>Approve</span>
                          </button>
                          <button className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors flex items-center space-x-1">
                            <XIcon className="h-4 w-4" />
                            <span>Deny</span>
                          </button>
                        </>
                      )}
                      {item.type !== 'Time Off Request' && (
                          <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors">
                              View Details
                          </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Charts */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
              <div className="mt-4 h-48 bg-slate-50 rounded-lg flex items-center justify-center text-sm text-gray-400">
                Line Chart Placeholder
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">Expense Breakdown</h3>
              <div className="mt-4 h-48 bg-slate-50 rounded-lg flex items-center justify-center text-sm text-gray-400">
                Donut Chart Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        metricTitle={filterMetricTitle} 
        metricValue={filterMetricValue}
      />
    </>
  );
};

export default AdminDashboard;