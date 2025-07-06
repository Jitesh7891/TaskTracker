import React, { useState, useEffect, useMemo } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { load, save, clearAll } from './utils/localStorage';
import { CheckCircle, Moon, Sun } from 'lucide-react';

const categories = [
  { id: 'personal', name: 'Personal', color: 'bg-blue-500' },
  { id: 'work', name: 'Work', color: 'bg-green-500' },
  { id: 'health', name: 'Health', color: 'bg-red-500' },
  { id: 'education', name: 'Education', color: 'bg-purple-500' },
  { id: 'shopping', name: 'Shopping', color: 'bg-yellow-500' },
  { id: 'finance', name: 'Finance', color: 'bg-indigo-500' }
];

const priorities = [
  { id: 'low', name: 'Low', color: 'text-green-600', icon: '🟢' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-600', icon: '🟡' },
  { id: 'high', name: 'High', color: 'text-red-600', icon: '🔴' }
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function isOverdue(dueDate) {
  return dueDate && new Date(dueDate) < new Date();
}

export default function App() {
  const [user, setUser] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTaskForm, setShowForm] = useState(false);
  const [editingTask, setEditing] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setCat] = useState('all');

  const [taskForm, setTaskForm] = useState({
    title: '', description: '', priority: 'medium', dueDate: '', category: 'personal'
  });

  useEffect(() => {
    const savedUser = load('user', '');
    const savedTasks = load('tasks', []);
    const savedDarkMode = load('darkMode', false);
    if (savedUser) { setUser(savedUser); setLoggedIn(true); }
    if (savedTasks.length) setTasks(savedTasks);
    if (savedDarkMode) setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      save('user', user);
      save('tasks', tasks);
      save('darkMode', darkMode);
    }
  }, [user, tasks, darkMode, isLoggedIn]);

  const handleLogin = e => {
    e.preventDefault();
    if (user.trim()) setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(''); setLoggedIn(false); setTasks([]);
    clearAll();
  };

  const toggleDark = () => setDarkMode(d => !d);
  const toggleForm = () => setShowForm(f => !f);

  const handleTaskFormSubmit = e => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;
    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      ...taskForm,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString()
    };
    setTasks(t => editingTask
      ? t.map(x => x.id === editingTask.id ? newTask : x)
      : [...t, newTask]
    );
    setEditing(null);
    setShowForm(false);
    setTaskForm({ title: '', description: '', priority: 'medium', dueDate: '', category: 'personal' });
  };

  const handleEditTask = task => {
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category
    });
    setEditing(task);
    setShowForm(true);
  };

  const handleDeleteTask = id => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(t => t.filter(x => x.id !== id));
    }
  };

  const handleToggleComplete = id => {
    setTasks(t => t.map(x => x.id === id ? { ...x, completed: !x.completed } : x));
  };

  const filteredTasks = useMemo(() => {
    let ft = [...tasks];
    if (filter === 'completed') ft = ft.filter(t => t.completed);
    if (filter === 'pending') ft = ft.filter(t => !t.completed);
    if (selectedCategory !== 'all') ft = ft.filter(t => t.category === selectedCategory);
    if (searchTerm) ft = ft.filter(t =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return ft.sort((a, b) => {
      const pa = priorityOrder[a.priority], pb = priorityOrder[b.priority];
      if (pa !== pb) return pb - pa;
      if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, filter, searchTerm, selectedCategory]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  }), [tasks]);

  if (!isLoggedIn) {
    return <Login
      user={user} setUser={setUser} handleLogin={handleLogin}
      darkMode={darkMode} toggleDark={toggleDark}
    />;
  }

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
            <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Task Tracker
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Welcome back, {user}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-4 gap-8">
          <TaskFilter
            filter={filter} setFilter={setFilter} taskCounts={taskCounts}
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            categories={categories} selectedCategory={selectedCategory}
            setSelectedCategory={setCat}
            showForm={showTaskForm} toggleForm={toggleForm}
            darkMode={darkMode}
          />

          <div className="lg:col-span-3">
            <div className={`rounded-2xl shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
           
              <div className="p-6">
                <TaskList
                  filteredTasks={filteredTasks}
                  darkMode={darkMode}
                  handleToggleComplete={handleToggleComplete}
                  handleEditTask={handleEditTask}
                  handleDeleteTask={handleDeleteTask}
                  getPriorityIcon={p => priorities.find(x => x.id === p).icon}
                  getCategoryColor={c => categories.find(x => x.id === c).color}
                  getCategoryName={c => categories.find(x => x.id === c).name}
                  formatDate={formatDate}
                  isOverdue={isOverdue}
                />
              </div>
            </div>
          </div>
        </div>

        {showTaskForm && (
          <TaskForm
            taskForm={taskForm}
            setTaskForm={setTaskForm}
            priorities={priorities}
            categories={categories}
            editingTask={editingTask}
            handleTaskFormSubmit={handleTaskFormSubmit}
            resetTaskForm={() => {
              setShowForm(false);
              setEditing(null);
              setTaskForm({ title: '', description: '', priority: 'medium', dueDate: '', category: 'personal' });
            }}
            darkMode={darkMode}
          />
        )}
      </div>
    </>
  );
}
