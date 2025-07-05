import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Icon from "../components/AppIcon";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import AuthenticatedHeader from '../components/ui/AuthenticatedHeader';
// TODO: Import Tabs, Card, Dialog, Accordion, Switch, Textarea depuis Shadcn/ui ou implémenter si besoin

// Modal générique
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-modal w-full max-w-lg p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="icon" iconName="X" aria-label="Fermer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

const initialAnnouncements = [
  { id: 1, title: "Titre exemple", author: "Admin Système", date: "2024-06-10", status: "Publié", content: "Ceci est le contenu de l'annonce.", published: true },
];
const initialFaq = [
  { id: 1, question: "Exemple de question fréquente ?", answer: "Ceci est la réponse à la question fréquente." },
];

const ContentManagementPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("announcements");
  // Annonces
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  // Formulaire annonce
  const [form, setForm] = useState({ title: "", content: "", published: true });
  // FAQ
  const [faq, setFaq] = useState(initialFaq);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "" });

  // Gestion modals annonces
  const openCreateModal = () => {
    setEditingAnnouncement(null);
    setForm({ title: "", content: "", published: true });
    setModalOpen(true);
  };
  const openEditModal = (a) => {
    setEditingAnnouncement(a);
    setForm({ title: a.title, content: a.content, published: a.published });
    setModalOpen(true);
  };
  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    if (editingAnnouncement) {
      setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? { ...editingAnnouncement, ...form, status: form.published ? "Publié" : "Brouillon" } : a));
    } else {
      setAnnouncements([...announcements, { id: Date.now(), author: "Admin Système", date: new Date().toISOString().slice(0,10), status: form.published ? "Publié" : "Brouillon", ...form }]);
    }
    setModalOpen(false);
  };
  const handleArchive = (a) => {
    alert("Annonce archivée (mock)");
  };
  const handleDelete = (a) => {
    setAnnouncements(announcements.filter(x => x.id !== a.id));
  };

  // Gestion modals FAQ
  const openCreateFaqModal = () => {
    setEditingFaq(null);
    setFaqForm({ question: "", answer: "" });
    setFaqModalOpen(true);
  };
  const openEditFaqModal = (f) => {
    setEditingFaq(f);
    setFaqForm({ question: f.question, answer: f.answer });
    setFaqModalOpen(true);
  };
  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (editingFaq) {
      setFaq(faq.map(fq => fq.id === editingFaq.id ? { ...editingFaq, ...faqForm } : fq));
    } else {
      setFaq([...faq, { id: Date.now(), ...faqForm }]);
    }
    setFaqModalOpen(false);
  };
  const handleDeleteFaq = (f) => {
    setFaq(faq.filter(x => x.id !== f.id));
  };

  return (
    <div className="pt-16 p-8">
      <AuthenticatedHeader />
      <div className="p-6 space-y-6">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl font-bold">Gestion du contenu</h1>
        </div>
        {/* Tabs */}
        <div className="mb-4">
          <div className="flex border-b border-border">
            <button
              className={`px-4 py-2 font-semibold transition-colors ${tab === "announcements" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}
              onClick={() => setTab("announcements")}
            >
              Gestion des Annonces
            </button>
            <button
              className={`ml-4 px-4 py-2 font-semibold transition-colors ${tab === "faq" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-primary"}`}
              onClick={() => setTab("faq")}
            >
              Gestion de la FAQ
            </button>
          </div>
        </div>
        {/* Onglet 1 : Gestion des Annonces */}
        {tab === "announcements" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            {/* CardHeader */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Toutes les annonces</h2>
              <Button variant="primary" iconName="PlusCircle" iconPosition="left" onClick={openCreateModal}>
                Rédiger une annonce
              </Button>
            </div>
            {/* CardContent : DataTable */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre de l'annonce</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date de Publication</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {announcements.map(a => (
                    <tr key={a.id}>
                      <td className="px-4 py-3">{a.title}</td>
                      <td className="px-4 py-3">{a.author}</td>
                      <td className="px-4 py-3">{a.date}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${a.status === "Publié" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{a.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" iconName="MoreVertical" aria-label="Actions" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditModal(a)}>
                              <Icon name="Pencil" size={16} className="mr-2" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleArchive(a)}>
                              <Icon name="Archive" size={16} className="mr-2" /> Archiver
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(a)}>
                              <Icon name="Trash" size={16} className="mr-2" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Modal Annonce */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingAnnouncement ? "Modifier l'annonce" : "Rédiger une annonce"}>
              <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contenu</label>
                  <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={6} className="w-full border border-border rounded-md px-3 py-2" required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} id="published" />
                  <label htmlFor="published" className="text-sm">Publier immédiatement</label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Annuler</Button>
                  <Button variant="primary" type="submit">Sauvegarder</Button>
                </div>
              </form>
            </Modal>
          </div>
        )}
        {/* Onglet 2 : Gestion de la FAQ */}
        {tab === "faq" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            {/* CardHeader */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Foire Aux Questions</h2>
              <Button variant="primary" iconName="PlusCircle" iconPosition="left" onClick={openCreateFaqModal}>
                Ajouter une question
              </Button>
            </div>
            {/* CardContent : Accordion FAQ */}
            <div>
              <div className="border-b border-border">
                {faq.map(f => (
                  <div className="py-2" key={f.id}>
                    <div className="flex items-center justify-between">
                      <button className="text-left font-medium flex-1" onClick={() => openEditFaqModal(f)}>{f.question}</button>
                      <div className="flex items-center gap-2 ml-2">
                        <Button variant="ghost" size="icon" iconName="Pencil" aria-label="Modifier" onClick={() => openEditFaqModal(f)} />
                        <Button variant="ghost" size="icon" iconName="Trash" aria-label="Supprimer" onClick={() => handleDeleteFaq(f)} />
                      </div>
                    </div>
                    <div className="pl-2 mt-2 text-gray-600 text-sm">{f.answer}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal FAQ */}
            <Modal open={faqModalOpen} onClose={() => setFaqModalOpen(false)} title={editingFaq ? "Modifier la question" : "Ajouter une question"}>
              <form onSubmit={handleSaveFaq} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Question</label>
                  <Input value={faqForm.question} onChange={e => setFaqForm(f => ({ ...f, question: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Réponse</label>
                  <textarea value={faqForm.answer} onChange={e => setFaqForm(f => ({ ...f, answer: e.target.value }))} rows={5} className="w-full border border-border rounded-md px-3 py-2" required />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" type="button" onClick={() => setFaqModalOpen(false)}>Annuler</Button>
                  <Button variant="primary" type="submit">Sauvegarder</Button>
                </div>
              </form>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagementPage; 