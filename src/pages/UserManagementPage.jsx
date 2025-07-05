import React, { useState, useMemo } from 'react';
import Button from '../components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AuthenticatedHeader from '../components/ui/AuthenticatedHeader';

// Badge générique pour rôle utilisateur
const RoleBadge = ({ role }) => {
  const config = {
    'Administrateur': 'bg-orange-100 text-orange-700',
    'Modérateur': 'bg-blue-100 text-blue-700',
    'Utilisateur': 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${config[role] || 'bg-gray-100 text-gray-700'}`}>{role}</span>
  );
};

// Modal de confirmation (AlertDialog)
const AlertDialog = ({ open, title, description, onConfirm, onCancel, loading }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-modal max-w-sm w-full">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <p className="text-sm text-text-secondary mt-2">{description}</p>
        </div>
        <div className="flex items-center justify-end space-x-3 p-6">
          <Button variant="ghost" onClick={onCancel} disabled={loading}>Annuler</Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>Confirmer</Button>
        </div>
      </div>
    </div>
  );
};

// Modal de création utilisateur
const CreateUserModal = ({ open, onClose, onCreate, loading }) => {
  const [form, setForm] = useState({ username: '', email: '', role: 'Utilisateur', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = 'Nom d\'utilisateur requis';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Email valide requis';
    if (!form.password.trim() || form.password.length < 6) errs.password = '6 caractères min.';
    return errs;
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onCreate(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-modal max-w-md w-full">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Créer un utilisateur</h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
            <input name="username" value={form.username} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md bg-background ${errors.username ? 'border-error' : 'border-border'} focus:ring-2 focus:ring-primary`} />
            {errors.username && <div className="text-xs text-error mt-1">{errors.username}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" value={form.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md bg-background ${errors.email ? 'border-error' : 'border-border'} focus:ring-2 focus:ring-primary`} />
            {errors.email && <div className="text-xs text-error mt-1">{errors.email}</div>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rôle</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-md bg-background focus:ring-2 focus:ring-primary">
              {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md bg-background ${errors.password ? 'border-error' : 'border-border'} focus:ring-2 focus:ring-primary`} />
            {errors.password && <div className="text-xs text-error mt-1">{errors.password}</div>}
          </div>
          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>Annuler</Button>
            <Button variant="primary" type="submit" loading={loading}>Créer</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MOCK_USERS = [
  { username: 'jdupont', email: 'j.dupont@email.com', role: 'Administrateur', createdAt: '2024-01-10' },
  { username: 'mlefevre', email: 'm.lefevre@email.com', role: 'Modérateur', createdAt: '2024-02-15' },
  { username: 'sbenali', email: 's.benali@email.com', role: 'Utilisateur', createdAt: '2024-03-01' },
  { username: 'acohen', email: 'a.cohen@email.com', role: 'Utilisateur', createdAt: '2024-03-12' },
  { username: 'lmartin', email: 'l.martin@email.com', role: 'Modérateur', createdAt: '2024-04-05' },
  { username: 'admin', email: 'admin@email.com', role: 'Administrateur', createdAt: '2024-01-01' },
  { username: 'user1', email: 'user1@email.com', role: 'Utilisateur', createdAt: '2024-04-10' },
  { username: 'user2', email: 'user2@email.com', role: 'Utilisateur', createdAt: '2024-04-12' },
  { username: 'mod1', email: 'mod1@email.com', role: 'Modérateur', createdAt: '2024-04-15' },
  { username: 'mod2', email: 'mod2@email.com', role: 'Modérateur', createdAt: '2024-04-18' },
];

const ROLES = ['Administrateur', 'Modérateur', 'Utilisateur'];
const PAGE_SIZE = 5;

const UserManagementPage = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, user: null });
  const [users, setUsers] = useState(MOCK_USERS);
  const [createModal, setCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const navigate = useNavigate();

  // Filtrage et recherche
  const filteredUsers = useMemo(() => {
    let data = users;
    if (roleFilter) data = data.filter(u => u.role === roleFilter);
    if (search) data = data.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    return data;
  }, [users, search, roleFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE) || 1;
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Suppression utilisateur (mock)
  const handleDelete = async () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(prev => prev.filter(u => u.username !== confirmDelete.user.username));
      setLoading(false);
      setConfirmDelete({ open: false, user: null });
      toast.success('Utilisateur supprimé avec succès');
    }, 1200);
  };

  // Création utilisateur (mock)
  const handleCreateUser = (form) => {
    setCreateLoading(true);
    setTimeout(() => {
      setUsers(prev => [
        { ...form, createdAt: new Date().toISOString().slice(0, 10) },
        ...prev
      ]);
      setCreateLoading(false);
      setCreateModal(false);
      toast.success('Utilisateur créé avec succès');
    }, 1200);
  };

  // Skeleton loading
  const isSkeleton = false; // Remplacer par true pour simuler le chargement

  return (
    <div className="pt-16 p-8 space-y-8">
      <AuthenticatedHeader />
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-foreground">Gestion des utilisateurs</h1>
        <Button variant="warning" iconName="UserPlus" className="text-white" onClick={() => setCreateModal(true)}>Créer un utilisateur</Button>
      </div>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border border-border rounded-md px-4 py-2 w-full md:w-1/2"
        />
        <select
          value={roleFilter}
          onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
          className="border border-border rounded-md px-4 py-2 w-full md:w-1/4"
        >
          <option value="">Tous les rôles</option>
          {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-xl shadow p-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Nom d'utilisateur</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Rôle</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date de création</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isSkeleton ? Array(PAGE_SIZE).fill(0).map((_, idx) => (
              <tr key={idx} className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-muted rounded w-24" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-muted rounded w-32" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-muted rounded w-20" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-muted rounded w-20" /></td>
                <td className="px-6 py-4 whitespace-nowrap"><div className="h-8 bg-muted rounded w-16" /></td>
              </tr>
            )) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">Aucun utilisateur trouvé.</td>
              </tr>
            ) : paginatedUsers.map((user) => (
              <tr key={user.username} className="hover:bg-accent/40 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap"><RoleBadge role={user.role} /></td>
                <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setConfirmDelete({ open: true, user })}>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-text-secondary">
          {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Précédent</Button>
          <span className="text-sm font-medium">Page {page} / {totalPages}</span>
          <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Suivant</Button>
        </div>
      </div>
      {/* Modal de confirmation */}
      <AlertDialog
        open={confirmDelete.open}
        title="Supprimer l'utilisateur ?"
        description={`Cette action est irréversible. Confirmez-vous la suppression de l'utilisateur "${confirmDelete.user?.username}" ?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete({ open: false, user: null })}
        loading={loading}
      />
      <CreateUserModal open={createModal} onClose={() => setCreateModal(false)} onCreate={handleCreateUser} loading={createLoading} />
    </div>
  );
};

export default UserManagementPage; 