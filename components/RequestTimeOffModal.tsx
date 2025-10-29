import React, { useState, useMemo } from 'react';
import XIcon from './icons/XIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface RequestTimeOffModalProps {
  onClose: () => void;
}

const TOTAL_VACATION_DAYS = 12;

const RequestTimeOffModal: React.FC<RequestTimeOffModalProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const vacationDaysLeft = TOTAL_VACATION_DAYS - selectedDates.length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    date.setHours(0, 0, 0, 0);

    const isAlreadySelected = selectedDates.some(d => d.getTime() === date.getTime());

    if (isPast(day)) return;

    if (isAlreadySelected) {
        setSelectedDates(prev => prev.filter(d => d.getTime() !== date.getTime()));
    } else {
        if (vacationDaysLeft > 0) {
            setSelectedDates(prev => [...prev, date].sort((a, b) => a.getTime() - b.getTime()));
        }
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitted(true);
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
    return days;
  }, [currentDate]);

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const isSelected = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return selectedDates.some(d => d.getTime() === date.getTime());
  };
  
  const isPast = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < today;
  }
  
  const getDayClass = (day: number) => {
      const dayIsSelected = isSelected(day);
      if (dayIsSelected) {
          return 'bg-indigo-600 text-white font-semibold';
      }
      if (isPast(day) || vacationDaysLeft <= 0) {
          return 'text-slate-300 cursor-not-allowed';
      }
      return 'text-gray-700 hover:bg-indigo-100';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">{isSubmitted ? 'Request Submitted' : 'Request Time Off'}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {isSubmitted ? (
          <>
            <div className="p-8 text-center flex flex-col items-center space-y-4">
                <CheckCircleIcon className="h-16 w-16 text-green-500" />
                <p className="text-lg text-gray-700 max-w-sm mx-auto">
                    Thank you for your request. An admin will review it and decide whether or not to approve it shortly.
                </p>
            </div>
            <div className="flex justify-center p-6 bg-slate-50 rounded-b-2xl">
              <button 
                onClick={onClose} 
                className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="p-6 space-y-6">
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                <p className="font-semibold text-indigo-800">You have <span className="text-2xl font-bold">{vacationDaysLeft}</span> vacation days left.</p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronLeftIcon className="h-5 w-5"/></button>
                  <h3 className="font-semibold text-lg text-gray-700">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100"><ChevronRightIcon className="h-5 w-5"/></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-semibold text-gray-500 p-2">{day.slice(0,1)}</div>)}
                  {calendarData.map((day, index) => (
                    <div key={index} className="p-1">
                      {day ? (
                        <button 
                          onClick={() => handleDateClick(day)}
                          className={`w-10 h-10 rounded-full transition-colors duration-200 flex items-center justify-center ${getDayClass(day)}`}
                          disabled={!isSelected(day) && (isPast(day) || vacationDaysLeft <= 0)}
                        >
                          {day}
                        </button>
                      ) : <div />}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">Reason (Optional)</label>
                <textarea
                  id="reason"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., Family vacation"
                  className="w-full p-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
              <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={selectedDates.length === 0}
                className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
              >
                Submit Request
              </button>
            </div>
          </>
        )}
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

export default RequestTimeOffModal;