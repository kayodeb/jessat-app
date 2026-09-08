'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Search,
  Mail,
  UserPlus,
  X,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/admin-header'
import { useAdminStore } from '@/lib/admin-store'
import { AdminUser, UserRole } from '@/types/admin'

export default function AdminUsersPage() {
  const { users, updateUserRole, toggleUserStatus, addUser } = useAdminStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('ADMIN')

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter

    return matchesSearch && matchesRole
  })

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addUser({
      name,
      email,
      role,
      status: 'ACTIVE',
    })
    setIsModalOpen(false)
    setName('')
    setEmail('')
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <AdminHeader
        title="Comptes & Utilisateurs"
        subtitle="Supervisez les clients enregistrés, attribuez les privilèges administrateur et gérez l'accès."
      />

      <main className="flex-1 overflow-y-auto space-y-6 max-w-7xl w-full mx-auto pr-2 pb-12">
        {/* Controls Bar (Sticky / Fixed) */}
        <div className="sticky top-0 z-20 bg-[#f3f4f8]/95 backdrop-blur-md pt-1 pb-2">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom ou email..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Filter by role */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              >
                <option value="ALL">Tous les rôles</option>
                <option value="SUPER_ADMIN">Super Admins</option>
                <option value="ADMIN">Administrateurs</option>
                <option value="USER">Clients (Users)</option>
              </select>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-sm transition-all whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" /> Ajouter Compte Admin
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">Utilisateur</th>
                  <th className="py-4 px-4">Rôle / Privilège</th>
                  <th className="py-4 px-4">Statut</th>
                  <th className="py-4 px-4">Commandes & Achats</th>
                  <th className="py-4 px-4">Inscrit le</th>
                  <th className="py-4 px-6 text-right">Actions Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* User info */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xs shadow-sm">
                            {u.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">{u.name}</h4>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                            <Mail className="w-3 h-3 text-slate-400" /> {u.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4">
                      {u.role === 'SUPER_ADMIN' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <ShieldCheck className="w-3 h-3" /> Super Admin
                        </span>
                      ) : u.role === 'ADMIN' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                          <UserCheck className="w-3 h-3" /> Administrateur
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200/60">
                          Client (User)
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-rose-50 text-rose-600 border border-rose-200'
                        }`}
                      >
                        {u.status === 'ACTIVE' ? 'Actif' : 'Suspendu'}
                      </span>
                    </td>

                    {/* Orders count */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {u.ordersCount !== undefined ? (
                        <span>
                          <strong className="text-slate-900">{u.ordersCount}</strong> commandes (
                          {u.totalSpent ? `${u.totalSpent} €` : '0 €'})
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Joined date */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right">
                      {u.role !== 'SUPER_ADMIN' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              updateUserRole(
                                u.id,
                                u.role === 'ADMIN' ? 'USER' : 'ADMIN'
                              )
                            }
                            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-blue-600 font-bold text-[11px] transition-colors"
                          >
                            {u.role === 'ADMIN' ? 'Passer Client' : 'Promouvoir Admin'}
                          </button>

                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`p-2 rounded-xl border transition-colors ${
                              u.status === 'ACTIVE'
                                ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200'
                                : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                            }`}
                            title={u.status === 'ACTIVE' ? 'Suspendre' : 'Réactiver'}
                          >
                            {u.status === 'ACTIVE' ? (
                              <UserX className="w-3.5 h-3.5" />
                            ) : (
                              <UserCheck className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Propriétaire
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Add User */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-blue-600" />
                  <span>Créer un Compte Administrateur</span>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddUserSubmit} className="p-5 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex: Jean Valjean"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ex: jean@jessat.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Rôle de l'utilisateur *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                  >
                    <option value="ADMIN">Administrateur</option>
                    <option value="SUPER_ADMIN">Super Administrateur</option>
                    <option value="USER">Client (User)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-700 font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold text-white shadow-md shadow-blue-600/30"
                  >
                    Créer le compte
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
