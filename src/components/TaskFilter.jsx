import React from 'react';
import { Plus, Search } from 'lucide-react';

export default function TaskFilter({
  filter,
  setFilter,
  taskCounts,
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  showForm,
  toggleForm,
  darkMode
}) {
  return (
    <div className={`rounded-2xl shadow-lg p-6 transition-colors duration-300  h-[80vh] overflow-auto scroll-thin  ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <button onClick={toggleForm} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 mb-6 shadow-lg">
        <Plus className="w-5 h-5" /><span>Add Task</span>
      </button>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:border-blue-500 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
          } transition-colors duration-200`}
        />
      </div>

      <div className="space-y-2 mb-6">
        <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Filter Tasks</h3>
        {[
          { id: 'all', name: 'All Tasks', count: taskCounts.all },
          { id: 'pending', name: 'Pending', count: taskCounts.pending },
          { id: 'completed', name: 'Completed', count: taskCounts.completed }
        ].map(opt => (
          <button key={opt.id} onClick={() => setFilter(opt.id)} className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between ${
            filter === opt.id
              ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors duration-200`}>
            <span className="font-medium">{opt.name}</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              filter === opt.id ? 'bg-white bg-opacity-20' : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>{opt.count}</span>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Categories</h3>
        <button onClick={() => setSelectedCategory('all')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
          selectedCategory === 'all'
            ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } transition-colors duration-200`}>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <span className="font-medium">All Categories</span>
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
            selectedCategory === c.id
              ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } transition-colors duration-200`}>
            <div className={`${c.color} w-3 h-3 rounded-full`}></div>
            <span className="font-medium">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
