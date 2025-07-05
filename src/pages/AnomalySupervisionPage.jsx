import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import Icon from "../components/AppIcon";
import AuthenticatedHeader from '../components/ui/AuthenticatedHeader';

// --- Composants utilitaires locaux ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 ${className}`}>{children}</div>
);

const Badge = ({ color, children }) => (
  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${color}`}>{children}</span>
);

const statusBadgeColor = {
  "Résolu": "bg-green-100 text-green-800",
  "En cours": "bg-blue-100 text-blue-800",
  "Ouvert": "bg-red-100 text-red-800"
};
const priorityBadgeColor = {
  "Haute": "bg-red-100 text-red-800",
  "Moyenne": "bg-yellow-100 text-yellow-800",
  "Faible": "bg-gray-100 text-gray-800"
};

// --- Données fictives enrichies ---
const mockAnomalies = [
  { id: 1, title: "Erreur capteur", status: "Ouvert", priority: "Haute", submittedBy: "Alice Martin", assignedTo: "Admin 1", date: "2024-06-01" },
  { id: 2, title: "Défaillance réseau", status: "En cours", priority: "Moyenne", submittedBy: "Bob Dupont", assignedTo: "Admin 2", date: "2024-06-02" },
  { id: 3, title: "Surcharge serveur", status: "Résolu", priority: "Faible", submittedBy: "Claire Dubois", assignedTo: "Admin 3", date: "2024-06-03" },
  { id: 4, title: "Incident sécurité", status: "Ouvert", priority: "Haute", submittedBy: "David Leroy", assignedTo: "Admin 1", date: "2024-06-04" },
  { id: 5, title: "Erreur application", status: "En cours", priority: "Moyenne", submittedBy: "Emma Petit", assignedTo: "Admin 2", date: "2024-06-05" },
  { id: 6, title: "Problème matériel", status: "Résolu", priority: "Faible", submittedBy: "Fabrice Morel", assignedTo: "Admin 3", date: "2024-06-06" },
];

const statusOptions = [
  { value: "", label: "Tous" },
  { value: "Ouvert", label: "Ouvert" },
  { value: "En cours", label: "En cours" },
  { value: "Résolu", label: "Résolu" },
];
const priorityOptions = [
  { value: "", label: "Toutes" },
  { value: "Haute", label: "Haute" },
  { value: "Moyenne", label: "Moyenne" },
  { value: "Faible", label: "Faible" },
];

const PAGE_SIZE = 5;

const AnomalySupervisionPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]); // ids sélectionnés
  const [loading, setLoading] = useState(false);

  // Simule le chargement
  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [search, status, priority, date, page]);

  // Filtrage
  const filtered = mockAnomalies.filter(a =>
    (search === "" || a.title.toLowerCase().includes(search.toLowerCase())) &&
    (status === "" || a.status === status) &&
    (priority === "" || a.priority === priority) &&
    (date === "" || a.date === date)
  );
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // Sélection multiple
  const allChecked = paginated.length > 0 && paginated.every(a => selected.includes(a.id));
  const someChecked = paginated.some(a => selected.includes(a.id));
  const toggleAll = () => {
    if (allChecked) setSelected(selected.filter(id => !paginated.some(a => a.id === id)));
    else setSelected([...selected, ...paginated.filter(a => !selected.includes(a.id)).map(a => a.id)]);
  };
  const toggleOne = id => {
    setSelected(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id]);
  };

  // Actions du menu
  const handleViewDetails = (id) => {
    // Naviguer vers la page de détail (à implémenter)
    alert(`Voir les détails de l'anomalie #${id}`);
  };

  // Skeleton pour loading
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-3"><div className="h-4 w-4 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 w-16 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 w-32 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-200 rounded" /></td>
      <td className="px-4 py-3"><div className="h-4 w-8 bg-gray-200 rounded" /></td>
    </tr>
  );

  return (
    <div className="pt-16 p-8">
      <AuthenticatedHeader />
      <div className="space-y-6">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-bold">Supervision des anomalies</h1>
        </div>
        {/* Card Filtres */}
        <Card className="mb-2">
          <form className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1">Recherche</label>
              <Input
                placeholder="Rechercher par titre..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-48"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Statut</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-40 h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priorité</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-40 h-10 rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {priorityOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-44"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              iconName="RotateCw"
              iconPosition="left"
              onClick={() => { setSearch(""); setStatus(""); setPriority(""); setDate(""); }}
            >
              Réinitialiser
            </Button>
          </form>
        </Card>
        {/* Card DataTable */}
        <Card>
          {/* Empty State */}
          {!loading && paginated.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Icon name="SearchX" size={48} className="text-gray-300 mb-4" />
              <p className="text-lg text-gray-500 font-medium">Aucune anomalie trouvée correspondant à vos critères.</p>
            </div>
          )}
          {/* Table */}
          {(loading || paginated.length > 0) && (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* En-tête */}
                {!loading && paginated.length > 0 && (
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={allChecked}
                          ref={el => { if (el) el.indeterminate = !allChecked && someChecked; }}
                          onChange={toggleAll}
                          className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-primary"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priorité</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Soumis par</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigné à</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                )}
                <tbody className="bg-white divide-y divide-gray-100">
                  {loading
                    ? Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)
                    : paginated.map(a => (
                      <tr
                        key={a.id}
                        className="hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => handleViewDetails(a.id)}
                      >
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selected.includes(a.id)}
                            onChange={() => toggleOne(a.id)}
                            className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-primary"
                          />
                        </td>
                        <td className="px-4 py-3">{a.id}</td>
                        <td className="px-4 py-3">{a.title}</td>
                        <td className="px-4 py-3">
                          <Badge color={statusBadgeColor[a.status] || "bg-gray-100 text-gray-800"}>{a.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge color={priorityBadgeColor[a.priority] || "bg-gray-100 text-gray-800"}>{a.priority}</Badge>
                        </td>
                        <td className="px-4 py-3">{a.submittedBy}</td>
                        <td className="px-4 py-3">{a.assignedTo}</td>
                        <td className="px-4 py-3">{a.date}</td>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" iconName="MoreVertical" aria-label="Actions" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(a.id)}>
                                <Icon name="Eye" size={16} className="mr-2" /> Voir les détails
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Icon name="RefreshCw" size={16} className="mr-2" />
                                Changer le statut
                                {/* Sous-menu à implémenter */}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Icon name="UserPlus" size={16} className="mr-2" />
                                Assigner à un utilisateur
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination centrée */}
          {!loading && paginated.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)} iconName="ChevronLeft" iconPosition="left">Précédent</Button>
              <span className="text-sm">Page {page} / {totalPages || 1}</span>
              <Button variant="outline" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)} iconName="ChevronRight" iconPosition="right">Suivant</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AnomalySupervisionPage; 