import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-2xl blur opacity-20 transition-opacity duration-300 peer-focus-within:opacity-40"></div>
            <div className="relative flex items-center bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden focus-within:border-cyan-500/50 transition-colors">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="peer w-full bg-transparent px-6 py-4 text-white placeholder-slate-400 outline-none"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="px-6 py-4 text-cyan-400 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <div className="bg-cyan-500/10 p-2 rounded-lg hover:bg-cyan-500/20 transition-colors">
                        <Plus size={24} />
                    </div>
                </button>
            </div>
        </form>
    );
}
