import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

const AnomalyTable = ({ anomalies, onViewDetails, onAddComment, onSort, sortField, sortDirection }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleSort = (field) => {
    onSort(field);
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-smooth"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          <Icon 
            name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-surface">
            <tr>
              <SortableHeader field="id">ID</SortableHeader>
              <SortableHeader field="title">Titre</SortableHeader>
              <SortableHeader field="status">Statut</SortableHeader>
              <SortableHeader field="priority">Priorité</SortableHeader>
              <SortableHeader field="category">Catégorie</SortableHeader>
              <SortableHeader field="submittedDate">Date soumission</SortableHeader>
              <SortableHeader field="assignedTo">Assigné à</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {anomalies.map((anomaly) => (
              <tr key={anomaly.id} className="hover:bg-surface transition-smooth">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                  #{anomaly.id}
                </td>
                <td className="px-6 py-4 text-sm text-text-primary max-w-xs">
                  <div className="truncate" title={anomaly.title}>
                    {anomaly.title}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {anomaly.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={anomaly.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PriorityBadge priority={anomaly.priority} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {anomaly.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {formatDate(anomaly.submittedDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                  {anomaly.assignedTo || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={() => onViewDetails(anomaly)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="MessageCircle"
                      onClick={() => onAddComment(anomaly)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnomalyTable;