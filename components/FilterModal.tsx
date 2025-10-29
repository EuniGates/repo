import React, { useState, useEffect } from 'react';
import XIcon from './icons/XIcon';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  metricTitle: string;
  metricValue: string;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, metricTitle, metricValue }) => {
  const [filterType, setFilterType] = useState<'week' | 'month' | 'year'>('month');
  const [displayValue, setDisplayValue] = useState(metricValue);

  useEffect(() => {
    if (isOpen) {
      setDisplayValue(metricValue);
      setFilterType('month');
    }
  }, [isOpen, metricValue]);

  if (!isOpen) return null;

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayValue('...');
    
    setTimeout(() => {
      const baseValue = parseFloat(metricValue.replace(/[^0-9.-]+/g,""));
      const randomFactor = 0.8 + Math.random() * 0.4;
      const newValue = baseValue * randomFactor;
      
      const formattedNewValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(newValue);
      
      setDisplayValue(formattedNewValue);
    }, 300);
  };

  const renderDropdownOptions = () => {
    switch (filterType) {
      case 'week':
        return ['This Week', 'Last Week', 'Week of 10/21', 'Week of 10/14'].map(o => <option key={o}>{o}</option>);
      case 'month':
        return ['This Month', 'Last Month', 'October', 'September'].map(o => <option key={o}>{o}</option>);
      case 'year':
        return ['2024', '2023', '2022'].map(o => <option key={o}>{o}</option>);
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">Filter {metricTitle}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm font-medium text-gray-500">{metricTitle} (Filtered)</p>
            <p className="text-4xl font-bold text-indigo-600 mt-1 transition-all duration-300">{displayValue}</p>
          </div>

          <div>
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setFilterType('week')}
                className={`flex-1 py-2 text-sm font-semibold transition-colors text-center ${filterType === 'week' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Week
              </button>
              <button
                onClick={() => setFilterType('month')}
                className={`flex-1 py-2 text-sm font-semibold transition-colors text-center ${filterType === 'month' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Month
              </button>
              <button
                onClick={() => setFilterType('year')}
                className={`flex-1 py-2 text-sm font-semibold transition-colors text-center ${filterType === 'year' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`}
              >
                Year
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="filter-value" className="block text-sm font-medium text-gray-700 mb-2">
              Select {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </label>
            <select
              id="filter-value"
              onChange={handleFilterChange}
              className="w-full p-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            >
              {renderDropdownOptions()}
            </select>
          </div>
        </div>

        <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
          <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          >
            Apply Filter
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

export default FilterModal;