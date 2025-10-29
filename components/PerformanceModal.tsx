import React from 'react';
import XIcon from './icons/XIcon';
import ClockIcon from './icons/ClockIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';

interface PerformanceModalProps {
  onClose: () => void;
  date: Date | null;
}

const PerformanceModal: React.FC<PerformanceModalProps> = ({ onClose, date }) => {
  if (!date) return null;

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const performanceData = {
    clockIn: '8:58 AM',
    clockOut: '5:03 PM',
    totalHours: '8h 5m',
    tasks: [
      { id: 1, description: 'Review Q3 sales reports', completed: true },
      { id: 2, description: 'Prepare presentation for client meeting', completed: true },
      { id: 3, description: 'Onboard new hire - Jane Doe', completed: true },
      { id: 4, description: 'Update project management board', completed: false },
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Daily Performance</h2>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-500">Clock In</p>
                    <p className="text-lg font-bold text-gray-800">{performanceData.clockIn}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-500">Clock Out</p>
                    <p className="text-lg font-bold text-gray-800">{performanceData.clockOut}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-green-700">Total Hours</p>
                    <p className="text-lg font-bold text-green-800">{performanceData.totalHours}</p>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <ClipboardListIcon className="h-5 w-5 text-gray-500"/>
                    <span>Tasks Completed</span>
                </h3>
                <ul className="space-y-2">
                    {performanceData.tasks.map(task => (
                        <li key={task.id} className="flex items-center p-3 bg-slate-50 rounded-md">
                            <input 
                                id={`task-${task.id}`} 
                                type="checkbox" 
                                checked={task.completed} 
                                readOnly 
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-not-allowed"
                            />
                            <label htmlFor={`task-${task.id}`} className={`ml-3 text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                {task.description}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        <div className="flex justify-end p-6 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
            Done
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PerformanceModal;