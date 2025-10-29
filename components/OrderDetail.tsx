import React, { useState, useMemo, useEffect } from 'react';
import ShapeDiagram from './ShapeDiagram';
import InformationCircleIcon from './icons/InformationCircleIcon';
import UserIcon from './icons/UserIcon';
import PhoneIcon from './icons/PhoneIcon';
import PencilIcon from './icons/PencilIcon';
import EnvelopeIcon from './icons/EnvelopeIcon';
import ArrowDownTrayIcon from './icons/ArrowDownTrayIcon';
import PrinterIcon from './icons/PrinterIcon';
import TrashIcon from './icons/TrashIcon';
import PrintModal from './PrintModal';
import EmailModal from './EmailModal';
import ReceiptModal from './ReceiptModal';
import CameraIcon from './icons/CameraIcon';
import TruckIcon from './icons/TruckIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';
import WarrantyClaimModal from './WarrantyClaimModal';
import ClaimConfirmationModal from './ClaimConfirmationModal';
import ArchiveBoxIcon from './icons/ArchiveBoxIcon';
import PlusIcon from './icons/PlusIcon';
import ReorderModal from './ReorderModal';
import { getTaxRate } from './taxData';
import ProductionTimeline from './ProductionTimeline';
import HardwareDetailsModal from './HardwareDetailsModal';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import ChatBubbleBottomCenterTextIcon from './icons/ChatBubbleBottomCenterTextIcon';
import ArrowUturnLeftIcon from './icons/ArrowUturnLeftIcon';
import PackingIdModal from './PackingIdModal';

const ActionButton = ({ icon: Icon, label, variant = 'default', onClick = () => {} }) => {
    const baseClasses = "p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClasses = {
        default: "text-gray-500 hover:bg-slate-100 hover:text-gray-800 focus:ring-indigo-500",
        danger: "text-red-500 hover:bg-red-100 hover:text-red-700 focus:ring-red-500",
    };
    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={`${baseClasses} ${variantClasses[variant]}`}
                aria-label={label}
            >
                <Icon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {label}
            </div>
        </div>
    );
}

const hotTubStageCompletionActions = {
  'Order Approval': 'approved the order',
  'Design': 'completed the design',
  'Cutting': 'marked as cut',
  'Prep': 'marked as prepped',
  'Sewing': 'marked as sewn',
  'Foam Cutting': 'marked foam as cut',
  'Packing': 'packaged the order',
  'Shipped/Picked-up': 'marked as shipped/picked-up',
  'Invoiced': 'marked as invoiced'
};

const safetyCoverStageCompletionActions = {
  'Order Approval': 'approved the order',
  'Design': 'completed the design',
  'Cutting': 'marked as cut',
  'Marking': 'completed marking',
  'Perimeter': 'completed perimeter',
  'Lines': 'completed lines',
  'X & Caps': 'completed x & caps',
  'Hardware': 'completed hardware',
  'Packing': 'packaged the order',
  'Shipped/Picked-up': 'marked as shipped/picked-up',
  'Invoiced': 'marked as invoiced'
};

const allCompletionActions = new Set([
    ...Object.values(hotTubStageCompletionActions),
    ...Object.values(safetyCoverStageCompletionActions)
]);


const hotTubStages = [
    { name: 'Order Approval' }, { name: 'Design' }, { name: 'Cutting' },
    { name: 'Prep' }, { name: 'Sewing' }, { name: 'Foam Cutting' },
    { name: 'Packing' }, { name: 'Shipped/Picked-up' }, { name: 'Invoiced' },
];

const safetyCoverStages = [
    { name: 'Order Approval' }, { name: 'Design' }, { name: 'Cutting' },
    { name: 'Marking' }, { name: 'Perimeter' }, { name: 'Lines' },
    { name: 'X & Caps' }, { name: 'Hardware' }, { name: 'Packing' }, 
    { name: 'Shipped/Picked-up' }, { name: 'Invoiced' },
];

