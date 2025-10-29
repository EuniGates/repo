
import React from 'react';

const ShapeDiagram = ({ shape, dimensions, fold = 'Horizontal', className = 'w-48 h-48 text-green-600' }) => {
    const renderShape = () => {
        const d = dimensions || {};
        switch (shape) {
            case 'Square/rectangle with Rounded Corners':
                return (
                    <svg viewBox="0 0 100 100" className={className}>
                        <rect x="10" y="20" width="80" height="60" rx="15" ry="15" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Horizontal' ? 'block' : 'none' }}/>
                        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Vertical' ? 'block' : 'none' }}/>
                        <text x="5" y="55" className="text-[10px] fill-current">{d.A || 'A'}</text>
                        <text x="45" y="15" className="text-[10px] fill-current">{d.B || 'B'}</text>
                        <text x="80" y="55" className="text-[10px] fill-current">{d.C || 'C'}</text>
                    </svg>
                );
            case 'Round':
                 return (
                    <svg viewBox="0 0 100 100" className={className}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Horizontal' ? 'block' : 'none' }}/>
                        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Vertical' ? 'block' : 'none' }}/>
                        <text x="45" y="45" className="text-[10px] fill-current">{d.A || 'A'}</text>
                    </svg>
                );
            case 'Square/rectangle with Cut Corners':
                 return (
                    <svg viewBox="0 0 100 100" className={className}>
                        <path d="M25 20 L75 20 L90 35 L90 65 L75 80 L25 80 L10 65 L10 35 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Horizontal' ? 'block' : 'none' }}/>
                        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Vertical' ? 'block' : 'none' }}/>
                        <text x="5" y="55" className="text-[10px] fill-current">{d.A || 'A'}</text>
                        <text x="45" y="15" className="text-[10px] fill-current">{d.B || 'B'}</text>
                        <text x="80" y="30" className="text-[10px] fill-current">{d.C || 'C'}</text>
                    </svg>
                );
             case 'Square/rectangle':
                 return (
                    <svg viewBox="0 0 100 100" className={className}>
                        <rect x="10" y="20" width="80" height="60" fill="none" stroke="currentColor" strokeWidth="3"/>
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Horizontal' ? 'block' : 'none' }}/>
                        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Vertical' ? 'block' : 'none' }}/>
                        <text x="5" y="55" className="text-[10px] fill-current">{d.A || 'A'}</text>
                        <text x="45" y="15" className="text-[10px] fill-current">{d.B || 'B'}</text>
                    </svg>
                );
            case 'One Cut Left Corner':
            case 'One Cut Right Corner':
            case 'Two Cut Corners':
            case 'Octagon':
                 const points = {
                    'One Cut Left Corner': "M25 20 L90 20 L90 80 L25 80 L10 65 L10 35 Z",
                    'One Cut Right Corner': "M10 20 L75 20 L90 35 L90 65 L75 80 L10 80 Z",
                    'Two Cut Corners': "M25 20 L75 20 L90 35 L90 65 L75 80 L25 80 L10 65 L10 35 Z",
                    'Octagon': "M30 10 L70 10 L90 30 L90 70 L70 90 L30 90 L10 70 L10 30 Z"
                 }[shape];
                 return (
                     <svg viewBox="0 0 100 100" className={className}>
                        <path d={points} fill="none" stroke="currentColor" strokeWidth="3" />
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Horizontal' ? 'block' : 'none' }} />
                        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" style={{ display: fold === 'Vertical' ? 'block' : 'none' }} />
                        {/* Generic dimensions for these shapes */}
                        <text x="5" y="55" className="text-[10px] fill-current">{d.A || 'A'}</text>
                        <text x="45" y="15" className="text-[10px] fill-current">{d.B || 'B'}</text>
                        <text x="80" y="30" className="text-[10px] fill-current">{d.C || 'C'}</text>
                        <text x="95" y="55" className="text-[10px] fill-current">{d.D || 'D'}</text>
                        <text x="45" y="95" className="text-[10px] fill-current">{d.E || 'E'}</text>
                        <text x="20" y="85" className="text-[10px] fill-current">{d.F || 'F'}</text>
                     </svg>
                 );
            case 'Custom Shape Template':
                return <svg viewBox="0 0 100 100" className={className}><path d="M20,80 C20,20 80,20 80,80 C60,95 40,95 20,80 Z" stroke="currentColor" fill="none" strokeWidth="3" /><text x="25" y="55" className="text-[8px] fill-current">Template</text></svg>;
            case 'Side by Side Speakers':
                return <svg viewBox="0 0 100 100" className={className}><rect x="10" y="25" width="80" height="50" rx="10" ry="10" fill="none" stroke="currentColor" strokeWidth="3"/><rect x="25" y="15" width="20" height="10" rx="3"/><rect x="55" y="15" width="20" height="10" rx="3"/></svg>;
            case 'Two Diagonal Speakers':
                return <svg viewBox="0 0 100 100" className={className}><rect x="10" y="25" width="80" height="50" rx="10" ry="10" fill="none" stroke="currentColor" strokeWidth="3"/><rect x="15" y="15" width="20" height="10" rx="3"/><rect x="65" y="75" width="20" height="10" rx="3"/></svg>;
            case 'Four Speakers':
                 return <svg viewBox="0 0 100 100" className={className}><rect x="10" y="25" width="80" height="50" rx="10" ry="10" fill="none" stroke="currentColor" strokeWidth="3"/><rect x="15" y="15" width="20" height="10" rx="3"/><rect x="65" y="15" width="20" height="10" rx="3"/><rect x="15" y="75" width="20" height="10" rx="3"/><rect x="65" y="75" width="20" height="10" rx="3"/></svg>;
            default:
                return (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-md">
                        <span className="text-xs text-slate-400">Select Shape</span>
                    </div>
                );
        }
    };
    return renderShape();
};

export default ShapeDiagram;
