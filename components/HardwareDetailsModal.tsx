import React from 'react';
import XIcon from './icons/XIcon';
import PrinterIcon from './icons/PrinterIcon';

interface HardwareDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  hardware: { name: string; qty: number }[];
  orderId: string;
}

const HardwareDetailsModal: React.FC<HardwareDetailsModalProps> = ({ isOpen, onClose, hardware, orderId }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-gray-800">Hardware for {orderId}</h2>
            <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <ul className="divide-y divide-slate-200">
              {(hardware || []).map((item, index) => (
                <li key={index} className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    Qty: {item.qty}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
            <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
              Close
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
            >
              <PrinterIcon className="h-5 w-5" />
              <span>Print 4x6 Label</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Area */}
      <div id="print-area" className="hidden print:block font-sans">
        <div className="print-content">
          <h1 className="text-3xl font-bold mb-4">Order: {orderId}</h1>
          <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Hardware List</h2>
          <ul className="text-lg space-y-2">
            {(hardware || []).map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="font-bold text-xl">x {item.qty}</span>
              </li>
            ))}
          </ul>
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
        @media print {
          body * {
            visibility: hidden;
            margin: 0;
            padding: 0;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 4in;
            height: 6in;
            box-sizing: border-box;
          }
          .print-content {
            padding: 0.25in;
            box-sizing: border-box;
            height: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default HardwareDetailsModal;