const allStageCompletionKeywords = {
  'Order Approval': ['approved the order', 'sent order confirmation'],
  'Design': ['generated the design file', 'completed the design'],
  'Cutting': ['marked as cut'],
  'Prep': ['marked as prepped'],
  'Sewing': ['marked as sewn'],
  'Foam Cutting': ['marked foam as cut'],
  'Packing': ['packaged the order'],
  'Shipped/Picked-up': ['marked as picked-up', 'marked as shipped', 'marked as shipped/picked-up'],
  'Invoiced': ['marked as completed', 'marked as invoiced'],
  'Marking': ['completed marking'],
  'Perimeter': ['completed perimeter'],
  'Lines': ['completed lines'],
  'X & Caps': ['completed x & caps'],
  'Hardware': ['completed hardware'],
};

const getStageStatuses = (activityLog, stages) => {
    const statuses = {};
    const stageSequence = stages.map(s => s.name);
    
    const completedStages = new Set<string>();
    
    const log = activityLog || []; // SAFEGUARD

    // Filter out undone actions first
    const relevantLogs = log.filter(log => !log.action.toLowerCase().startsWith("undone the '"));
    const undoneActionTexts = log
        .filter(log => log.action.toLowerCase().startsWith("undone the '"))
        .map(log => {
            const match = log.action.match(/'(.*?)'/);
            return match ? match[1] : '';
        });

    const finalLogs = relevantLogs.filter(log => !undoneActionTexts.includes(log.action));


    for (const log of finalLogs) {
        const action = log.action.toLowerCase();
        
        for (const stageName in allStageCompletionKeywords) {
            if (allStageCompletionKeywords[stageName].some(kw => action.includes(kw))) {
                completedStages.add(stageName);
            }
        }
    }

    // Initialize all statuses
    stageSequence.forEach(name => {
        statuses[name] = completedStages.has(name) ? 'completed' : 'upcoming';
    });
    
    const isHotTubFlow = stageSequence.includes('Sewing') && stageSequence.includes('Foam Cutting');
    let currentStageSet = false;

    if (isHotTubFlow && completedStages.has('Prep')) {
      const sewingCompleted = completedStages.has('Sewing');
      const foamCuttingCompleted = completedStages.has('Foam Cutting');

      if (!sewingCompleted) {
          statuses['Sewing'] = 'current';
          currentStageSet = true;
      }
      if (!foamCuttingCompleted) {
          statuses['Foam Cutting'] = 'current';
          currentStageSet = true;
      }
    }

    if (!currentStageSet) {
        // This runs for all sequential cases, and after the parallel block is complete for hot tubs
        const firstUpcomingIndex = stageSequence.findIndex(name => !completedStages.has(name));
        if (firstUpcomingIndex !== -1) {
            statuses[stageSequence[firstUpcomingIndex]] = 'current';
        }
    }
    
    // Final check for 'Invoiced' stage, in case sequential logic misses it
    const lastStage = stageSequence[stageSequence.length - 1];
    if (lastStage === 'Invoiced') {
        const allPreviousComplete = stageSequence.slice(0, -1).every(stage => completedStages.has(stage));
        if (allPreviousComplete && !completedStages.has('Invoiced')) {
             statuses['Invoiced'] = 'current';
        }
    }

    return statuses;
};


