import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Download,
  Trash2,
  Edit2,
  Key,
  CheckCircle,
  XCircle,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';
import { Student } from '../../types';
import { saveStudent, deleteStudent } from '../../services/quizService';

interface StudentManagerProps {
  students: Student[];
  onRefresh: () => void;
}

export const StudentManager: React.FC<StudentManagerProps> = ({ students, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const openAdd = () => {
    setEditingStudent(null);
    setFullName('');
    setRollNumber(`CY-2026-${String(students.length + 1).padStart(2, '0')}`);
    setStudentId(`STU-${1000 + students.length + 1}`);
    setPasscode(Math.random().toString(36).slice(-6));
    setEmail('');
    setIsActive(true);
    setFormError(null);
    setShowAddModal(true);
  };

  const openEdit = (s: Student) => {
    setEditingStudent(s);
    setFullName(s.fullName);
    setRollNumber(s.rollNumber);
    setStudentId(s.studentId);
    setPasscode(s.passcode);
    setEmail(s.email || '');
    setIsActive(s.isActive);
    setFormError(null);
    setShowAddModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !rollNumber.trim() || !studentId.trim() || !passcode.trim()) {
      setFormError('Please fill all required student account fields.');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const targetStudent: Student = {
      id: studentId.trim(),
      studentId: studentId.trim(),
      rollNumber: rollNumber.trim(),
      fullName: fullName.trim(),
      passcode: passcode.trim(),
      email: email.trim() || undefined,
      isActive,
      createdAt: editingStudent?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveStudent(targetStudent);
      setShowAddModal(false);
      onRefresh();
    } catch (err) {
      console.error(err);
      setFormError('Error saving student record in database.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (sid: string) => {
    if (window.confirm(`Are you sure you want to delete student ${sid}?`)) {
      try {
        await deleteStudent(sid);
        onRefresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleActive = async (s: Student) => {
    try {
      await saveStudent({
        ...s,
        isActive: !s.isActive,
        updatedAt: new Date().toISOString(),
      });
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const exportStudentCredentialsCSV = () => {
    const headers = ['Student ID', 'Roll Number', 'Full Name', 'Passcode', 'Email', 'Active Status', 'Created At'];
    const rows = students.map((s) => [
      `"${s.studentId}"`,
      `"${s.rollNumber}"`,
      `"${s.fullName}"`,
      `"${s.passcode}"`,
      `"${s.email || ''}"`,
      `"${s.isActive ? 'Active' : 'Suspended'}"`,
      `"${s.createdAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `student_credentials_roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.fullName.toLowerCase().includes(q) ||
      s.rollNumber.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Student Account &amp; Credential Directory
          </h2>
          <p className="text-xs text-slate-400">
            Create, issue login credentials, and manage authorized participants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportStudentCredentialsCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all"
            title="Download CSV for printing or emailing credentials"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Export Roster (CSV)
          </button>

          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Enroll Student
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-3.5 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, roll number, or student ID..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="text-xs font-mono text-slate-400">
            {filtered.length} of {students.length} students
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Login ID</th>
                <th className="py-3 px-4">Passcode</th>
                <th className="py-3 px-4">Access Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-400">No students registered yet</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Click &quot;Enroll Student&quot; above to create authorized student accounts and issue credentials.
                    </p>
                  </td>
                </tr>
              ) : filtered.map((s) => (
                  <tr key={s.studentId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-sm">{s.fullName}</div>
                    <div className="text-[11px] text-slate-500">{s.email || 'No email registered'}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-cyan-300">
                    {s.rollNumber}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {s.studentId}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-amber-300">
                      {s.passcode}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleActive(s)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                        s.isActive
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'bg-red-500/10 border border-red-500/30 text-red-400'
                      }`}
                    >
                      {s.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> Deactivated
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEdit(s)}
                        title="Edit Student Info"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.studentId)}
                        title="Delete Student"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/40 hover:text-red-400 text-slate-400 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl">
            <h3 className="font-bold text-base text-white mb-1">
              {editingStudent ? 'Edit Student Account' : 'Enroll New Student'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Configure credentials and roll information for the cyber training program.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Roll Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. CY-2026-05"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Login ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    disabled={!!editingStudent}
                    placeholder="e.g. STU-1005"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Assigned Passcode <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Secret passcode"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-amber-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@institution.edu"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="isActiveToggle" className="text-xs text-slate-300">
                  Allow student access to take training quizzes (Active)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
                >
                  {submitting ? 'Saving...' : 'Save Student Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
