import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { useScreening } from '../context/ScreeningContext';
import { RiskLevel } from '../types/screening';

export const ScreeningHistory: React.FC = () => {
  const navigate = useNavigate();
  const { history } = useScreening();

  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [docTypeFilter, setDocTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredHistory = history.filter((item) => {
    if (riskFilter !== 'all' && item.riskLevel.toLowerCase() !== riskFilter.toLowerCase()) {
      return false;
    }
    if (docTypeFilter !== 'all' && item.documentType.toLowerCase() !== docTypeFilter.toLowerCase()) {
      return false;
    }
    if (
      searchQuery &&
      !item.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.documentId.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.officerId.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getDemoForRecord = (riskLevel: RiskLevel, docType: string) => {
    if (riskLevel === 'HIGH') {
      return docType === 'Passport' ? 'demo-3' : 'demo-4';
    }
    if (riskLevel === 'MEDIUM') {
      return 'demo-2';
    }
    return 'demo-1';
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title="Screening History"
          subtitle="Audit ledger & historical risk assessment archives"
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          {/* Header Description */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-headline-lg font-headline-lg font-bold text-primary mb-1">
                Screening Audit History
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant text-sm">
                Review past document audits, biometric matches, and AI risk assessments.
              </p>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
            <div className="flex flex-wrap gap-4 items-end">
              {/* Date Range */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-label-mono font-label-mono text-on-surface-variant mb-1 uppercase text-[11px] font-bold">
                  Date Range
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                    calendar_today
                  </span>
                  <input
                    type="text"
                    value="Oct 12 - Oct 19, 2024"
                    readOnly
                    className="w-full pl-10 pr-3 py-2 bg-surface border border-outline-variant rounded-lg text-body-sm font-mono text-xs focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  />
                </div>
              </div>

              {/* Risk Level */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-label-mono font-label-mono text-on-surface-variant mb-1 uppercase text-[11px] font-bold">
                  Risk Level
                </label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg text-body-sm text-xs focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">Critical (High)</option>
                  <option value="medium">Elevated (Med)</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>

              {/* Document Type */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-label-mono font-label-mono text-on-surface-variant mb-1 uppercase text-[11px] font-bold">
                  Document Type
                </label>
                <select
                  value={docTypeFilter}
                  onChange={(e) => setDocTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-outline-variant rounded-lg text-body-sm text-xs focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="passport">Passport</option>
                  <option value="national id">National ID</option>
                  <option value="visa">Visa</option>
                </select>
              </div>

              {/* Search ID */}
              <div className="flex-1 min-w-[180px]">
                <label className="block text-label-mono font-label-mono text-on-surface-variant mb-1 uppercase text-[11px] font-bold">
                  Search Name / ID
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-surface border border-outline-variant rounded-lg text-body-sm text-xs focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setRiskFilter('all');
                  setDocTypeFilter('all');
                  setSearchQuery('');
                }}
                className="bg-surface-container-high hover:bg-surface-container border border-outline-variant text-on-surface py-2 px-4 rounded-lg text-body-sm font-semibold transition-colors flex items-center gap-1.5 text-xs h-9"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Reset
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant sticky top-0 z-10 text-label-mono font-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-4 px-6 font-semibold w-48">Date/Time</th>
                    <th className="py-4 px-6 font-semibold">Passenger Name</th>
                    <th className="py-4 px-6 font-semibold">Document ID</th>
                    <th className="py-4 px-6 font-semibold w-36">AI Risk</th>
                    <th className="py-4 px-6 font-semibold w-40">Status</th>
                    <th className="py-4 px-6 font-semibold text-right w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="text-body-sm divide-y divide-outline-variant/60">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((row) => {
                      const isHigh = row.riskLevel === 'HIGH';
                      const isMed = row.riskLevel === 'MEDIUM';

                      return (
                        <tr
                          key={row.id}
                          onClick={() =>
                            navigate(
                              `/screening/report?demo=${getDemoForRecord(
                                row.riskLevel,
                                row.documentType
                              )}`
                            )
                          }
                          className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                        >
                          <td className="py-4 px-6 text-on-surface whitespace-nowrap">
                            <div className="font-semibold">{row.dateTime.split(' ')[0]}</div>
                            <div className="text-on-surface-variant text-[11px] font-mono">
                              {row.dateTime.split(' ').slice(1).join(' ')}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-on-surface font-semibold group-hover:text-secondary transition-colors">
                            {row.passengerName}
                          </td>
                          <td className="py-4 px-6 text-on-surface-variant font-mono text-xs">
                            {row.documentId} ({row.documentType})
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-[11px] ${
                                  isHigh
                                    ? 'border-error bg-error-container text-error'
                                    : isMed
                                    ? 'border-warning bg-warning-container text-warning'
                                    : 'border-secondary bg-surface text-secondary'
                                }`}
                              >
                                {row.aiRiskScore}%
                              </div>
                              {isHigh && (
                                <span className="material-symbols-outlined text-error text-[16px]">
                                  warning
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                                row.status === 'Approved'
                                  ? 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]'
                                  : row.status === 'Denied'
                                  ? 'bg-error-container text-on-error-container border-[#ffb4ab]'
                                  : 'bg-[#fef7e0] text-[#b06000] border-[#fce8b2]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                {row.status === 'Approved'
                                  ? 'check_circle'
                                  : row.status === 'Denied'
                                  ? 'block'
                                  : 'search'}
                              </span>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/screening/report?demo=${getDemoForRecord(
                                    row.riskLevel,
                                    row.documentType
                                  )}`
                                );
                              }}
                              className="text-secondary hover:text-primary font-bold text-xs uppercase tracking-wide group-hover:underline inline-flex items-center gap-1"
                            >
                              Report
                              <span className="material-symbols-outlined text-[14px]">
                                arrow_forward
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-on-surface-variant text-sm">
                        No screening records matching the active filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="border-t border-outline-variant bg-surface px-6 py-3.5 flex items-center justify-between mt-auto">
              <span className="text-body-sm text-on-surface-variant text-xs font-label-mono">
                Showing 1-{filteredHistory.length} of 1,248 records
              </span>
              <div className="flex gap-2">
                <button
                  disabled
                  className="p-1.5 rounded-lg border border-outline-variant text-outline opacity-50 cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="p-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};
