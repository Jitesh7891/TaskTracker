import React from 'react';
import { CheckCircle } from 'lucide-react';
import TaskItem from './TaskItem';

export default function TaskList({
  filteredTasks,
  ...props // passes down handlers & utils to TaskItem
}) {
  if (!filteredTasks.length) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-500">Try adjusting your filters or create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} {...props} />
      ))}
    </div>
  );
}
