
import React, { useState } from 'react';
import ShapeDiagram from './ShapeDiagram';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

const shapes = [
    { name: 'Square/rectangle with Rounded Corners', dims: ['A', 'B', 'C'] },
    { name: 'Round', dims: ['A'] },
    { name: 'Square/rectangle with Cut Corners', dims: ['A', 'B', 'C'] },
    { name: 'Square/rectangle', dims: ['A', 'B'] },
    { name: 'One Cut Left Corner', dims: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { name: 'One Cut Right Corner', dims: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { name: 'Two Cut Corners', dims: ['A', 'B', 'C', 'D', 'E', 'F'] },
    { name: 'Octagon', dims: ['A', 'B', 'C'] },
    { name: 'Custom Shape Template', custom: true },
    { name: 'Side by Side Speakers', speaker: true },
    { name: 'Two Diagonal Speakers', speaker: true },
    { name: 'Four Speakers', speaker: true },
];

const OrderCreation: React.FC<{setActivePage: (page: string) => void;}> = ({ setActivePage }) => {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
      shape: '',
      dimensions: {},
      fold: 'Horizontal',
      color: 'Charcoal',
      taper: '4"-3"',
      skirt: '4"',
      ties: '4',
      handles: '2',
      notes: ''
  });

  const handleShapeSelect = (shapeName: string) => {
    setOrder(prev => ({ ...prev, shape: shapeName, dimensions: {} }));
    setStep(2);
  };

  const handleDimensionChange = (dim: string, value: string) => {
      setOrder(prev => ({
          ...prev,
          dimensions: { ...prev.dimensions, [dim]: value }
      }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setOrder(prev => ({ ...prev, [name]: value }));
  };

  const progress = (step / 4) * 100;

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm max-w-5xl mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create New Spa Cover Order</h1>
            <div className="mt-4">
                <div className="bg-slate-200 rounded-full h-2">
                    <div className="bg-indigo-600 rounded-full h-2" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                </div>
                 <p className="text-sm text-right text-gray-500 mt-1">Step {step} of 4</p>
            </div>
        </div>

        {step === 1 && (
            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Step 1: Select a Shape</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {shapes.map(shape => (
                        <button key={shape.name} onClick={() => handleShapeSelect(shape.name)} className="border-2 border-slate-200 rounded-lg p-4 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
                             <div className="h-24 w-full flex items-center justify-center">
                                 <ShapeDiagram shape={shape.name} dimensions={{}} className="h-full w-auto text-slate-400 group-hover:text-indigo-600 transition-colors" />
                             </div>
                            <p className="text-sm font-semibold text-gray-700 mt-2 group-hover:text-indigo-800">{shape.name}</p>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {step === 2 && (
            <div>
                 <h2 className="text-2xl font-semibold text-gray-700 mb-6">Step 2: Enter Dimensions & Fold</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="p-4 border rounded-lg bg-slate-50">
                            <ShapeDiagram shape={order.shape} dimensions={order.dimensions} fold={order.fold} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {shapes.find(s => s.name === order.shape)?.dims?.map(dim => (
                             <div key={dim}>
                                <label className="block text-sm font-semibold text-gray-700">Dimension {dim}</label>
                                <input type="text" onChange={e => handleDimensionChange(dim, e.target.value)} placeholder="Inches" className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md"/>
                            </div>
                        ))}
                        <div>
                             <label className="block text-sm font-semibold text-gray-700">Fold Direction</label>
                             <select name="fold" value={order.fold} onChange={handleOptionChange} className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md">
                                <option>Horizontal Line</option>
                                <option>Vertical Line</option>
                             </select>
                        </div>
                    </div>
                 </div>
            </div>
        )}

        {step === 3 && (
             <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Step 3: Choose Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     {/* Options selectors */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Cover Color</label>
                        <select name="color" value={order.color} onChange={handleOptionChange} className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md">
                            <option>Charcoal</option><option>Black</option><option>Chocolate</option><option>Light Grey</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700">Taper</label>
                        <select name="taper" value={order.taper} onChange={handleOptionChange} className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md">
                           <option>4"-3"</option><option>5"-3"</option><option>5"-4"</option><option>6"-4"</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700">Skirt Length</label>
                        <select name="skirt" value={order.skirt} onChange={handleOptionChange} className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md">
                           <option>4"</option><option>5"</option><option>6"</option><option>7"</option><option>8"</option><option>9"</option><option>10"</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700">Number of Ties</label>
                        <input type="number" name="ties" value={order.ties} onChange={handleOptionChange} className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md" />
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700">Number of Handles</label>
                        <input type="number" name="handles" value={order.handles} onChange={handleOptionChange} className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700">Notes</label>
                        <textarea name="notes" value={order.notes} onChange={handleOptionChange} rows={4} className="mt-1 w-full p-2 bg-white border border-slate-300 rounded-md"></textarea>
                    </div>
                </div>
             </div>
        )}

        {step === 4 && (
            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Step 4: Review Order</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4 border rounded-lg bg-slate-50 flex items-center justify-center">
                        <ShapeDiagram shape={order.shape} dimensions={order.dimensions} fold={order.fold} />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold">Order Summary</h3>
                        <p><strong>Shape:</strong> {order.shape}</p>
                        <p><strong>Dimensions:</strong> {Object.entries(order.dimensions).map(([k,v]) => `${k}: ${v}"`).join(', ')}</p>
                        <p><strong>Fold:</strong> {order.fold}</p>
                        <p><strong>Color:</strong> {order.color}</p>
                        <p><strong>Taper:</strong> {order.taper}</p>
                        <p><strong>Skirt:</strong> {order.skirt}</p>
                        <p><strong>Ties:</strong> {order.ties}</p>
                        <p><strong>Handles:</strong> {order.handles}</p>
                        {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
                    </div>
                </div>
            </div>
        )}

        <div className="mt-8 pt-6 border-t flex justify-between items-center">
             <button onClick={() => setStep(s => Math.max(1, s-1))} disabled={step === 1} className="flex items-center space-x-2 px-6 py-2 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                 <ChevronLeftIcon className="h-5 w-5"/>
                 <span>Back</span>
             </button>
             {step < 4 ? (
                <button onClick={() => setStep(s => Math.min(4, s+1))} className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                    Next Step &rarr;
                </button>
             ) : (
                <button onClick={() => setActivePage('Orders Dashboard')} className="px-8 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                    Place Order
                </button>
             )}
        </div>
    </div>
  );
};

export default OrderCreation;