const OrderDetail = ({ order, onBack, onDelete }) => {
  const [currentOrder, setCurrentOrder] = useState(order);
  const [activeTab, setActiveTab] = useState('shipping');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [claimDetails, setClaimDetails] = useState({ replacementType: '', shipDate: '' });
  const [claims, setClaims] = useState(currentOrder.claims || []);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [isHardwareModalOpen, setIsHardwareModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [idModalConfig, setIdModalConfig] = useState({ isOpen: false, isEditing: false });

  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  const { remainingWarranty, isWarrantyExpired } = useMemo(() => {
    if (!currentOrder.warrantyRegistration || currentOrder.warrantyRegistration.status !== 'Registered') {
        return { remainingWarranty: null, isWarrantyExpired: true };
    }

    const registrationDate = new Date(currentOrder.warrantyRegistration.registrationDate + 'T00:00:00');
    const durationMatch = currentOrder.warrantyName?.match(/(\d+)-Year/);
    if (!durationMatch) {
        return { remainingWarranty: 'Invalid Duration', isWarrantyExpired: true };
    }

    const years = parseInt(durationMatch[1], 10);
    const expiryDate = new Date(registrationDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + years);

    const now = new Date();
    if (now > expiryDate) {
        return { remainingWarranty: 'Expired', isWarrantyExpired: true };
    }

    let yearsDiff = expiryDate.getFullYear() - now.getFullYear();
    let monthsDiff = expiryDate.getMonth() - now.getMonth();
    let daysDiff = expiryDate.getDate() - now.getDate();

    if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    }
    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }
    
    let parts = [];
    if(yearsDiff > 0) parts.push(`${yearsDiff} year${yearsDiff > 1 ? 's' : ''}`);
    if(monthsDiff > 0) parts.push(`${monthsDiff} month${monthsDiff > 1 ? 's' : ''}`);
    
    if (parts.length === 0 && daysDiff > 0) {
         return { remainingWarranty: `${daysDiff} day${daysDiff > 1 ? 's' : ''} remaining`, isWarrantyExpired: false };
    }

    return { remainingWarranty: `${parts.join(', ')} remaining`, isWarrantyExpired: false };

  }, [currentOrder.warrantyRegistration, currentOrder.warrantyName]);

  const skirtInfo = currentOrder.product?.skirt || '';
  const skirtLength = skirtInfo.split(' ')[0];
  const tieDown = skirtInfo.includes('(Standard)') ? 'Standard' : 'Custom';
  
  const viewReceipt = (url) => {
    setSelectedReceipt(url);
    setIsReceiptModalOpen(true);
  };

  const closeReceiptModal = () => {
    setIsReceiptModalOpen(false);
    setSelectedReceipt(null);
  };

  const handleClaimSubmit = (details) => {
    const shipDate = new Date();
    shipDate.setDate(shipDate.getDate() + 14); // Set approx ship date 14 days from now
    const formattedDate = shipDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    setClaimDetails({
      replacementType: details.replacementType,
      shipDate: formattedDate
    });
    
    const newClaim = {
        date: new Date().toLocaleDateString('en-CA'),
        reason: details.reason,
        replacement: details.replacementType,
    };
    setClaims(prev => [...prev, newClaim]);

    setIsClaimModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmReorder = ({ po, tagName }) => {
    console.log('Creating new order with:', {
      ...currentOrder,
      id: `REORDER-${Math.floor(Math.random() * 1000)}`, // Generate a new ID for the reorder
      po: po,
      product: {
        ...currentOrder.product,
        tag: tagName,
      },
      placedDate: new Date().toLocaleDateString('en-CA'),
      status: 'Awaiting Approval',
      rush: false,
    });
    // The modal will now handle its own closing via the "Done" button
    // on the confirmation screen.
  };

  const taxRatePercent = useMemo(() => getTaxRate(currentOrder.shippingAddress?.province), [currentOrder.shippingAddress?.province]);
  const originalSubtotal = useMemo(() => (currentOrder.summary?.products || 0) + (currentOrder.summary?.upgradesTotal || 0), [currentOrder.summary]);
  const calculatedTax = useMemo(() => originalSubtotal * (taxRatePercent / 100), [originalSubtotal, taxRatePercent]);
  const calculatedTotal = useMemo(() => originalSubtotal + calculatedTax, [originalSubtotal, calculatedTax]);
  // For demonstration, let's assume current MSRP is 10% higher
  const currentMSRP = useMemo(() => originalSubtotal * 1.1, [originalSubtotal]);
  
  const isSpaCover = currentOrder.product?.name?.toLowerCase().includes('spa');
  const isSafetyCover = currentOrder.product?.name?.toLowerCase().includes('safety');
  const stages = isSpaCover ? hotTubStages : isSafetyCover ? safetyCoverStages : [];
  const stageCompletionActions = isSpaCover ? hotTubStageCompletionActions : safetyCoverStageCompletionActions;

  const handleAdvanceStage = (stageName) => {
    if (stageName === 'Packing') {
        setIdModalConfig({ isOpen: true, isEditing: false });
        return;
    }

    const actionText = stageCompletionActions[stageName];
    if (!actionText) return;

    const newActivity = {
      user: 'Admin User',
      action: actionText,
      timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', ''),
    };

    setCurrentOrder(prevOrder => ({
      ...prevOrder,
      activity: [...(prevOrder.activity || []), newActivity]
    }));
  };
  
  const handleUndoLastStage = () => {
    const activity = currentOrder.activity || [];
    let lastActionIndex = -1;

    // Find the last action that is a completion action, including packing with ID
    for (let i = activity.length - 1; i >= 0; i--) {
      const currentAction = activity[i].action;
      if (Array.from(allCompletionActions).some(keyword => currentAction.includes(keyword))) {
        lastActionIndex = i;
        break;
      }
    }

    if (lastActionIndex !== -1) {
      const actionToUndo = activity[lastActionIndex];
      const newActivityLog = [...activity]; // Create a copy
      
      // Add the "undo" log entry first
      const undoLog = {
          user: 'Admin User',
          action: `undone the '${actionToUndo.action}' action`,
          timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', ''),
      };
      newActivityLog.push(undoLog);

      setCurrentOrder(prev => ({ ...prev, activity: newActivityLog }));
    }
  };
  
  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    const note = {
      user: 'Admin User', // In a real app, this would be the logged-in user
      text: newNote,
      timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', ''),
    };
    setCurrentOrder(prevOrder => ({
      ...prevOrder,
      notes: [...(prevOrder.notes || []), note]
    }));
    setNewNote('');
  };
  
    const handleConfirmId = (uniqueId) => {
        let actionText;
        let newActivity;

        if (idModalConfig.isEditing) {
            actionText = `updated Cover ID from ${currentOrder.product.uniqueId} to ${uniqueId}`;
        } else {
            actionText = `${stageCompletionActions['Packing']} with Unique ID: ${uniqueId}`;
        }

        newActivity = {
            user: 'Admin User',
            action: actionText,
            timestamp: new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }).replace(',', ''),
        };

        setCurrentOrder(prevOrder => ({
            ...prevOrder,
            product: {
                ...prevOrder.product,
                uniqueId: uniqueId,
            },
            activity: [...(prevOrder.activity || []), newActivity]
        }));
        
        setIdModalConfig({ isOpen: false, isEditing: false });
    };


  const stageStatuses = getStageStatuses(currentOrder.activity, stages);
  
  const canUndo = useMemo(() => {
    const activity = currentOrder.activity || [];
    // Check if there's any action in the log that is a completable action and not undone
    const undoneActions = activity
        .filter(log => log.action.toLowerCase().startsWith("undone the '"))
        .map(log => {
            const match = log.action.match(/'(.*?)'/);
            return match ? match[1] : '';
        });
        
    return activity.some(act => 
        Array.from(allCompletionActions).some(keyword => act.action.includes(keyword)) &&
        !undoneActions.includes(act.action)
    );
  }, [currentOrder.activity]);

  return (
    <div className="space-y-6">
       <div>
            <button onClick={onBack} className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-2">
                <span>← Back to Orders</span>
            </button>
            <div className="flex flex-col sm:flex-row justify-between items-start">
                <div>
                    <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-bold text-gray-800">{currentOrder.id}</h1>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${currentOrder.status === 'Invoiced' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{currentOrder.status}</span>
                    </div>
                    <p className="mt-1 text-gray-500">
                        Placed on {currentOrder.placedDate} | PO: {currentOrder.po} | Due Date: {currentOrder.dueDate}
                    </p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <ActionButton icon={PlusIcon} label="Re-order" onClick={() => setIsReorderModalOpen(true)} />
                    <ActionButton icon={PencilIcon} label="Edit" />
                    <ActionButton icon={EnvelopeIcon} label="Email" onClick={() => setIsEmailModalOpen(true)} />
                    <ActionButton icon={ArrowDownTrayIcon} label="Download" />
                    <ActionButton icon={PrinterIcon} label="Print" onClick={() => setIsPrintModalOpen(true)} />
                    {/* FIX: Add onClick handler for delete button */}
                    <ActionButton icon={TrashIcon} label="Delete" variant="danger" onClick={onDelete} />
                </div>
            </div>
        </div>
      
      {stages.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Production Status</h3>
                {canUndo && (
                    <button 
                        onClick={handleUndoLastStage}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200 hover:text-slate-800 transition-colors"
                    >
                        <ArrowUturnLeftIcon className="h-4 w-4" />
                        <span>Undo Last Action</span>
                    </button>
                )}
            </div>
              <ProductionTimeline 
                stages={stages} 
                stageStatuses={stageStatuses}
                onAdvanceStage={handleAdvanceStage}
              />
          </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
               <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                        <p className="text-sm text-gray-500">Pickup Date: {currentOrder.pickupDate}</p>
                    </div>
                    <InformationCircleIcon className="h-6 w-6 text-gray-400" />
                </div>

                <div className="pt-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{currentOrder.product?.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">Tag name: {currentOrder.product?.tag}</p>
                        </div>
                        {currentOrder.product?.uniqueId && (
                            <div className="flex items-center space-x-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5">
                                <span className="text-sm font-semibold text-indigo-800">Cover ID: {currentOrder.product.uniqueId}</span>
                                <button onClick={() => setIdModalConfig({ isOpen: true, isEditing: true })} className="text-indigo-600 hover:text-indigo-800">
                                    <PencilIcon className="h-4 w-4"/>
                                </button>
                            </div>
                        )}
                    </div>


                    {isSafetyCover && (
                        <div className="my-6 bg-slate-50 p-6 rounded-lg border border-slate-200 flex justify-center items-center">
                            <ShapeDiagram
                                shape={currentOrder.product?.shape}
                                dimensions={currentOrder.product?.shapeDimensions}
                                fold={'Horizontal'}
                                className="h-64 w-auto text-indigo-600"
                            />
                        </div>
                    )}

                    {isSpaCover && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                             <div className="flex justify-center items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <ShapeDiagram
                                    shape={currentOrder.product?.shape}
                                    dimensions={currentOrder.product?.shapeDimensions}
                                    fold={"B"}
                                    className="h-48 w-auto text-indigo-600"
                                />
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <p><span className="font-semibold text-gray-700">Make/Model:</span> {currentOrder.product?.sku}</p>
                                <p><span className="font-semibold text-gray-700">Size:</span> {currentOrder.product?.dimensions}</p>
                                <p><span className="font-semibold text-gray-700">Fold:</span> {currentOrder.product?.fold}</p>
                                <p><span className="font-semibold text-gray-700">Color:</span> {currentOrder.product?.color}</p>
                                <p><span className="font-semibold text-gray-700">Taper:</span> {currentOrder.product?.taper}</p>
                                <p><span className="font-semibold text-gray-700">Skirt Length:</span> {skirtLength}</p>
                                <p><span className="font-semibold text-gray-700">Tie down:</span> {tieDown}</p>
                                <p className="mt-4 text-sm bg-slate-100 p-3 rounded-md text-gray-700">{currentOrder.product?.notes}</p>
                            </div>
                        </div>
                    )}
                    
                    {isSafetyCover && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <p><span className="font-semibold text-gray-700">Shape:</span> {currentOrder.product?.shape}</p>
                            <p><span className="font-semibold text-gray-700">Steps:</span> {currentOrder.product?.steps}</p>
                            <p><span className="font-semibold text-gray-700">Pool Size:</span> {currentOrder.product?.poolSize}</p>
                            <p><span className="font-semibold text-gray-700">Cover Size:</span> {currentOrder.product?.coverSize}</p>
                            <p><span className="font-semibold text-gray-700">Deck Type:</span> {currentOrder.product?.deckType}</p>
                            <p><span className="font-semibold text-gray-700">Mesh Type:</span> {currentOrder.product?.meshType}</p>
                            <p><span className="font-semibold text-gray-700">Grid Type:</span> {currentOrder.product?.gridType}</p>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-700">Hardware Details:</span>
                                <button onClick={() => setIsHardwareModalOpen(true)} className="flex items-center space-x-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md">
                                    <WrenchScrewdriverIcon className="h-4 w-4" />
                                    <span>View Hardware</span>
                                </button>
                            </div>
                            <p className="md:col-span-2 mt-4 text-sm bg-slate-100 p-3 rounded-md text-gray-700">{currentOrder.product?.notes}</p>
                        </div>
                    )}

                    {currentOrder.product?.upgrades && currentOrder.product?.upgrades.length > 0 && (
                        <div className="mt-6 border-t border-slate-200 pt-4">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Additional Upgrades</h4>
                            <ul className="space-y-1 text-gray-600 text-sm">
                                {currentOrder.product.upgrades.map((upgrade, index) => (
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
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-500" />
                    Order Notes
                </h3>
                <div className="space-y-4">
                    {(currentOrder.notes || []).length > 0 ? (
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {(currentOrder.notes || []).map((note, index) => (
                                <div key={index} className="bg-slate-50 p-3 rounded-md border border-slate-200">
                                    <p className="text-sm text-gray-700">{note.text}</p>
                                    <p className="text-xs text-gray-500 mt-1 text-right">
                                        - {note.user} on {note.timestamp}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No notes for this order yet.</p>
                    )}
                    <div className="flex items-start space-x-3 pt-4 border-t border-slate-200">
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Add a new note..."
                            rows={2}
                            className="flex-1 p-2 bg-white border border-slate-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button 
                            onClick={handleAddNote}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
                            disabled={!newNote.trim()}
                        >
                            Add Note
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                <button onClick={() => setActiveTab('shipping')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === 'shipping' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  Shipping Details
                </button>
                <button onClick={() => setActiveTab('billing')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === 'billing' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  Billing Details
                </button>
                <button onClick={() => setActiveTab('activity')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm ${activeTab === 'activity' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  Activity
                </button>
              </nav>
            </div>
            {activeTab === 'shipping' && (
                <div className="p-6 space-y-6">
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Shipping Address</h4>
                        <p className="font-bold text-gray-800">{currentOrder.shippingAddress?.company}</p>
                        <address className="text-sm text-gray-600 not-italic">
                            {currentOrder.shippingAddress?.street}<br />
                            {`${currentOrder.shippingAddress?.city}, ${currentOrder.shippingAddress?.province} ${currentOrder.shippingAddress?.postalCode}`}<br />
                            {currentOrder.shippingAddress?.country}
                        </address>
                         <div className="mt-2 space-y-1 text-sm">
                            <p className="flex items-center"><UserIcon className="h-4 w-4 mr-2 text-gray-400"/> {currentOrder.shippingAddress?.contactName}</p>
                            <p className="flex items-center"><PhoneIcon className="h-4 w-4 mr-2 text-gray-400"/> {currentOrder.shippingAddress?.phone}</p>
                        </div>
                    </div>
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Shipping Method</h4>
                         <div className="flex items-center text-sm text-gray-600">
                            <TruckIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0"/>
                            <div>
                                <p>{currentOrder.shippingDetails?.method}</p>
                                {currentOrder.shippingDetails?.carrierContact && <p>Carrier/Contact: <span className="font-bold text-gray-800">{currentOrder.shippingDetails?.carrierContact}</span></p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'billing' && (
                <div className="p-6 space-y-6">
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Billing Address</h4>
                        <p className="font-bold text-gray-800">{currentOrder.billingAddress?.company}</p>
                        <address className="text-sm text-gray-600 not-italic">
                            {currentOrder.billingAddress?.street}<br />
                            {`${currentOrder.billingAddress?.city}, ${currentOrder.billingAddress?.province} ${currentOrder.billingAddress?.postalCode}`}<br />
                            {currentOrder.billingAddress?.country}
                        </address>
                        <div className="mt-2 space-y-1 text-sm">
                            <p className="flex items-center"><UserIcon className="h-4 w-4 mr-2 text-gray-400"/> {currentOrder.billingAddress?.contactName}</p>
                            <p className="flex items-center"><PhoneIcon className="h-4 w-4 mr-2 text-gray-400"/> {currentOrder.billingAddress?.phone}</p>
                        </div>
                    </div>
                     <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Order Summary</h4>
                        <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Products ({currentOrder.summary?.quantity} x ${currentOrder.summary?.unitPrice.toFixed(2)})</span>
                                <span className="font-medium text-gray-800">${currentOrder.summary?.products.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-gray-600">Upgrades</span>
                                <span className="font-medium text-gray-800">${currentOrder.summary?.upgradesTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t mt-1">
                                <span className="text-gray-600 font-semibold">Original Subtotal</span>
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
                             <div className="flex justify-between pt-2 border-t mt-1 text-blue-600">
                                <span className="font-semibold">Current MSRP</span>
                                <span className="font-semibold">${currentMSRP.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'activity' && (
                <div className="p-6">
                   <ul className="space-y-4">
                        {(currentOrder.activity || []).map((item, index) => (
                            <li key={index} className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center ring-4 ring-white">
                                        <UserIcon className="h-5 w-5 text-slate-500" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-semibold text-gray-800">{item.user}</span> {item.action}
                                    </p>
                                    <p className="text-xs text-gray-500">{item.timestamp}</p>
                                </div>
                            </li>
                        ))}
                   </ul>
                </div>
            )}
          </div>
          
           {currentOrder.warrantyRegistration && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Warranty Details</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Policy</span>
                        <span className="font-semibold text-gray-800">{currentOrder.warrantyName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Status</span>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            currentOrder.warrantyRegistration.status === 'Registered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {currentOrder.warrantyRegistration.status}
                        </span>
                    </div>

                    {currentOrder.warrantyRegistration.status === 'Registered' && (
                        <>
                            <div className="flex justify-between items-center pt-2 border-t mt-2">
                                <span className="text-gray-600 font-medium">Remaining Period</span>
                                <span className={`font-semibold ${isWarrantyExpired ? 'text-red-600' : 'text-gray-800'}`}>
                                    {remainingWarranty}
                                </span>
                            </div>

                            <div className="pt-3 border-t">
                                <p className="font-semibold text-gray-600 mb-1">Registered Details:</p>
                                <p><span className="font-medium">Date:</span> {currentOrder.warrantyRegistration.registrationDate}</p>
                                <p><span className="font-medium">Name:</span> {currentOrder.warrantyRegistration.customer.name}</p>
                                <p><span className="font-medium">Email:</span> {currentOrder.warrantyRegistration.customer.email}</p>
                                <p><span className="font-medium">Address:</span> {currentOrder.warrantyRegistration.customer.address}</p>
                            </div>
                            <div className="pt-2">
                                <button
                                    onClick={() => viewReceipt(currentOrder.warrantyRegistration.receiptUrl)}
                                    className="flex w-full items-center justify-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 py-2 rounded-lg transition-colors"
                                >
                                    <CameraIcon className="h-4 w-4" />
                                    <span>View Receipt</span>
                                </button>
                            </div>
                             <div className="pt-3">
                                <button
                                    onClick={() => setIsClaimModalOpen(true)}
                                    disabled={isWarrantyExpired}
                                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                                >
                                    <ClipboardCheckIcon className="h-5 w-5"/>
                                    <span>Claim</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
                {claims.length > 0 && (
                    <div className="pt-3 border-t mt-3">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
                                <ArchiveBoxIcon className="h-5 w-5 text-gray-500"/>
                                <span>Claim History</span>
                            </h4>
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                                Claim Made
                            </span>
                        </div>
                        <ul className="space-y-2 text-xs text-gray-600 pl-2 border-l-2 border-slate-200 ml-2">
                            {claims.map((claim, index) => (
                                <li key={index} className="pl-3">
                                    <p className="font-medium text-gray-800">{claim.date}: <span className="font-normal">{claim.reason}</span></p>
                                    <p>Replacement: <span className="font-semibold">{claim.replacement}</span></p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
      {isPrintModalOpen && <PrintModal onClose={() => setIsPrintModalOpen(false)} warrantyName={currentOrder.warrantyName} />}
      {isEmailModalOpen && <EmailModal onClose={() => setIsEmailModalOpen(false)} customerEmail={currentOrder.billingAddress?.email} orderId={currentOrder.id} warrantyName={currentOrder.warrantyName} />}
      {isReceiptModalOpen && selectedReceipt && <ReceiptModal imageUrl={selectedReceipt} onClose={closeReceiptModal} />}
      {isClaimModalOpen && <WarrantyClaimModal onClose={() => setIsClaimModalOpen(false)} onSubmit={handleClaimSubmit} />}
      {isConfirmationModalOpen && <ClaimConfirmationModal onClose={() => setIsConfirmationModalOpen(false)} claimDetails={claimDetails} />}
      {isReorderModalOpen && <ReorderModal order={currentOrder} onClose={() => setIsReorderModalOpen(false)} onConfirm={handleConfirmReorder} />}
      {isHardwareModalOpen && <HardwareDetailsModal isOpen={isHardwareModalOpen} onClose={() => setIsHardwareModalOpen(false)} hardware={currentOrder.product?.hardware} orderId={currentOrder.id} />}
      {idModalConfig.isOpen && (
        <PackingIdModal
            isOpen={idModalConfig.isOpen}
            onClose={() => setIdModalConfig({ isOpen: false, isEditing: false })}
            onConfirm={handleConfirmId}
            isEditing={idModalConfig.isEditing}
            currentId={currentOrder.product?.uniqueId}
        />
      )}
    </div>
  );
};

export default OrderDetail;