import React from 'react';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';
import DesignIcon from './icons/DesignIcon';
import ScissorsIcon from './icons/ScissorsIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import SewingMachineIcon from './icons/SewingMachineIcon';
import FoamIcon from './icons/FoamIcon';
import ArchiveBoxIcon from './icons/ArchiveBoxIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ZoomingTruckIcon from './icons/ZoomingTruckIcon';
import MarkingIcon from './icons/MarkingIcon';
import PerimeterIcon from './icons/PerimeterIcon';
import LinesIcon from './icons/LinesIcon';
import XAndCapsIcon from './icons/XAndCapsIcon';
import HardwareIcon from './icons/HardwareIcon';

const stageIcons = {
  'Order Approval': ClipboardCheckIcon,
  'Design': DesignIcon,
  'Cutting': ScissorsIcon,
  'Prep': ClipboardListIcon,
  'Sewing': SewingMachineIcon,
  'Foam Cutting': FoamIcon,
  'Packing': ArchiveBoxIcon,
  'Shipped/Picked-up': ZoomingTruckIcon,
  'Invoiced': CheckCircleIcon,
  'Marking': MarkingIcon,
  'Perimeter': PerimeterIcon,
  'Lines': LinesIcon,
  'X & Caps': XAndCapsIcon,
  'Hardware': HardwareIcon,
};

const ProductionTimeline = ({ stages, stageStatuses, onAdvanceStage }) => {
  return (
    <div className="flex items-center justify-between overflow-x-auto py-2 -mx-2 px-2">
      {stages.map((stage, index) => {
        const status = stageStatuses[stage.name] || 'upcoming';
        const Icon = stageIcons[stage.name];
        
        const isClickable = status === 'current' && onAdvanceStage;

        const iconClasses = {
          completed: 'bg-green-500 text-white',
          current: 'bg-indigo-600 text-white ring-4 ring-indigo-200',
          upcoming: 'bg-slate-200 text-slate-500',
        };

        const labelClasses = {
          completed: 'text-green-700 font-semibold',
          current: 'text-indigo-700 font-bold',
          upcoming: 'text-slate-500',
        };
        
        const iconContainer = (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${iconClasses[status]}`}>
            {Icon && <Icon className="h-5 w-5" />}
          </div>
        );

        return (
          <React.Fragment key={stage.name}>
            <div className="flex flex-col items-center text-center px-1" style={{ minWidth: '80px' }}>
              {isClickable ? (
                <button
                  onClick={() => onAdvanceStage(stage.name)}
                  className="rounded-full transform transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                  aria-label={`Mark ${stage.name} as complete`}
                >
                  {iconContainer}
                </button>
              ) : (
                iconContainer
              )}
              <p className={`mt-2 text-xs font-medium transition-colors duration-300 break-words`}>
                {stage.name}
              </p>
            </div>
            {index < stages.length - 1 && (
              <div className={`flex-1 h-1 rounded-full ${stageStatuses[stage.name] === 'completed' ? 'bg-green-500' : 'bg-slate-200'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProductionTimeline;