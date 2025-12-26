import React from 'react';
import { cn } from '../utils';

export default function FilterBar({ filter, setFilter, counts }) {
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'active', label: 'Active' },
        { id: 'completed', label: 'Completed' },
    ];

    return (
        <div className="flex items-center justify-center p-1 bg-slate-800/50 rounded-full border border-white/5 backdrop-blur-md mb-8 w-fit mx-auto">
            {filters.map((f) => (
                <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                        "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        filter === f.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                    )}
                >
                    {filter === f.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full border border-white/10" />
                    )}
                    {f.label}
                    <span className="ml-2 text-xs opacity-60">
                        {counts[f.id]}
                    </span>
                </button>
            ))}
        </div>
    );
}
