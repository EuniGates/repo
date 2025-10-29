import React, { useState, useMemo } from 'react';
import XIcon from './icons/XIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';

interface EmailModalProps {
  onClose: () => void;
  customerEmail: string;
  orderId?: string; // Optional for warranty page
  initialSelection?: string[]; // For warranty page
  warrantyName?: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ onClose, customerEmail, orderId, initialSelection = [], warrantyName }) => {
  const [selectedDocs, setSelectedDocs] = useState<string[]>(initialSelection);
  const [recipientEmail, setRecipientEmail] = useState(customerEmail);

  const emailableDocuments = useMemo(() => {
    const docs = [
      'Order Confirmation',
      'Invoice',
      'Shipping Confirmation',
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

  const handleSend = () => {
    if (selectedDocs.length > 0 && recipientEmail) {
      alert(`Emailing to ${recipientEmail}:\n- ${selectedDocs.join('\n- ')}`);
      onClose();
    } else {
      alert('Please select at least one document and enter a recipient email.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">Email Documents</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="email-recipient" className="block text-sm font-semibold text-gray-700 mb-2">Recipient Email</label>
            <input 
              id="email-recipient"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full p-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-3">Choose which documents you would like to email.</p>
            <div className="space-y-3">
              {emailableDocuments.map(doc => (
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
        </div>

        <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
          <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSend}
            disabled={selectedDocs.length === 0 || !recipientEmail}
            className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            <EnvelopeIcon className="h-5 w-5" />
            <span>Send Email</span>
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

export default EmailModal;