// Enhanced App.tsx with modern gradient design
import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import OrganizationSelector from './components/OrganizationSelector';
import CreateOrganizationModal from './components/createOrganizationModal';
import ProjectDashboard from './components/ProjectDashboard';

function App() {
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* Enhanced Header with Gradient */}
        <header className="bg-white shadow-lg border-b border-gray-100">
          <div className="max-w-7xl mx-auto py-8 px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KANBAN
                </h1>
                <p className="text-gray-600 mt-2 text-sm">
                  Organize, track, and manage your projects efficiently
                </p>
              </div>
              
              {/* Stats Badge */}
              {selectedOrg && (
                <div className="hidden md:flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <span className="font-semibold">Active Organization</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-8 px-6">
          {/* Organization Selector */}
          <div className="mb-8">
            <OrganizationSelector 
              onSelectOrg={setSelectedOrg}
              selectedOrg={selectedOrg}
            />
          </div>

          {/* Welcome Message or Project Dashboard */}
          {!selectedOrg ? (
            <>
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Welcome to Your Workspace
                </h2>
                <p className="text-gray-600 mb-8">
                  Select an organization above to view and manage projects, or create a new organization to get started.
                </p>
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-dashed border-gray-200">
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Create Organizations</p>
                        <p className="text-sm text-gray-600">Set up multiple organizations for different teams</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Manage Projects</p>
                        <p className="text-sm text-gray-600">Track progress with visual kanban boards</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Collaborate</p>
                        <p className="text-sm text-gray-600">Assign tasks and add comments</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => setShowCreateOrgModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                        + Create Organization
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showCreateOrgModal && (
              <CreateOrganizationModal
                onClose={() => setShowCreateOrgModal(false)}
                onSuccess={(slug: string) => {
                  setShowCreateOrgModal(false);
                  setSelectedOrg(slug);
                }}
              />
            )}
            </>
          ) : (
            <ProjectDashboard organizationSlug={selectedOrg} />
          )}
        </main>

        {/* Footer */}
<footer className="mt-20 py-6 border-t border-gray-200 bg-white">
  <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm">
    <p>
      Built by Kaluri Himabindhu with <span role="img" aria-label="love">❤️</span>
    </p>
  </div>
</footer>

      </div>
    </ApolloProvider>
  );
}

export default App;