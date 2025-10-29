import React, { useState, useMemo, useEffect } from 'react';
import XIcon from './icons/XIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import WaveIcon from './icons/WaveIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import ShapeDiagram from './ShapeDiagram';
import { getTaxRate } from './taxData';
import CheckCircleIcon from './icons/CheckCircleIcon';

const SPA_PRICING = {
    tapers: [
      { value: '4"-3"', price: 312.00 },
      { value: '5"-3"', price: 320.00 },
      { value: '5"-4"', price: 341.00 },
      { value: '6"-4"', price: 372.75 },
    ],
    skirts: {
      standardPrice: 0.00, // up to 4"
      upgradePrice: 15.00, // 4.5" to 10"
    },
    upgrades: {
      fullHinge: { label: "Full Hinge Insulation", price: 25.00 },
      vapourBarrier: { label: "6 Mil Vapour Barrier", price: 15.00 },
      extraTie: { price: 5.00 }, // Price per extra tie
      extraHandle: { price: 7.50 }, // Price per extra handle, (15/2)
      speakerHoods: { label: "Speaker Hoods", price: 0, note: "Call for quote" },
    }
};

const OrderCreationModal = ({ customers, onClose, onAddOrder, dealerName = null, initialData = null }) => {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [eta, setEta] = useState('');
    const [finalOrderData, setFinalOrderData] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(dealerName || '');
    const [productType, setProductType] = useState<'Spa Cover' | 'Safety Cover' | null>(null);
    const [formData, setFormData] = useState({
        poNumber: '',
        tagName: '',
        shape: 'Square/rectangle with Rounded Corners',
        dimensionA: '',
        dimensionB: '',
        foldDirection: 'Horizontal',
        foldType: 'Bi-Fold (Standard)',
        color: 'Charcoal',
        taper: '5"-4"',
        skirt: '4',
        ties: '4',
        handles: '2',
        upgrades: {
            fullHinge: false,
            vapourBarrier: false,
            speakerHoods: false,
        },
        notes: '',
        poolSize: '',
        coverSize: '',
        deckType: 'Concrete',
        meshType: 'Standard Green',
        gridType: "5'x5' Grid",
        rush: false,
    });
    
    useEffect(() => {
        if (initialData) {
            if (initialData.customer) {
                setSelectedCustomer(initialData.customer);
            }
            if (initialData.productType) {
                setProductType(initialData.productType);
                setStep(3); // Skip customer and product selection
            }
        } else if (dealerName) {
            setStep(2); // Skip customer selection for dealer
        }
    }, [initialData, dealerName]);

    const isDealerFlow = !!dealerName;
    const totalSteps = isDealerFlow ? 3 : 4;

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => {
        if (isDealerFlow && step === 2) {
            onClose(); // Go back from product select should close modal for dealer
        } else {
            setStep(s => s - 1);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpgradeChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            upgrades: {
                ...prev.upgrades,
                [name]: checked
            }
        }));
    };

    const totalPrice = useMemo(() => {
        if (productType !== 'Spa Cover') return 0;

        let total = 0;
        const selectedTaper = SPA_PRICING.tapers.find(t => t.value === formData.taper);
        if (selectedTaper) {
            total += selectedTaper.price;
        }

        const skirtValue = parseFloat(formData.skirt);
        if (skirtValue > 4) {
            total += SPA_PRICING.skirts.upgradePrice;
        }
        
        if (formData.upgrades?.fullHinge) {
            total += SPA_PRICING.upgrades.fullHinge.price;
        }
        if (formData.upgrades?.vapourBarrier) {
            total += SPA_PRICING.upgrades.vapourBarrier.price;
        }

        const numTies = parseInt(formData.ties, 10);
        if (numTies > 4) {
            total += (numTies - 4) * SPA_PRICING.upgrades.extraTie.price;
        }

        const numHandles = parseInt(formData.handles, 10);
        if (numHandles > 2) {
            total += (numHandles - 2) * SPA_PRICING.upgrades.extraHandle.price;
        }

        return total;
    }, [formData, productType]);

    const handleSubmit = () => {
        const now = new Date();
        const leadTime = productType === 'Spa Cover' ? 21 : 42;
        const etaDate = new Date(now.getTime() + leadTime * 24 * 60 * 60 * 1000);
        setEta(etaDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
        
        const dueDate = new Date(now.getTime() + leadTime * 24 * 60 * 60 * 1000);

        const newOrder = {
            id: `NEW-${Math.floor(Math.random() * 1000)}`,
            status: 'Awaiting Approval',
            placedDate: now.toISOString().split('T')[0],
            po: formData.poNumber,
            dueDate: dueDate.toISOString().split('T')[0],
            customer: selectedCustomer,
            type: productType,
            product: {
                name: productType === 'Spa Cover' ? 'Custom Spa Cover' : 'Custom Safety Cover',
                tag: formData.tagName,
                ...formData, // Note: This will need refinement to match order structure
                fold: `${formData.foldType} | ${formData.foldDirection}`,
                dimensions: productType === 'Spa Cover' ? `${formData.dimensionA}" x ${formData.dimensionB}"` : '',
            },
            summary: {
                products: totalPrice,
                upgradesTotal: 0, // Simplified for now
            },
            billingAddress: { company: selectedCustomer, province: 'ON' }, 
            shippingAddress: { company: selectedCustomer, province: 'ON' },
            activity: [{ user: isDealerFlow ? 'Dealer User' : 'Admin User', action: 'created the order', timestamp: now.toLocaleString() }],
            rush: formData.rush,
        };
        setFinalOrderData(newOrder);
        setIsSubmitted(true);
    };

    const progress = isDealerFlow ? ((step - 1) / totalSteps) * 100 : (step / totalSteps) * 100;

    const renderStep1 = () => (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Select a Customer</h3>
            <p className="text-sm text-gray-600 mb-4">For which customer are you creating this order?</p>
            <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full p-3 bg-slate-100 border border-slate-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">-- Choose a customer --</option>
                {customers.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
        </>
    );

    const renderStep2 = () => (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step {isDealerFlow ? 1 : 2}: Choose Product Type</h3>
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => { setProductType('Spa Cover'); handleNext(); }}
                    className="flex flex-col items-center justify-center p-6 border-2 border-slate-200 rounded-lg text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                >
                    <WaveIcon className="h-12 w-12 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    <p className="text-lg font-semibold text-gray-700 mt-2 group-hover:text-indigo-800">Spa Cover</p>
                </button>
                 <button 
                    onClick={() => { setProductType('Safety Cover'); handleNext(); }}
                    className="flex flex-col items-center justify-center p-6 border-2 border-slate-200 rounded-lg text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                >
                    <ShieldCheckIcon className="h-12 w-12 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    <p className="text-lg font-semibold text-gray-700 mt-2 group-hover:text-indigo-800">Safety Cover</p>
                </button>
            </div>
        </>
    );
    
    const renderSpaCoverForm = () => (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step {isDealerFlow ? 2 : 3}: Spa Cover Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Your PO Number" name="poNumber" value={formData.poNumber} onChange={handleFormChange} required />
                        <InputField label="Customer/Tag Name" name="tagName" value={formData.tagName} onChange={handleFormChange} />
                         <div className="col-span-2">
                             <SelectField label="Shape" name="shape" value={formData.shape} onChange={handleFormChange} options={["Square/rectangle with Rounded Corners", "Round", "Square/rectangle with Cut Corners", "Square/rectangle", "Octagon", "Custom Shape Template"]} />
                        </div>
                        <InputField label="Dimension A (inches)" name="dimensionA" type="number" value={formData.dimensionA} onChange={handleFormChange} required />
                        <InputField label="Dimension B (inches)" name="dimensionB" type="number" value={formData.dimensionB} onChange={handleFormChange} />
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Taper</label>
                            <select name="taper" value={formData.taper} onChange={handleFormChange} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg">
                                {SPA_PRICING.tapers.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {`${opt.value} Taper (+$${opt.price.toFixed(2)})`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Skirt Length</label>
                            <select name="skirt" value={formData.skirt} onChange={handleFormChange} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg">
                                {[...Array(7).keys()].map(i => {
                                    const length = i + 4;
                                    const priceText = length <= 4 ? `(Standard)` : `(+$${SPA_PRICING.skirts.upgradePrice.toFixed(2)})`;
                                    return <option key={length} value={length}>{`${length}" ${priceText}`}</option>;
                                })}
                            </select>
                        </div>
                        
                        <SelectField label="Color" name="color" value={formData.color} onChange={handleFormChange} options={["Charcoal", "Black", "Chocolate", "Light Grey"]} />
                        
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Ties</label>
                            <select name="ties" value={formData.ties} onChange={handleFormChange} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg">
                                <option value="4">4 Ties (Standard)</option>
                                {[...Array(3).keys()].map(i => {
                                    const extraTies = (i + 1) * 2;
                                    const totalTies = 4 + extraTies;
                                    const price = extraTies * SPA_PRICING.upgrades.extraTie.price;
                                    return <option key={totalTies} value={totalTies}>{`${totalTies} Ties (${extraTies} Extra, +$${price.toFixed(2)})`}</option>
                                })}
                            </select>
                        </div>
                        
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Handles</label>
                            <select name="handles" value={formData.handles} onChange={handleFormChange} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg">
                                <option value="2">2 Handles (Standard)</option>
                                <option value="4">{`4 Handles (2 Extra, +$${(2 * SPA_PRICING.upgrades.extraHandle.price).toFixed(2)})`}</option>
                                <option value="6">{`6 Handles (4 Extra, +$${(4 * SPA_PRICING.upgrades.extraHandle.price).toFixed(2)})`}</option>
                            </select>
                        </div>

                        <SelectField label="Fold Type" name="foldType" value={formData.foldType} onChange={handleFormChange} options={["Bi-Fold (Standard)", "Tri-Fold (Call for quote)", "Quad-Fold (Call for quote)"]} />
                        
                        {formData.foldType === 'Bi-Fold (Standard)' && (
                            <SelectField label="Fold Direction" name="foldDirection" value={formData.foldDirection} onChange={handleFormChange} options={["Horizontal", "Vertical"]} />
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Upgrades</label>
                        <div className="space-y-2">
                            <CheckboxField 
                                name="fullHinge" 
                                label={`${SPA_PRICING.upgrades.fullHinge.label} (+$${SPA_PRICING.upgrades.fullHinge.price.toFixed(2)})`} 
                                checked={formData.upgrades?.fullHinge} 
                                onChange={handleUpgradeChange} 
                            />
                            <CheckboxField 
                                name="vapourBarrier" 
                                label={`${SPA_PRICING.upgrades.vapourBarrier.label} (+$${SPA_PRICING.upgrades.vapourBarrier.price.toFixed(2)})`} 
                                checked={formData.upgrades?.vapourBarrier} 
                                onChange={handleUpgradeChange} 
                            />
                            <CheckboxField 
                                name="speakerHoods" 
                                label={`${SPA_PRICING.upgrades.speakerHoods.label} (${SPA_PRICING.upgrades.speakerHoods.note})`} 
                                checked={formData.upgrades?.speakerHoods} 
                                onChange={handleUpgradeChange} 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                        <textarea name="notes" value={formData.notes} onChange={handleFormChange} rows={3} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg"></textarea>
                    </div>

                    <div className="mt-4">
                        <div className="text-center bg-green-50 p-4 rounded-lg border border-green-200">
                            <p className="text-sm font-medium text-green-700">Estimated Price (Subtotal)</p>
                            <p className="text-3xl font-bold text-green-800 mt-1">${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 flex flex-col items-center justify-start space-y-4">
                     <div className="p-4 border rounded-lg bg-slate-50 w-full">
                        <ShapeDiagram 
                            shape={formData.shape} 
                            dimensions={{ A: formData.dimensionA, B: formData.dimensionB }} 
                            fold={formData.foldDirection}
                            className="w-full h-auto text-indigo-600"
                        />
                    </div>
                    <p className="text-sm text-gray-500">Live Preview</p>
                </div>
            </div>
        </>
    );

    const renderSafetyCoverForm = () => (
         <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step {isDealerFlow ? 2 : 3}: Safety Cover Details</h3>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Your PO Number" name="poNumber" value={formData.poNumber} onChange={handleFormChange} required />
                <InputField label="Customer/Tag Name" name="tagName" value={formData.tagName} onChange={handleFormChange} />
                <SelectField label="Shape" name="shape" value={formData.shape} onChange={handleFormChange} options={["Rectangle", "Grecian", "Freeform", "Custom (A-B)"]} />
                <InputField label="Pool Size (e.g., 16'x32')" name="poolSize" value={formData.poolSize} onChange={handleFormChange} required />
                <InputField label="Cover Size (e.g., 18'x34')" name="coverSize" value={formData.coverSize} onChange={handleFormChange} required />
                <SelectField label="Deck Type" name="deckType" value={formData.deckType} onChange={handleFormChange} options={["Concrete", "Wood Deck", "Interlock"]} />
                <SelectField label="Mesh Type" name="meshType" value={formData.meshType} onChange={handleFormChange} options={["Standard Green", "High-Shade Black"]} />
                <SelectField label="Grid Type" name="gridType" value={formData.gridType} onChange={handleFormChange} options={["5'x5' Grid", "3'x3' Grid"]} />
                 <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleFormChange} rows={3} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg"></textarea>
                </div>
            </div>
        </>
    );
    
    const renderReview = () => {
        const FREIGHT_COST = 85.00;
        const customerDetails = customers.find(c => c.name === selectedCustomer);
        const province = customerDetails?.province || 'ON'; // Default to ON if not found
        const taxRate = getTaxRate(province);
        const taxAmount = totalPrice * (taxRate / 100);
        const finalTotal = totalPrice + FREIGHT_COST + taxAmount;

        const upgradesList = Object.entries(formData.upgrades || {})
            .filter(([, value]) => value)
            .map(([key]) => {
                if (key === 'fullHinge') return SPA_PRICING.upgrades.fullHinge.label;
                if (key === 'vapourBarrier') return SPA_PRICING.upgrades.vapourBarrier.label;
                if (key === 'speakerHoods') return SPA_PRICING.upgrades.speakerHoods.label;
                return null;
            })
            .filter(Boolean).join(', ');

        return (
             <>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Step {isDealerFlow ? 3 : 4}: Review and Submit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-slate-50 p-4 rounded-lg border max-h-[50vh] overflow-y-auto">
                        <ReviewItem label="Customer" value={selectedCustomer} />
                        <ReviewItem label="Product" value={productType} />
                        <ReviewItem label="PO Number" value={formData.poNumber} />
                        <ReviewItem label="Tag Name" value={formData.tagName} />
                        
                        {productType === 'Spa Cover' && (
                            <>
                                <ReviewItem label="Shape" value={formData.shape} />
                                <ReviewItem label="Dimensions" value={`${formData.dimensionA}" x ${formData.dimensionB}"`} />
                                <ReviewItem label="Taper" value={formData.taper} />
                                <ReviewItem label="Skirt" value={`${formData.skirt}"`} />
                                <ReviewItem label="Ties" value={formData.ties} />
                                <ReviewItem label="Handles" value={formData.handles} />
                                <ReviewItem label="Color" value={formData.color} />
                                <ReviewItem label="Fold Type" value={formData.foldType} />
                                {formData.foldType === 'Bi-Fold (Standard)' && <ReviewItem label="Fold Direction" value={formData.foldDirection} />}
                                <ReviewItem label="Upgrades" value={upgradesList || 'None'} />
                                <ReviewItem label="Notes" value={formData.notes || 'N/A'} isBlock={true} />
                                
                                <div className="pt-3 border-t mt-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <p className="text-gray-600">Subtotal</p>
                                        <p className="font-medium text-gray-800">${totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <p className="text-gray-600">Freight (Est.)</p>
                                        <p className="font-medium text-gray-800">${FREIGHT_COST.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <p className="text-gray-600">Tax ({taxRate}%)</p>
                                        <p className="font-medium text-gray-800">${taxAmount.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                                        <p>Total</p>
                                        <p>${finalTotal.toFixed(2)}</p>
                                    </div>
                                </div>
                            </>
                        )}

                        {productType === 'Safety Cover' && (
                             <>
                                <ReviewItem label="Shape" value={formData.shape} />
                                <ReviewItem label="Pool Size" value={formData.poolSize} />
                                <ReviewItem label="Cover Size" value={formData.coverSize} />
                                <ReviewItem label="Deck Type" value={formData.deckType} />
                                <ReviewItem label="Mesh Type" value={formData.meshType} />
                                <ReviewItem label="Grid Type" value={formData.gridType} />
                                <ReviewItem label="Notes" value={formData.notes || 'N/A'} isBlock={true} />
                            </>
                        )}
                    </div>
                    {productType === 'Spa Cover' && (
                        <div className="p-4 border rounded-lg bg-slate-50 flex items-center justify-center">
                            <ShapeDiagram
                                shape={formData.shape}
                                dimensions={{ A: formData.dimensionA, B: formData.dimensionB }}
                                fold={formData.foldDirection}
                                className="w-full h-auto max-w-xs text-indigo-600"
                            />
                        </div>
                    )}
                </div>
            </>
        );
    };


    const renderContent = () => {
        const currentStep = initialData ? step - (totalSteps - 2) : step;

        switch (step) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return productType === 'Spa Cover' ? renderSpaCoverForm() : renderSafetyCoverForm();
            case 4: return renderReview();
            default: return null;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
                <div className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-gray-800">{isSubmitted ? 'Order Placed!' : 'Add New Order'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-slate-100">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                
                {isSubmitted ? (
                    <>
                        <div className="p-8 text-center flex flex-col items-center space-y-4">
                            <CheckCircleIcon className="h-16 w-16 text-green-500" />
                            <p className="text-lg text-gray-700 max-w-sm mx-auto">
                                Your new order has been placed successfully.
                            </p>
                            <div className="bg-slate-100 p-4 rounded-lg w-full">
                                <p className="font-semibold text-gray-800">Approx. Shipping/Pickup Date:</p>
                                <p className="text-xl font-bold text-gray-900">{eta}</p>
                            </div>
                        </div>
                        <div className="flex justify-center p-6 bg-slate-50 rounded-b-2xl">
                            <button 
                                onClick={() => {
                                    if (finalOrderData) {
                                        onAddOrder(finalOrderData);
                                    }
                                    onClose(); 
                                }}
                                className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                                Done
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-6">
                            <div className="bg-slate-200 rounded-full h-2 mb-2">
                                <div className="bg-indigo-600 rounded-full h-2" style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}></div>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {renderContent()}
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-6 bg-slate-50 rounded-b-2xl">
                            <button onClick={handleBack} disabled={step === (isDealerFlow || initialData ? 3 : 1)} className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-300 text-gray-700 font-semibold rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                <ChevronLeftIcon className="h-5 w-5"/>
                                <span>Back</span>
                            </button>
                            {step < totalSteps ? (
                                <button onClick={handleNext} disabled={(step === 1 && !selectedCustomer) || (step === 3 && !formData.poNumber)} className="px-8 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400">
                                    Next &rarr;
                                </button>
                            ) : (
                                <button onClick={handleSubmit} className="px-8 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                                    Submit Order
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const ReviewItem = ({ label, value, isBlock = false }) => (
    <div className={isBlock ? '' : 'flex justify-between items-start'}>
        <p className="font-semibold text-sm text-gray-600">{label}:</p>
        <p className={`text-sm text-gray-800 ${isBlock ? 'mt-1 bg-white p-2 rounded' : 'text-right'}`}>{String(value)}</p>
    </div>
);

const InputField = ({ label, name, value, onChange, type = 'text', required = false }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input type={type} name={name} value={value} onChange={onChange} required={required} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg" />
    </div>
);

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <select name={name} value={value} onChange={onChange} required={required} className="w-full p-2 bg-slate-100 border border-slate-300 rounded-lg">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const CheckboxField = ({ label, name, checked, onChange }) => (
    <label className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer border border-slate-200">
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="ml-3 text-sm font-medium text-gray-800">{label}</span>
    </label>
);

export default OrderCreationModal;