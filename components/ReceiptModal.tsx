import React from 'react';
import XIcon from './icons/XIcon';

interface ReceiptModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale p-4 relative" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute -top-3 -right-3 p-2 rounded-full bg-white text-gray-600 hover:bg-slate-200 shadow-lg z-10">
                    <XIcon className="h-6 w-6" />
                </button>
                <img src={imageUrl} alt="Customer Receipt" className="max-w-full max-h-[80vh] rounded-md mx-auto" />
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

export default ReceiptModal;