import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATIONS } from '../graphql/queries';
import { Organization } from '../types';

interface Props {
  onSelectOrg: (slug: string) => void;
  selectedOrg: string;
}

const OrganizationSelector: React.FC<Props> = ({ onSelectOrg, selectedOrg }) => {
  const { loading, error, data } = useQuery(GET_ORGANIZATIONS);

  if (loading) return <div className="text-center py-4">Loading organizations...</div>;
  if (error) return <div className="text-red-600 py-4">Error: {error.message}</div>;

  const organizations: Organization[] = data?.organizations || [];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Organization
      </label>
      <select
        value={selectedOrg}
        onChange={(e) => onSelectOrg(e.target.value)}
        className="block w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Choose an organization...</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.slug}>
            {org.name} ({org.projectCount} projects)
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrganizationSelector;