import React, { useState, useMemo } from 'react';
import ShapeDiagram from './ShapeDiagram';
import InformationCircleIcon from './icons/InformationCircleIcon';
import UserIcon from './icons/UserIcon';
import PhoneIcon from './icons/PhoneIcon';
import PlusIcon from './icons/PlusIcon';
import ReorderModal from './ReorderModal';
import { getTaxRate } from './taxData';
import HardwareDetailsModal from './HardwareDetailsModal';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import TruckIcon from './icons/TruckIcon';


const DealerOrderDetail = ({ order, onBack }) => {
  const [activeTab, setActiveTab] = useState('shipping');
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [isHardwareModalOpen, setIsHardwareModalOpen] = useState(false);

  const handleConfirmReorder = ({ po, tagName }) => {
    console.log('Creating new order with:', {
      ...order,
      id: `REORDER-${Math.floor(Math.random() * 1000)}`,
      po: po,
      product: {
        ...order.product,
        tag: tagName,
      },
      placedDate: new Date().toLocaleDateString('en-CA'),
      status: 'Awaiting Approval',
      rush: false,
    });
    // The modal will now handle its own closing via the "Done" button
  };

  const skirtInfo = order.product?.skirt || '';
  const skirtLength = skirtInfo.split(' ')[0];
  const tieDown = skirtInfo.includes('(Standard)') ? 'Standard' : 'Custom';

  const taxRatePercent = useMemo(() => getTaxRate(order.shippingAddress?.province), [order.shippingAddress]);
  const originalSubtotal = useMemo(() => (order.summary?.products || 0) + (order.summary?.upgradesTotal || 0), [order.summary]);
  const calculatedTax = useMemo(() => originalSubtotal * (taxRatePercent / 100), [originalSubtotal, taxRatePercent]);
  const calculatedTotal = useMemo(() => originalSubtotal + calculatedTax, [originalSubtotal, calculatedTax]);

  const isSpaCover = order.product?.name?.toLowerCase().includes('spa');
  const isSafetyCover = order.product?.name?.toLowerCase().includes('safety');

  return (
    <div className="space-y-6">
       <div>
            <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-2">
                <span>← Back to My Orders</span>
            </button>
            <div className="flex flex-col sm:flex-row justify-between items-start">
                <div>
                    <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-bold text-gray-800">{order.id}</h1>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${order.status === 'Invoiced' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                    </div>
                    <p className="mt-1 text-gray-500">
                        Placed on {order.placedDate} | PO: {order.po} | Est. Completion: {order.dueDate}
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button onClick={() => setIsReorderModalOpen(true)} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105">
                        <PlusIcon className="h-5 w-5" />
                        <span>Re-order This Cover</span>
                    </button>
                </div>
            </div>
        </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
               <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                        <p className="text-sm text-gray-500">Est. Pickup/Ship Date: {order.pickupDate || order.dueDate}</p>
                    </div>
                    <InformationCircleIcon className="h-6 w-6 text-gray-400" />
                </div>

                <div className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-800">{order.product?.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">Tag name: {order.product?.tag}</p>

                    {isSafetyCover && order.product?.shape && (
                        <div className="my-6 bg-slate-50 p-6 rounded-lg border border-slate-200 flex justify-center items-center">
                            <ShapeDiagram
                                shape={order.product?.shape}
                                dimensions={order.product?.shapeDimensions}
                                fold={'Horizontal'}
                                className="h-64 w-auto text-indigo-600"
                            />
                        </div>
                    )}

                    {isSpaCover && order.product?.shape && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                             <div className="flex justify-center items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <ShapeDiagram
                                    shape={order.product?.shape}
                                    dimensions={order.product?.shapeDimensions}
                                    fold={"B"}
                                    className="h-48 w-auto text-indigo-600"
                                />
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <p><span className="font-semibold text-gray-700">Make/Model:</span> {order.product?.sku}</p>
                                <p><span className="font-semibold text-gray-700">Size:</span> {order.product?.dimensions}</p>
                                <p><span className="font-semibold text-gray-700">Fold:</span> {order.product?.fold}</p>
                                <p><span className="font-semibold text-gray-700">Color:</span> {order.product?.color}</p>
                                <p><span className="font-semibold text-gray-700">Taper:</span> {order.product?.taper}</p>
                                <p><span className="font-semibold text-gray-700">Skirt Length:</span> {skirtLength}</p>
                                <p><span className="font-semibold text-gray-700">Tie down:</span> {tieDown}</p>
                            </div>
                        </div>
                    )}
                    
                    {isSafetyCover && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <p><span className="font-semibold text-gray-700">Shape:</span> {order.product?.shape}</p>
                            <p><span className="font-semibold text-gray-700">Steps:</span> {order.product?.steps}</p>
                            <p><span className="font-semibold text-gray-700">Pool Size:</span> {order.product?.poolSize}</p>
                            <p><span className="font-semibold text-gray-700">Cover Size:</span> {order.product?.coverSize}</p>
                            <p><span className="font-semibold text-gray-700">Deck Type:</span> {order.product?.deckType}</p>
                            <p><span className="font-semibold text-gray-700">Mesh Type:</span> {order.product?.meshType}</p>
                            <p><span className="font-semibold text-gray-700">Grid Type:</span> {order.product?.gridType}</p>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-700">Hardware Details:</span>
                                <button onClick={() => setIsHardwareModalOpen(true)} className="flex items-center space-x-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md">
                                    <WrenchScrewdriverIcon className="h-4 w-4" />
                                    <span>View Hardware</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {order.product?.upgrades && order.product?.upgrades.length > 0 && (
                        <div className="mt-6 border-t border-slate-200 pt-4">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Additional Upgrades</h4>
                            <ul className="space-y-1 text-gray-600 text-sm">
                                {order.product.upgrades.map((upgrade, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{upgrade.name}</span>
                                        <span className="font-medium text-gray-800">${upgrade.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                <button onClick={() => setActiveTab('shipping')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === 'shipping' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  Shipping Details
                </button>
                <button onClick={() => setActiveTab('billing')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === 'billing' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  Billing Details
                </button>
              </nav>
            </div>
            {activeTab === 'shipping' && (
                <div className="p-6 space-y-6">
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Shipping Address</h4>
                        <p className="font-bold text-gray-800">{order.shippingAddress?.company}</p>
                        <address className="text-sm text-gray-600 not-italic">
                            {order.shippingAddress?.street}<br />
                            {`${order.shippingAddress?.city}, ${order.shippingAddress?.province} ${order.shippingAddress?.postalCode}`}<br />
                            {order.shippingAddress?.country}
                        </address>
                         <div className="mt-2 space-y-1 text-sm">
                            <p className="flex items-center"><UserIcon className="h-4 w-4 mr-2 text-gray-400"/> {order.shippingAddress?.contactName}</p>
                            <p className="flex items-center"><PhoneIcon className="h-4 w-4 mr-2 text-gray-400"/> {order.shippingAddress?.phone}</p>
                        </div>
                    </div>
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Shipping Method</h4>
                         <div className="flex items-center text-sm text-gray-600">
                            <TruckIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0"/>
                            <div>
                                <p>{order.shippingDetails?.method}</p>
                                {order.shippingDetails?.carrierContact && <p>Carrier/Contact: <span className="font-bold text-gray-800">{order.shippingDetails?.carrierContact}</span></p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'billing' && (
                <div className="p-6 space-y-6">
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Billing Address</h4>
                        <p className="font-bold text-gray-800">{order.billingAddress?.company}</p>
                        <address className="text-sm text-gray-600 not-italic">
                            {order.billingAddress?.street}<br />
                            {`${order.billingAddress?.city}, ${order.billingAddress?.province} ${order.billingAddress?.postalCode}`}<br />
                            {order.billingAddress?.country}
                        </address>
                        <div className="mt-2 space-y-1 text-sm">
                            <p className="flex items-center"><UserIcon className="h-4 w-4 mr-2 text-gray-400"/> {order.billingAddress?.contactName}</p>
                            <p className="flex items-center"><PhoneIcon className="h-4 w-4 mr-2 text-gray-400"/> {order.billingAddress?.phone}</p>
                        </div>
                    </div>
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Order Summary</h4>
                        <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Products ({order.summary?.quantity} x ${order.summary?.unitPrice.toFixed(2)})</span>
                                <span className="font-medium text-gray-800">${order.summary?.products.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-gray-600">Upgrades</span>
                                <span className="font-medium text-gray-800">${order.summary?.upgradesTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t mt-1">
                                <span className="text-gray-600 font-semibold">Subtotal</span>
                                <span className="font-semibold text-gray-800">${originalSubtotal.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-gray-600">Tax <span className="text-gray-400">({taxRatePercent}%)</span></span>
                                <span className="font-medium text-gray-800">${calculatedTax.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between pt-2 border-t mt-1 font-bold text-gray-900">
                                <span>Total (incl tax)</span>
                                <span>${calculatedTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      
      {isReorderModalOpen && <ReorderModal order={order} onClose={() => setIsReorderModalOpen(false)} onConfirm={handleConfirmReorder} />}
      {isHardwareModalOpen && <HardwareDetailsModal isOpen={isHardwareModalOpen} onClose={() => setIsHardwareModalOpen(false)} hardware={order.product?.hardware} orderId={order.id} />}
    </div>
  );
};

export default DealerOrderDetail;