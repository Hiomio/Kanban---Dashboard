import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORGANIZATION } from '../graphql/mutations';
import { GET_ORGANIZATIONS } from '../graphql/queries';

interface Props {
  onClose: () => void;
  onSuccess: (slug: string) => void;
}

const CreateOrganizationModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const [createOrganization, { loading, error }] = useMutation(CREATE_ORGANIZATION, {
    update(cache, { data }) {
      const newOrg = data?.createOrganization?.organization;
      if (!newOrg) return;
      try {
        const existing: any = cache.readQuery({ query: GET_ORGANIZATIONS });
        if (existing?.organizations) {
          cache.writeQuery({
            query: GET_ORGANIZATIONS,
            data: { organizations: [newOrg, ...existing.organizations] },
          });
        }
      } catch (e) {
        // ignore cache read/write errors
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createOrganization({ variables: { name: name.trim(), contactEmail: contactEmail.trim() } });
      const slug = res?.data?.createOrganization?.organization?.slug;
      if (slug) {
        setName('');
        setContactEmail('');
        onSuccess(slug);
      }
    } catch (err) {
      console.error('Error creating organization:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Create Organization</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">Error: {error.message}</div>
          )}

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
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Organization'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganizationModal;
