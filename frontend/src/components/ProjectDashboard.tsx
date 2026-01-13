import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../graphql/queries';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import CreateProjectModal from './createProjectModal';
import EditProjectModal from './EditProjectModel';
import TaskBoard from './TaskBoard';

interface Props {
  organizationSlug: string;
}

const ProjectDashboard: React.FC<Props> = ({ organizationSlug }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_PROJECTS, {
    variables: { organizationSlug },
  });

  if (loading) return <div className="text-center py-8">Loading projects...</div>;
  if (error) return <div className="text-red-600 py-8">Error: {error.message}</div>;

  const projects: Project[] = data?.projects || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              onEdit={() => setEditingProject(project)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <CreateProjectModal
          organizationSlug={organizationSlug}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            refetch();
          }}
        />
      )}

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={() => {
            setEditingProject(null);
            refetch();
          }}
        />
      )}

      {selectedProject && (
        <TaskBoard
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectDashboard;