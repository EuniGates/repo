import React, { useMemo } from 'react';

const DECK_COLORS = {
    Concrete: '#9ca3af', // gray-400
    Wood: '#a16207', // yellow-700
    Interlock: '#fcd34d', // amber-300
    Garden: '#16a34a', // green-600
};

const PoolVisualizer = ({ baselineLength, points, steps = [], decking = [], lastCompletedPointIndex = null }) => {
    
    const calculatedCoords = useMemo(() => {
        const baseline = parseFloat(baselineLength);
        if (isNaN(baseline) || baseline <= 0) return [];
        
        return points
            .map(p => ({ a: parseFloat(p.a), b: parseFloat(p.b), side: p.side }))
            .filter(p => !isNaN(p.a) && !isNaN(p.b) && p.a > 0 && p.b > 0)
            .map(p => {
                const { a, b, side } = p;
                if (a + b <= baseline || a + baseline <= b || b + baseline <= a) return null;
                const x = (a*a - b*b + baseline*baseline) / (2 * baseline);
                const y_squared = a*a - x*x;
                if (y_squared < 0) return null;
                const y = Math.sqrt(y_squared) * (side === '+' ? -1 : 1);
                return { x, y };
            }).filter(Boolean);

    }, [baselineLength, points]);

    const pathData = useMemo(() => {
        if (calculatedCoords.length < 2) return '';
        const path = calculatedCoords.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        return path + ' Z';
    }, [calculatedCoords]);

    const segmentPaths = useMemo(() => {
        const segments = [];
        const numPoints = calculatedCoords.length;
        if (numPoints < 2) return { stepPaths: [], deckPaths: [] };

        const getPath = (fromIndex, toIndex) => `M ${calculatedCoords[fromIndex].x} ${calculatedCoords[fromIndex].y} L ${calculatedCoords[toIndex].x} ${calculatedCoords[toIndex].y}`;
        
        const processSegments = (sourceArray) => {
            return (sourceArray || []).map(item => {
                let from = item.from - 1;
                let to = item.to - 1;

                if (from < 0 || from >= numPoints || to < 0 || to >= numPoints) return [];

                const paths = [];
                let current = from;
                while (current !== to) {
                    const next = (current + 1) % numPoints;
                    paths.push({ d: getPath(current, next), color: DECK_COLORS[item.type] || '#f97316' });
                    current = next;
                }
                return paths;
            }).flat();
        };

        return {
            stepPaths: processSegments(steps).map(p => p.d),
            deckPaths: processSegments(decking)
        };
    }, [calculatedCoords, steps, decking]);
    
    const viewBox = useMemo(() => {
        const baseline = parseFloat(baselineLength);
        const allCoords = [...calculatedCoords, {x: 0, y: 0}, {x: baseline, y:0}];
        
        if (allCoords.length <= 2) {
            const effectiveBaseline = isNaN(baseline) || baseline <= 0 ? 100 : baseline;
            const padding = effectiveBaseline * 0.2;
            const height = effectiveBaseline * 0.75;
            return `${-padding} ${-height / 2} ${effectiveBaseline + padding * 2} ${height}`;
        }

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        allCoords.forEach(p => {
            if(isNaN(p.x) || isNaN(p.y)) return;
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        });

        if (!isFinite(minX)) return '-50 -50 100 100';

        const width = maxX - minX;
        const height = maxY - minY;
        const padding = Math.max(width, height) * 0.2 + 20;

        return `${minX - padding} ${minY - padding} ${width + padding * 2} ${height + padding * 2}`;
    }, [calculatedCoords, baselineLength]);

    return (
        <svg width="100%" height="100%" viewBox={viewBox} className="transition-all duration-300">
            {/* Baseline */}
            <line x1="0" y1="0" x2={baselineLength || 0} y2="0" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="0" cy="0" r="4" fill="#f43f5e" />
            <text x="-15" y="5" fontSize="10" fill="#f43f5e" fontWeight="bold">A</text>
            <circle cx={baselineLength || 0} cy="0" r="4" fill="#f43f5e" />
            <text x={(baselineLength || 0) + 5} y="5" fontSize="10" fill="#f43f5e" fontWeight="bold">B</text>

            {/* Pool Shape */}
            <path d={pathData} fill="rgba(67, 56, 202, 0.1)" stroke="#4338ca" strokeWidth="2" />

             {/* Decking Segments */}
            {segmentPaths.deckPaths.map((deck, i) => (
                <path key={`deck-${i}`} d={deck.d} stroke={deck.color} strokeWidth="4" strokeLinecap="round" fill="none" />
            ))}

            {/* Step Segments */}
            {segmentPaths.stepPaths.map((path, i) => (
                <path key={`step-${i}`} d={path} stroke="#f97316" strokeWidth="4" strokeLinecap="round" fill="none" />
            ))}


            {/* Points */}
            {calculatedCoords.map((p, i) => {
                const isLastCompleted = i === lastCompletedPointIndex;
                return (
                    <g key={i}>
                        <circle 
                            cx={p.x} 
                            cy={p.y} 
                            r={isLastCompleted ? 6 : 3} 
                            fill={isLastCompleted ? '#16a34a' : '#4338ca'} 
                            className="transition-all"
                        />
                         {isLastCompleted && 
                            <circle cx={p.x} cy={p.y} r="6" fill="none" stroke="#16a34a" strokeWidth="1.5">
                                <animate attributeName="r" from="6" to="12" dur="1s" begin="0s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite" />
                            </circle>
                         }
                        <text x={p.x + 5} y={p.y + 5} fontSize="8" fill="#4f46e5">{i+1}</text>
                    </g>
                );
            })}

            {calculatedCoords.length === 0 && (
                <text x={(baselineLength || 100) / 2} y="0" dominantBaseline="middle" textAnchor="middle" fill="#9ca3af" fontSize="12">
                    Enter baseline and points to see the shape
                </text>
            )}
        </svg>
    );
};

export default PoolVisualizer;