import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';

interface WarrantyClaimModalProps {
  onClose: () => void;
  onSubmit: (details: { reason: string; replacementType: string }) => void;
}

const claimReasons = [
  "Water Logged",
  "Seam Separation",
  "Vinyl Discoloration / Fading",
  "Torn Handle or Tie Down",
  "Broken Lock Clip",
  "Other",
];

const replacementTypes = [
  "Full Cover",
  "Skin Only",
  "1 Foam Insert",
  "2 Foam Inserts",
];

const WarrantyClaimModal: React.FC<WarrantyClaimModalProps> = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState(claimReasons[0]);
  const [replacementType, setReplacementType] = useState(replacementTypes[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ reason, replacementType });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">Submit Warranty Claim</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="claimReason" className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Claim
              </label>
              <select
                id="claimReason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {claimReasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Replacement Part Needed
              </label>
              <div className="space-y-2">
                {replacementTypes.map(type => (
                  <label key={type} className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                    <input
                      type="radio"
                      name="replacementType"
                      value={type}
                      checked={replacementType === type}
                      onChange={() => setReplacementType(type)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 font-medium text-gray-800">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100">
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ClipboardCheckIcon className="h-5 w-5" />
              <span>Submit Claim</span>
            </button>
          </div>
        </form>
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

export default WarrantyClaimModal;
