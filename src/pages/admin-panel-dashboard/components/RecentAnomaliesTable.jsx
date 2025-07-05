import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const RecentAnomaliesTable = () => {
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setCurrentLanguage(savedLanguage);
  }, []);

  const translations = {
    fr: {
      title: 'Anomalies récentes',
      selectAll: 'Tout sélectionner',
      bulkActions: 'Actions groupées',
      assign: 'Assigner',
      resolve: 'Résoudre',
      delete: 'Supprimer',
      export: 'Exporter',
      id: 'ID',
      title_col: 'Titre',
      submittedBy: 'Soumis par',
      category: 'Catégorie',
      priority: 'Priorité',
      status: 'Statut',
      date: 'Date',
      actions: 'Actions',
      view: 'Voir',
      edit: 'Modifier',
      pending: 'En attente',
      inProgress: 'En cours',
      resolved: 'Résolu',
      high: 'Élevée',
      medium: 'Moyenne',
      low: 'Faible'
    },
    ar: {
      title: 'الشذوذات الأخيرة',
      selectAll: 'تحديد الكل',
      bulkActions: 'الإجراءات المجمعة',
      assign: 'تعيين',
      resolve: 'حل',
      delete: 'حذف',
      export: 'تصدير',
      id: 'المعرف',
      title_col: 'العنوان',
      submittedBy: 'مقدم من',
      category: 'الفئة',
      priority: 'الأولوية',
      status: 'الحالة',
      date: 'التاريخ',
      actions: 'الإجراءات',
      view: 'عرض',
      edit: 'تعديل',
      pending: 'معلق',
      inProgress: 'قيد التنفيذ',
      resolved: 'محلول',
      high: 'عالية',
      medium: 'متوسطة',
      low: 'منخفضة'
    }
  };

  const t = translations[currentLanguage];

  const recentAnomalies = [
    {
      id: 'ANO-001',
      title: 'Problème de chauffage - Amphithéâtre A',
      submittedBy: 'Ahmed Benali',
      category: 'Infrastructure',
      priority: 'high',
      status: 'pending',
      date: '2024-01-15',
      time: '14:30'
    },
    {
      id: 'ANO-002',
      title: 'Éclairage défaillant - Laboratoire 3',
      submittedBy: 'Fatima Zahra',
      category: 'Électricité',
      priority: 'medium',
      status: 'inProgress',
      date: '2024-01-15',
      time: '12:15'
    },
    {
      id: 'ANO-003',
      title: 'Fuite d\'eau - Toilettes étage 2',
      submittedBy: 'Mohamed Alami',
      category: 'Plomberie',
      priority: 'high',
      status: 'pending',
      date: '2024-01-15',
      time: '15:45'
    },
    {
      id: 'ANO-004',
      title: 'Problème réseau WiFi - Salle informatique',
      submittedBy: 'Aicha Bennani',
      category: 'Informatique',
      priority: 'medium',
      status: 'resolved',
      date: '2024-01-14',
      time: '10:20'
    },
    {
      id: 'ANO-005',
      title: 'Porte cassée - Entrée principale',
      submittedBy: 'Youssef Tazi',
      category: 'Sécurité',
      priority: 'high',
      status: 'inProgress',
      date: '2024-01-14',
      time: '16:00'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error-50 text-error border-error-200',
      medium: 'bg-warning-50 text-warning border-warning-200',
      low: 'bg-success-50 text-success border-success-200'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning-50 text-warning border-warning-200',
      inProgress: 'bg-primary-50 text-primary border-primary-200',
      resolved: 'bg-success-50 text-success border-success-200'
    };
    return colors[status] || colors.pending;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      high: t.high,
      medium: t.medium,
      low: t.low
    };
    return labels[priority] || t.medium;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: t.pending,
      inProgress: t.inProgress,
      resolved: t.resolved
    };
    return labels[status] || t.pending;
  };

  const handleSelectAll = () => {
    if (selectedItems.length === recentAnomalies.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(recentAnomalies.map(item => item.id));
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {t.title}
          </h3>
          <Button variant="outline" size="sm" iconName="Download">
            {t.export}
          </Button>
        </div>
        
        {selectedItems.length > 0 && (
          <div className="flex items-center space-x-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <span className="text-sm font-semibold text-primary">
              {selectedItems.length} éléments sélectionnés
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="primary" size="sm" iconName="UserPlus">
                {t.assign}
              </Button>
              <Button variant="success" size="sm" iconName="Check">
                {t.resolve}
              </Button>
              <Button variant="danger" size="sm" iconName="Trash2">
                {t.delete}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedItems.length === recentAnomalies.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.id}</th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.title_col}</th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.submittedBy}</th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.category}</th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.priority}</th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.status}</th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.date}</th>
              <th className="text-left p-4 text-sm font-semibold text-text-primary">{t.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentAnomalies.map((anomaly) => (
              <tr key={anomaly.id} className="hover:bg-surface transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(anomaly.id)}
                    onChange={() => handleSelectItem(anomaly.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                </td>
                <td className="p-4">
                  <span className="text-sm font-mono text-text-primary">{anomaly.id}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-primary font-medium">{anomaly.title}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">{anomaly.submittedBy}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">{anomaly.category}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(anomaly.priority)}`}>
                    {getPriorityLabel(anomaly.priority)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(anomaly.status)}`}>
                    {getStatusLabel(anomaly.status)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm text-text-secondary">
                    <div>{anomaly.date}</div>
                    <div className="text-xs text-text-muted">{anomaly.time}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      {t.view}
                    </Button>
                    <Button variant="outline" size="sm" iconName="Edit">
                      {t.edit}
                    </Button>
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

export default RecentAnomaliesTable;