import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Upload,
  FileText,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  X,
  FileCode,
  FileType
} from 'lucide-react';

export function Documents() {
  const navigate = useNavigate();
  const { documents, addDocument, deleteDocument } = useApp();

  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [searchDocQuery, setSearchDocQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSimulatedUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            addDocument({
              id: `doc-${Date.now()}`,
              name: file.name,
              type: file.name.split('.').pop().toUpperCase(),
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              pages: 24,
              uploadedAt: 'Just now',
              status: 'Processed',
              subject: 'General Study Material',
              extractedPreview: `Extracted content simulation for ${file.name}. High-level summary of formulas, definitions, and structural concepts ready for RAG AI query.`
            });
            setIsUploading(false);
            setUploadProgress(0);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const filteredDocs = documents.filter(doc => {
    const matchesFilter = filterType === 'All' || doc.type === filterType;
    const matchesSearch = doc.name.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
                          doc.subject.toLowerCase().includes(searchDocQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    return b.id.localeCompare(a.id);
  });

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Documents</h1>
          <p className="page-subtitle">Manage, index, and preview your academic study materials</p>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="dropzone" style={{ marginBottom: '2rem' }}>
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleSimulatedUpload}
          accept=".pdf,.pptx,.docx,.txt"
        />
        <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Upload size={28} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>Drop your files here</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            or <span style={{ color: 'var(--accent)', fontWeight: 600 }}>browse from your computer</span>
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Supported formats: PDF, PPTX, DOCX, TXT (Max size: 10 MB)
          </p>
        </label>

        {isUploading && (
          <div style={{ marginTop: '1.5rem', maxWidth: '400px', margin: '1.5rem auto 0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
              <span>Uploading & processing...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Filters, Search & Sort Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Type:</span>
          {['All', 'PDF', 'PPTX', 'DOCX', 'TXT'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`btn btn-sm ${filterType === type ? 'btn-primary' : 'btn-secondary'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="topbar-search" style={{ width: '220px' }}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchDocQuery}
              onChange={(e) => setSearchDocQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select-field"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Document List Table */}
      {filteredDocs.length === 0 ? (
        <div className="card" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <FileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No study materials yet</h3>
          <p style={{ marginTop: '0.25rem', marginBottom: '1.25rem' }}>Upload your first document to start building your StudyVault.</p>
          <label htmlFor="file-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
            <Upload size={16} /> Upload Document
          </label>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Size</th>
                <th>Status</th>
                <th>Uploaded</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <FileText size={18} style={{ color: 'var(--accent)' }} />
                    {doc.name}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{doc.subject}</td>
                  <td>
                    <span className="badge badge-neutral">{doc.type}</span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{doc.size}</td>
                  <td>
                    <span className={`badge ${doc.status === 'Processed' ? 'badge-success' : doc.status === 'Processing' ? 'badge-warning' : 'badge-danger'}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{doc.uploadedAt}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.375rem' }}>
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="btn btn-secondary btn-sm btn-icon"
                        title="View Preview"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => deleteDocument(doc.id)}
                        className="btn btn-ghost btn-sm btn-icon"
                        style={{ color: 'var(--danger)' }}
                        title="Delete Document"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDoc && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={22} style={{ color: 'var(--accent)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>{selectedDoc.name}</h3>
                  <span className="badge badge-neutral" style={{ marginTop: '0.25rem' }}>{selectedDoc.type} • {selectedDoc.size}</span>
                </div>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => setSelectedDoc(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', backgroundColor: 'var(--bg-secondary)', padding: '0.875rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Subject</span>
                  <strong style={{ fontSize: '0.875rem' }}>{selectedDoc.subject}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Pages</span>
                  <strong style={{ fontSize: '0.875rem' }}>{selectedDoc.pages} Pages</strong>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Extracted Knowledge Preview</h4>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  maxHeight: '180px',
                  overflowY: 'auto'
                }}>
                  {selectedDoc.extractedPreview}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={() => setSelectedDoc(null)}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedDoc(null);
                    navigate('/chat');
                  }}
                >
                  <MessageSquare size={16} /> Ask AI about this document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
