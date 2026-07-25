import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Plus,
  Search,
  CheckCircle,
  FileCheck,
  Share2,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { HealthRecord, TabType } from '../types';

interface HealthRecordsScreenProps {
  records: HealthRecord[];
  setActiveTab: (tab: TabType) => void;
  onAddRecord: (newRecord: HealthRecord) => void;
}

export const HealthRecordsScreen: React.FC<HealthRecordsScreenProps> = ({
  records,
  setActiveTab,
  onAddRecord,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Prescription' | 'Lab Report' | 'Vaccination' | 'Doctor Note'>('Prescription');
  const [doctorName, setDoctorName] = useState('Dr. Sakthimaindan Karthikeyan');
  const [summary, setSummary] = useState('');

  const categories = ['All', 'Prescription', 'Lab Report', 'Vaccination', 'Doctor Note'];

  const filteredRecords = records.filter((r) => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRec: HealthRecord = {
      id: `REC-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      category: category,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      doctorName: doctorName || 'Thaai Clinic',
      fileSize: '1.5 MB',
      summary: summary || 'Patient uploaded medical record document.',
    };

    onAddRecord(newRec);
    setShowUploadModal(false);
    setTitle('');
    setSummary('');
  };

  return (
    <div className="flex-1 overflow-y-auto pb-28 bg-slate-50/50">
      <HeaderNav
        title="Health Records"
        subtitle="Secure digital vault for your medical history"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-5 pt-4 space-y-4">
        {/* Top Upload CTA Banner */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl p-5 text-white flex items-center justify-between shadow-md">
          <div className="space-y-1">
            <h3 className="font-extrabold text-base">Upload Medical Record</h3>
            <p className="text-pink-100 text-xs">Prescriptions, lab reports & scan files</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-white text-pink-600 hover:bg-pink-50 font-extrabold text-xs px-4 py-2.5 rounded-2xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <Upload className="w-4 h-4 stroke-[2.5]" /> Upload
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search prescriptions, lab tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white shadow-2xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Records List */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 text-center space-y-2 mt-4">
            <FileText className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-800 text-sm">No medical records found</h4>
            <p className="text-xs text-gray-400">Try adjusting your filter or search query.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-3xl p-4 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-sm">{rec.title}</h4>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {rec.date} • {rec.doctorName}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-gray-700">
                    {rec.category}
                  </span>
                </div>

                <p className="text-xs text-gray-600 font-normal bg-slate-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                  {rec.summary}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400 font-mono font-semibold">
                    PDF • {rec.fileSize}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => alert(`Sharing record ${rec.title}...`)}
                      className="text-gray-500 hover:text-pink-600 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>

                    <button
                      onClick={() => alert(`Downloading ${rec.title}...`)}
                      className="text-pink-600 font-bold flex items-center gap-1 text-[11px] hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" /> View / Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleUploadSubmit}
            className="bg-white rounded-3xl p-6 max-w-[380px] w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-gray-900 text-base">Upload Medical Record</h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Record Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blood Test Report, Antibiotics Prescription"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Prescription">Prescription</option>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Vaccination">Vaccination Record</option>
                  <option value="Doctor Note">Doctor Note</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Doctor / Lab Name</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Summary / Notes</label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Key observations or dosage instructions..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="border-2 border-dashed border-pink-200 rounded-2xl p-4 text-center bg-pink-50/50">
                <Upload className="w-6 h-6 text-pink-600 mx-auto mb-1" />
                <p className="font-bold text-pink-700">Choose File or Take Photo</p>
                <p className="text-[10px] text-gray-400">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md shadow-pink-200 text-xs transition-all"
            >
              Save to Health Vault
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
