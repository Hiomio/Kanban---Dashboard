import React from 'react';
import { Project } from '../types';

interface Props {
  project: Project;
  onClick: () => void;
  onEdit?: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'ON_HOLD':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }}
            className="text-xs text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description || 'No description'}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Tasks:</span>
          <span className="font-medium">
            {project.completedTasks} / {project.taskCount}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${project.completionRate}%` }}
          />
        </div>

        <div className="text-xs text-gray-500 text-right">
          {project.completionRate.toFixed(0)}% Complete
        </div>
      </div>

      {project.dueDate && (
        <div className="mt-4 pt-4 border-t text-sm text-gray-500">
          Due: {new Date(project.dueDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;