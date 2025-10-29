
import React, { useState, useMemo } from 'react';
import XIcon from './icons/XIcon';
import PrinterIcon from './icons/PrinterIcon';

interface PrintModalProps {
  onClose: () => void;
  warrantyName?: string;
}

const PrintModal: React.FC<PrintModalProps> = ({ onClose, warrantyName }) => {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const printableDocuments = useMemo(() => {
    const docs = [
      'Order Confirmation',
      'Production Work Order',
      'Shipping Labels',
      'Invoice',
    ];
    if (warrantyName) {
      docs.push(`Warranty Certificate (${warrantyName})`);
    } else {
      docs.push('Warranty Certificate');
    }
    return docs;
  }, [warrantyName]);

  const handleCheckboxChange = (docName: string) => {
    setSelectedDocs(prev => 
      prev.includes(docName) 
        ? prev.filter(d => d !== docName)
        : [...prev, docName]
    );
  };

  const handlePrint = () => {
    if (selectedDocs.length > 0) {
      // In a real app, this would trigger the browser's print dialog
      // for the selected documents.
      alert(`Printing:\n- ${selectedDocs.join('\n- ')}`);
      onClose();
    } else {
      alert('Please select at least one document to print.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">Select Documents to Print</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">Choose which documents you would like to print for this order.</p>
          <div className="space-y-3">
            {printableDocuments.map(doc => (
              <label key={doc} className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDocs.includes(doc)}
                  onChange={() => handleCheckboxChange(doc)}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-3 font-medium text-gray-800">{doc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
          <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handlePrint}
            disabled={selectedDocs.length === 0}
            className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            <PrinterIcon className="h-5 w-5" />
            <span>Print Selected</span>
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

export default PrintModal;