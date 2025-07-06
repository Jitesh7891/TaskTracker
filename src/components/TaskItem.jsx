import React from 'react';
import { CheckCircle, Circle, Tag, Calendar, Clock, AlertCircle, Edit3, Trash2 } from 'lucide-react';

export default function TaskItem({
  task,
  darkMode,
  handleToggleComplete,
  handleEditTask,
  handleDeleteTask,
  getPriorityIcon,
  getCategoryColor,
  getCategoryName,
  formatDate,
  isOverdue
}) {
  const containerClasses = task.completed
    ? darkMode
      ? 'bg-gray-700 border-gray-600 opacity-75'
      : 'bg-gray-50 border-gray-200 opacity-75'
    : darkMode
      ? 'bg-gray-750 border-gray-600 hover:border-gray-500'
      : 'bg-white border-gray-200 hover:border-gray-300';

  return (
    <div className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${containerClasses}`}>
      <div className="flex items-start space-x-4">
        <button onClick={() => handleToggleComplete(task.id)} className={`mt-1 transition-colors duration-200 ${
          task.completed ? 'text-green-500 hover:text-green-600' : darkMode ? 'text-gray-400 hover:text-green-400' : 'text-gray-400 hover:text-green-500'
        }`}>
          {task.completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${
                task.completed
                  ? darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                  : darkMode ? 'text-white' : 'text-gray-900'
              }`}>{task.title}</h3>
              {task.description && (
                <p className={`mt-2 text-sm ${
                  task.completed
                    ? darkMode ? 'text-gray-500' : 'text-gray-400'
                    : darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{task.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'
                }`}>
                  <span className="mr-1">{getPriorityIcon(task.priority)}</span>
                  {task.priority} priority
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(task.category)}`}>
                  <Tag className="w-3 h-3 mr-1" /> {getCategoryName(task.category)}
                </span>
                {task.dueDate && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    isOverdue(task.dueDate) && !task.completed
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                      : darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(task.dueDate)}
                    {isOverdue(task.dueDate) && !task.completed && <AlertCircle className="w-3 h-3 ml-1" />}
                  </span>
                )}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button onClick={() => handleEditTask(task)} className="p-2 rounded-lg transition-colors duration-200 text-gray-400 hover:text-blue-500 hover:bg-blue-50">
                <Edit3 className="w-5 h-5" />
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="p-2 rounded-lg transition-colors duration-200 text-gray-400 hover:text-red-500 hover:bg-red-50">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
