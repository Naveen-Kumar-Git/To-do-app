import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Check, Circle } from 'lucide-react';
import { cn } from '../utils';

export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                "group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300",
                "hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]",
                todo.completed && "opacity-60 grayscale-[0.5]"
            )}
        >
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={cn(
                        "relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors duration-300",
                        todo.completed
                            ? "bg-gradient-to-tr from-cyan-500 to-violet-500 border-transparent"
                            : "border-slate-500 group-hover:border-cyan-400"
                    )}
                >
                    {todo.completed && <Check size={14} className="text-white" />}
                </button>

                <span
                    className={cn(
                        "text-lg font-medium transition-all duration-300",
                        todo.completed ? "text-slate-500 line-through decoration-slate-600" : "text-slate-100"
                    )}
                >
                    {todo.text}
                </span>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="text-slate-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all duration-300 p-2 rounded-full hover:bg-white/5"
            >
                <Trash2 size={18} />
            </button>
        </motion.div>
    );
}
