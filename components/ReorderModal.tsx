import React, { useState } from 'react';
import XIcon from './icons/XIcon';
import PlusIcon from './icons/PlusIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

const ReorderModal = ({ order, onClose, onConfirm }) => {
  const [newPoNumber, setNewPoNumber] = useState('');
  const [newTagName, setNewTagName] = useState(order.product?.tag || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [eta, setEta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ po: newPoNumber, tagName: newTagName });
    
    // Calculate ETA
    const isSpaCover = order.product?.name?.toLowerCase().includes('spa');
    const leadTimeDays = isSpaCover ? 21 : 42; // 3 weeks for spa, 6 for safety
    const etaDate = new Date();
    etaDate.setDate(etaDate.getDate() + leadTimeDays);
    const formattedEta = etaDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    setEta(formattedEta);
    
    setIsSubmitted(true);
  };

  const product = order.product || {};
  const price = (order.summary?.products || 0) + (order.summary?.upgradesTotal || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-gray-800">{isSubmitted ? 'Order Placed!' : 'Create Re-order'}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {isSubmitted ? (
            <>
                <div className="p-8 text-center flex flex-col items-center space-y-4">
                    <CheckCircleIcon className="h-16 w-16 text-green-500" />
                    <p className="text-lg text-gray-700 max-w-sm mx-auto">
                        Your re-order has been placed successfully.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg w-full">
                        <p className="font-semibold text-gray-800">Estimated Completion Date:</p>
                        <p className="text-xl font-bold text-gray-900">{eta}</p>
                    </div>
                </div>
                <div className="flex justify-center p-6 bg-slate-50 rounded-b-2xl">
                    <button 
                        onClick={onClose} 
                        className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Done
                    </button>
                </div>
            </>
        ) : (
            <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">Copying details from Order #{order.id}</p>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <p className="text-sm"><span className="font-semibold text-gray-700">Dimensions:</span> {product.dimensions}</p>
                    <p className="text-sm"><span className="font-semibold text-gray-700">Fold:</span> {product.fold}</p>
                    <p className="text-sm"><span className="font-semibold text-gray-700">Color:</span> {product.color}</p>
                    <p className="text-sm"><span className="font-semibold text-gray-700">Taper:</span> {product.taper}</p>
                    </div>
                    
                    <div className="text-center bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-700">Current Price (Subtotal)</p>
                    <p className="text-3xl font-bold text-green-800 mt-1 transition-all duration-300">${price.toFixed(2)}</p>
                    </div>

                    <div>
                    <label htmlFor="po-number" className="block text-sm font-semibold text-gray-700 mb-2">
                        New PO Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="po-number"
                        type="text"
                        value={newPoNumber}
                        onChange={(e) => setNewPoNumber(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                        placeholder="Enter customer PO number"
                    />
                    </div>
                    <div>
                    <label htmlFor="tag-name" className="block text-sm font-semibold text-gray-700 mb-2">
                        New Tag Name
                    </label>
                    <input
                        id="tag-name"
                        type="text"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        className="w-full p-3 bg-white border border-slate-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        placeholder="Enter tag/customer name for production"
                    />
                    </div>
                </div>

                <div className="flex justify-end items-center p-6 bg-slate-50 rounded-b-2xl space-x-4">
                    <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    <PlusIcon className="h-5 w-5" />
                    <span>Confirm Re-order</span>
                    </button>
                </div>
            </form>
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

export default ReorderModal;