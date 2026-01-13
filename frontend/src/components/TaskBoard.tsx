// frontend/src/components/TaskBoard.tsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '../graphql/queries';
import { CREATE_TASK, UPDATE_TASK } from '../graphql/mutations';
import { Task, TaskStatus } from '../types';
import TaskComments from './TaskCooments';

interface Props {
  projectId: string;
  projectName: string;
  onClose: () => void;
}

const TaskBoard: React.FC<Props> = ({ projectId, projectName, onClose }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: { projectId },
  });

  if (loading) return <div className="text-center py-8">Loading tasks...</div>;
  if (error) return <div className="text-red-600 py-8">Error: {error.message}</div>;

  const tasks: Task[] = data?.tasks || [];

  const todoTasks = tasks.filter(t => t.status === 'TODO');
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter(t => t.status === 'DONE');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{projectName}</h2>
            <p className="text-gray-500 text-sm mt-1">Task Board</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddingTask(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              + Add Task
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TODO Column */}
            <TaskColumn
              title="To Do"
              tasks={todoTasks}
              color="gray"
              onEditTask={setEditingTask}
              onRefetch={refetch}
            />

            {/* IN PROGRESS Column */}
            <TaskColumn
              title="In Progress"
              tasks={inProgressTasks}
              color="blue"
              onEditTask={setEditingTask}
              onRefetch={refetch}
            />

            {/* DONE Column */}
            <TaskColumn
              title="Done"
              tasks={doneTasks}
              color="green"
              onEditTask={setEditingTask}
              onRefetch={refetch}
            />
          </div>
        </div>

        {/* Add/Edit Task Modal */}
        {(isAddingTask || editingTask) && (
          <TaskFormModal
            projectId={projectId}
            task={editingTask}
            onClose={() => {
              setIsAddingTask(false);
              setEditingTask(null);
            }}
            onSuccess={() => {
              setIsAddingTask(false);
              setEditingTask(null);
              refetch();
            }}
          />
        )}
      </div>
    </div>
  );
};

// Task Column Component
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  color: 'gray' | 'blue' | 'green';
  onEditTask: (task: Task) => void;
  onRefetch: () => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, color, onEditTask, onRefetch }) => {
  const colorClasses = {
    gray: 'bg-gray-100 border-gray-300',
    blue: 'bg-blue-50 border-blue-300',
    green: 'bg-green-50 border-green-300',
  };

  return (
    <div className={`rounded-lg p-4 ${colorClasses[color]} border-2`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="bg-white px-2 py-1 rounded text-sm font-medium">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No tasks
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onRefetch={onRefetch}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Task Card Component
interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onRefetch: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onRefetch }) => {
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      await updateTask({
        variables: {
          id: task.id,
          status: newStatus,
        },
      });
      onRefetch();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer">
      <div onClick={onEdit}>
        <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        )}
        
        {task.assigneeEmail && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
              {task.assigneeEmail[0].toUpperCase()}
            </div>
            <span className="text-xs text-gray-600">{task.assigneeEmail}</span>
          </div>
        )}
      </div>

      {/* Quick Status Change */}
      <div className="flex gap-1 mt-3 border-t pt-3">
        <button
          onClick={() => handleStatusChange('TODO')}
          disabled={task.status === 'TODO'}
          className={`flex-1 text-xs py-1 rounded ${
            task.status === 'TODO'
              ? 'bg-gray-200 text-gray-500'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          To Do
        </button>
        <button
          onClick={() => handleStatusChange('IN_PROGRESS')}
          disabled={task.status === 'IN_PROGRESS'}
          className={`flex-1 text-xs py-1 rounded ${
            task.status === 'IN_PROGRESS'
              ? 'bg-blue-200 text-blue-700'
              : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
          }`}
        >
          Progress
        </button>
        <button
          onClick={() => handleStatusChange('DONE')}
          disabled={task.status === 'DONE'}
          className={`flex-1 text-xs py-1 rounded ${
            task.status === 'DONE'
              ? 'bg-green-200 text-green-700'
              : 'bg-green-100 hover:bg-green-200 text-green-700'
          }`}
        >
          Done
        </button>
      </div>
    </div>
  );
};

// Task Form Modal
interface TaskFormModalProps {
  projectId: string;
  task: Task | null;
  onClose: () => void;
  onSuccess: () => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ projectId, task, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: (task?.status || 'TODO') as TaskStatus,
    assigneeEmail: task?.assigneeEmail || '',
  });

  const [createTask, { loading: creating }] = useMutation(CREATE_TASK);
  const [updateTask, { loading: updating }] = useMutation(UPDATE_TASK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask({
          variables: {
            id: task.id,
            ...formData,
          },
        });
      } else {
        await createTask({
          variables: {
            projectId,
            ...formData,
          },
        });
      }
      onSuccess();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as TaskStatus });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">
          {task ? 'Edit Task' : 'Create New Task'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee Email
            </label>
            <input
              type="email"
              value={formData.assigneeEmail}
              onChange={(e) => setFormData({ ...formData, assigneeEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="assignee@example.com"
            />
          </div>
          {task && <TaskComments taskId={task.id} taskTitle={task.title} />}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || updating}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {creating || updating ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskBoard;