import React, { useState, useMemo } from 'react';
import ClockIcon from './icons/ClockIcon';
import CurrencyDollarIcon from './icons/CurrencyDollarIcon';
import CalendarIcon from './icons/CalendarIcon';
import InboxIcon from './icons/InboxIcon';
import ExclamationIcon from './icons/ExclamationIcon';
import RequestTimeOffModal from './RequestTimeOffModal';
import PerformanceModal from './PerformanceModal';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';


const UserProfile: React.FC = () => {
    const [isTimeOffModalOpen, setIsTimeOffModalOpen] = useState(false);
    const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleDayClick = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(clickedDate);
        setIsPerformanceModalOpen(true);
    };

    const calendarData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return { days, year, month };
    }, [currentDate]);

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    // Dummy attendance data for styling
    const getAttendanceStatus = (day: number) => {
        if (!day) return '';
        // Mock some absent days for visual representation
        if (day % 7 === 0 || day % 11 === 0) return 'bg-slate-200 text-slate-500';
        return 'bg-indigo-500 text-white';
    };

    const activityData = [
        { week: '10/21 - 10/27', hours: 42.5, pay: 850.00 },
        { week: '10/14 - 10/20', hours: 40.0, pay: 800.00 },
        { week: '10/07 - 10/13', hours: 38.0, pay: 760.00 },
        { week: '09/30 - 10/06', hours: 45.0, pay: 950.00 },
    ];
    
    const messages = [
        { from: 'Admin', subject: 'Holiday Schedule Update', time: '2 hours ago' },
        { from: 'HR Dept', subject: 'Open Enrollment Reminder', time: 'Yesterday' },
        { from: 'Admin', subject: 'New Safety Protocols', time: '3 days ago' },
    ];

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin User!</h1>
          <p className="mt-1 text-gray-500">Here's your performance summary and quick actions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full"><ClockIcon className="h-6 w-6 text-green-600" /></div>
                <div>
                  <p className="text-sm text-gray-500">Hours This Week</p>
                  <p className="text-2xl font-bold text-gray-800">32.5</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full"><CurrencyDollarIcon className="h-6 w-6 text-blue-600" /></div>
                <div>
                  <p className="text-sm text-gray-500">Pay YTD</p>
                  <p className="text-2xl font-bold text-gray-800">$42,850</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full"><CalendarIcon className="h-6 w-6 text-purple-600" /></div>
                <div>
                  <p className="text-sm text-gray-500">Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-800">95.8%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-gray-800">Monthly Attendance</h3>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronLeftIcon className="h-5 w-5"/></button>
                        <h4 className="font-semibold text-gray-700 text-center w-32">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h4>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronRightIcon className="h-5 w-5"/></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-medium text-gray-500 py-2">{day}</div>)}
                  {calendarData.days.map((day, index) => (
                    <div key={index} className="py-1">
                      {day ? (
                        <button 
                          onClick={() => handleDayClick(day)}
                          className={`w-10 h-10 rounded-full transition-colors duration-200 flex items-center justify-center font-semibold mx-auto hover:ring-2 hover:ring-indigo-300 ${getAttendanceStatus(day)}`}
                        >
                          {day}
                        </button>
                      ) : <div />}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end space-x-4 mt-4 text-xs">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                        <span>Present</span>
                    </div>
                     <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                        <span>Absent</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <h3 className="font-semibold text-lg text-gray-800 p-6">Recent Activity</h3>
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-slate-50">
                          <tr>
                              <th scope="col" className="px-6 py-3">Week</th>
                              <th scope="col" className="px-6 py-3">Hours Worked</th>
                              <th scope="col" className="px-6 py-3">Gross Pay</th>
                          </tr>
                      </thead>
                      <tbody>
                          {activityData.map((row, index) => (
                              <tr key={index} className="bg-white border-b last:border-b-0">
                                  <td className="px-6 py-4 font-medium text-gray-900">{row.week}</td>
                                  <td className="px-6 py-4">{row.hours.toFixed(1)}</td>
                                  <td className="px-6 py-4">${row.pay.toFixed(2)}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                  <button 
                    onClick={() => setIsTimeOffModalOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                      <CalendarIcon className="h-5 w-5"/>
                      <span>Request Time Off</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-all duration-300">
                      <ExclamationIcon className="h-5 w-5"/>
                      <span>Submit a Report</span>
                  </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">Inbox</h3>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:underline">View All</a>
              </div>
              <ul className="space-y-4">
                {messages.map((msg, index) => (
                  <li key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
                      <div className="bg-slate-200 p-2 rounded-full"><InboxIcon className="h-5 w-5 text-slate-600"/></div>
                      <div>
                          <p className="text-sm font-semibold text-gray-800">{msg.subject}</p>
                          <p className="text-xs text-gray-500">From {msg.from} &middot; {msg.time}</p>
                      </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isTimeOffModalOpen && <RequestTimeOffModal onClose={() => setIsTimeOffModalOpen(false)} />}
      {isPerformanceModalOpen && <PerformanceModal date={selectedDate} onClose={() => setIsPerformanceModalOpen(false)} />}
    </>
  );
};

export default UserProfile;