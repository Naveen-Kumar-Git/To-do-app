import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Design new landing page', completed: true },
      { id: 2, text: 'Reply to emails', completed: false },
      { id: 3, text: 'Team meeting at 2 PM', completed: false },
    ];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([
      { id: Date.now(), text, completed: false },
      ...todos
    ]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 overflow-hidden relative selection:bg-cyan-500/30">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-2xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 mb-2 tracking-tight">
            My Priorities
          </h1>
          <p className="text-slate-400">Stay focused and organized</p>
        </header>

        <TodoInput onAdd={addTodo} />

        <FilterBar filter={filter} setFilter={setFilter} counts={counts} />

        <div className="space-y-4 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
            {filteredTodos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-500"
              >
                <p>No tasks found in this section</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;

