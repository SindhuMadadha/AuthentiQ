import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { useScreening } from '../context/ScreeningContext';
import { DemoCaseId } from '../types/screening';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { runDemo } = useScreening();

  const handleRunDemo = (demoId: DemoCaseId) => {
    runDemo(demoId);
    navigate(`/screening/report?demo=${demoId}`);
  };

  const volumeBars = [
    { height: '40%', value: 120 },
    { height: '60%', value: 180 },
    { height: '85%', value: 250 },
    { height: '45%', value: 135 },
    { height: '30%', value: 90 },
    { height: '70%', value: 210 },
    { height: '95%', value: 285, active: true },
    { height: '50%', value: 150 },
  ];

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader title="Overview" />

        {/* Dashboard Scrollable Content */}
        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-8">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Total Screened */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col relative overflow-hidden group shadow-sm">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-surface-container-high rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="flex justify-between items-start mb-4 z-10">
                <p className="text-label-mono font-label-mono text-on-surface-variant">
                  Total Screened (Today)
                </p>
                <span className="material-symbols-outlined text-secondary text-[22px]">group</span>
              </div>
              <div className="z-10">
                <h2 className="text-display-lg font-display-lg font-bold text-primary">1,248</h2>
                <div className="flex items-center gap-1 mt-2 text-secondary">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="text-body-sm font-body-sm font-medium">+12% vs yesterday</span>
                </div>
              </div>
            </div>

            {/* Flagged for Review */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col relative overflow-hidden group shadow-sm">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-error-container rounded-full opacity-30 group-hover:scale-110 transition-transform" />
              <div className="flex justify-between items-start mb-4 z-10">
                <p className="text-label-mono font-label-mono text-on-surface-variant">
                  Flagged for Review
                </p>
                <span className="material-symbols-outlined text-error text-[22px]">flag</span>
              </div>
              <div className="z-10">
                <h2 className="text-display-lg font-display-lg font-bold text-primary">42</h2>
                <div className="flex items-center gap-1 mt-2 text-error">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <span className="text-body-sm font-body-sm font-medium">Requires attention</span>
                </div>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col relative overflow-hidden group shadow-sm">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-fixed rounded-full opacity-30 group-hover:scale-110 transition-transform" />
              <div className="flex justify-between items-start mb-4 z-10">
                <p className="text-label-mono font-label-mono text-on-surface-variant">
                  Active Alerts
                </p>
                <span className="material-symbols-outlined text-on-tertiary-container text-[22px]">
                  notifications_active
                </span>
              </div>
              <div className="z-10">
                <h2 className="text-display-lg font-display-lg font-bold text-primary">3</h2>
                <div className="flex items-center gap-1 mt-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">priority_high</span>
                  <span className="text-body-sm font-body-sm">High priority</span>
                </div>
              </div>
            </div>

            {/* Avg Processing Time */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col relative overflow-hidden group shadow-sm">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed-dim rounded-full opacity-30 group-hover:scale-110 transition-transform" />
              <div className="flex justify-between items-start mb-4 z-10">
                <p className="text-label-mono font-label-mono text-on-surface-variant">
                  Avg Processing Time
                </p>
                <span className="material-symbols-outlined text-primary-container text-[22px]">
                  timer
                </span>
              </div>
              <div className="z-10">
                <h2 className="text-display-lg font-display-lg font-bold text-primary">1.8s</h2>
                <div className="flex items-center gap-1 mt-2 text-secondary">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span className="text-body-sm font-body-sm">Optimal performance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Split Layout: Activity Table (2 col) + Volume Chart (1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Recent Activity Table */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
              <div className="p-6 border-b border-outline-variant flex justify-between items-center">
                <h3 className="text-headline-md font-headline-md font-bold text-primary">
                  Recent Activity
                </h3>
                <button
                  onClick={() => navigate('/history')}
                  className="text-secondary hover:text-primary transition-colors text-label-mono font-label-mono flex items-center gap-1 text-[12px] font-semibold uppercase"
                >
                  View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant text-label-mono font-label-mono text-on-surface-variant text-[11px] uppercase">
                      <th className="py-4 px-6 font-semibold">Passenger Name</th>
                      <th className="py-4 px-6 font-semibold">Document Type</th>
                      <th className="py-4 px-6 font-semibold">Risk Level</th>
                      <th className="py-4 px-6 font-semibold text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-body-md font-body-md divide-y divide-outline-variant/60">
                    {/* Row 1 - High Risk */}
                    <tr
                      onClick={() => handleRunDemo('demo-3')}
                      className="hover:bg-surface-container-low transition-colors group cursor-pointer bg-error-container/10"
                    >
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-xs">
                          DK
                        </div>
                        <span className="text-primary font-semibold group-hover:text-secondary transition-colors">
                          Dmitri Kovalev
                        </span>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant text-body-sm">
                        Passport (RUS)
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error text-on-error text-label-mono font-label-mono text-[11px] font-bold">
                          <span className="material-symbols-outlined text-[14px]">warning</span>
                          High
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right text-on-surface-variant text-body-sm font-label-mono">
                        10:42 AM
                      </td>
                    </tr>

                    {/* Row 2 - Low Risk */}
                    <tr
                      onClick={() => handleRunDemo('demo-1')}
                      className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                    >
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-xs">
                          SJ
                        </div>
                        <span className="text-primary font-semibold group-hover:text-secondary transition-colors">
                          Sarah Jenkins
                        </span>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant text-body-sm">
                        e-Visa (USA)
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant text-label-mono font-label-mono text-[11px] border border-outline-variant font-medium">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Low
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right text-on-surface-variant text-body-sm font-label-mono">
                        10:38 AM
                      </td>
                    </tr>

                    {/* Row 3 - Medium Risk */}
                    <tr
                      onClick={() => handleRunDemo('demo-2')}
                      className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                    >
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-xs">
                          MR
                        </div>
                        <span className="text-primary font-semibold group-hover:text-secondary transition-colors">
                          Marco Rossi
                        </span>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant text-body-sm">
                        ID Card (ITA)
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-mono font-label-mono text-[11px] border border-tertiary-fixed-dim font-medium">
                          <span className="material-symbols-outlined text-[14px]">info</span>
                          Med
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right text-on-surface-variant text-body-sm font-label-mono">
                        10:35 AM
                      </td>
                    </tr>

                    {/* Row 4 - Low Risk */}
                    <tr
                      onClick={() => handleRunDemo('demo-1')}
                      className="hover:bg-surface-container-low transition-colors group cursor-pointer"
                    >
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-xs">
                          AK
                        </div>
                        <span className="text-primary font-semibold group-hover:text-secondary transition-colors">
                          Aisha Khan
                        </span>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant text-body-sm">
                        Passport (GBR)
                      </td>
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-variant text-on-surface-variant text-label-mono font-label-mono text-[11px] border border-outline-variant font-medium">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Low
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right text-on-surface-variant text-body-sm font-label-mono">
                        10:31 AM
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Volume Chart Card */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col h-full min-h-[300px] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-headline-md font-headline-md font-bold text-primary">
                  Screening Volume
                </h3>
                <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px] uppercase">
                  Last 8 Hrs
                </span>
              </div>

              {/* Chart Visual Representation */}
              <div className="flex-1 flex items-end justify-between gap-2 pt-8 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
                  <div className="border-b border-surface-variant border-dashed w-full opacity-50" />
                  <div className="border-b border-surface-variant border-dashed w-full opacity-50" />
                  <div className="border-b border-surface-variant border-dashed w-full opacity-50" />
                  <div className="border-b border-surface-variant w-full" />
                </div>

                {/* Bars */}
                {volumeBars.map((bar, idx) => (
                  <div
                    key={idx}
                    style={{ height: bar.height }}
                    className={`w-full rounded-t-sm relative group transition-colors z-10 cursor-pointer ${
                      bar.active
                        ? 'bg-secondary'
                        : 'bg-secondary-fixed-dim hover:bg-secondary'
                    }`}
                  >
                    <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-label-mono px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow-md">
                      {bar.value} scans
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-3 text-label-mono font-label-mono text-outline-variant text-[11px]">
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span className="text-secondary font-bold">Now</span>
              </div>
            </div>
          </div>

          {/* Demo Screening Cases Section */}
          <div className="mt-8 pt-4 border-t border-outline-variant/60">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-headline-md font-headline-md font-bold text-primary">
                  Demo Screening Cases
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  Select a pre-configured screening outcome to inspect full forensic reports.
                </p>
              </div>
              <span className="text-label-mono font-label-mono text-outline text-[11px] uppercase tracking-wider">
                Interactive Test Vectors
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {/* Demo 1 */}
              <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col shadow-sm hover:border-secondary transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-body-lg font-bold text-primary">Demo 1</h4>
                    <p className="text-body-sm text-on-surface-variant">Genuine Document</p>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant text-label-mono border border-outline-variant text-[11px] font-medium">
                    Low Risk
                  </div>
                </div>
                <div className="flex-1 mb-6">
                  <div className="flex flex-col gap-1 mb-3 bg-surface-container-low p-2.5 rounded">
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Status:</span>
                      <span className="font-semibold text-secondary">Genuine</span>
                    </div>
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Confidence:</span>
                      <span className="font-semibold text-primary">98%</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    All document details, MRZ data, photograph, and security checks are consistent.
                  </p>
                </div>
                <button
                  onClick={() => handleRunDemo('demo-1')}
                  className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-medium hover:bg-on-background transition-colors flex items-center justify-center gap-1.5 shadow-sm text-body-sm"
                >
                  <span>Run Demo</span>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              </div>

              {/* Demo 2 */}
              <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col shadow-sm hover:border-warning transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-body-lg font-bold text-primary">Demo 2</h4>
                    <p className="text-body-sm text-on-surface-variant">Expired Document</p>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-mono border border-tertiary-fixed-dim text-[11px] font-medium">
                    Med Risk
                  </div>
                </div>
                <div className="flex-1 mb-6">
                  <div className="flex flex-col gap-1 mb-3 bg-surface-container-low p-2.5 rounded">
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Status:</span>
                      <span className="font-semibold text-on-tertiary-container">Expired</span>
                    </div>
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Confidence:</span>
                      <span className="font-semibold text-primary">96%</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Document appears authentic, but the validity date has expired.
                  </p>
                </div>
                <button
                  onClick={() => handleRunDemo('demo-2')}
                  className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-medium hover:bg-on-background transition-colors flex items-center justify-center gap-1.5 shadow-sm text-body-sm"
                >
                  <span>Run Demo</span>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              </div>

              {/* Demo 3 */}
              <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col shadow-sm hover:border-error transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-body-lg font-bold text-primary">Demo 3</h4>
                    <p className="text-body-sm text-on-surface-variant">Tampered Document</p>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-error text-on-error text-label-mono text-[11px] font-bold">
                    High Risk
                  </div>
                </div>
                <div className="flex-1 mb-6">
                  <div className="flex flex-col gap-1 mb-3 bg-error-container/20 p-2.5 rounded border border-error/20">
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Status:</span>
                      <span className="font-bold text-error">Suspected Tampering</span>
                    </div>
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Confidence:</span>
                      <span className="font-semibold text-primary">94%</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Visual inconsistencies suggest possible alteration of the document photo/laminate.
                  </p>
                </div>
                <button
                  onClick={() => handleRunDemo('demo-3')}
                  className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-medium hover:bg-on-background transition-colors flex items-center justify-center gap-1.5 shadow-sm text-body-sm"
                >
                  <span>Run Demo</span>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                </button>
              </div>

              {/* Demo 4 */}
              <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col shadow-sm hover:border-error transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-body-lg font-bold text-primary">Demo 4</h4>
                    <p className="text-body-sm text-on-surface-variant">Modified Info</p>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-error text-on-error text-label-mono text-[11px] font-bold">
                    High Risk
                  </div>
                </div>
                <div className="flex-1 mb-6">
                  <div className="flex flex-col gap-1 mb-3 bg-error-container/20 p-2.5 rounded border border-error/20">
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Status:</span>
                      <span className="font-bold text-error">Info Mismatch</span>
                    </div>
                    <div className="flex justify-between text-body-sm">
                      <span className="text-on-surface-variant">Confidence:</span>
                      <span className="font-semibold text-primary">91%</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed">
                    Extracted information contains inconsistencies compared with the document MRZ data.
                  </p>
                </div>
                <button
                  onClick={() => handleRunDemo('demo-4')}
                  className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-medium hover:bg-on-background transition-colors flex items-center justify-center gap-1.5 shadow-sm text-body-sm"
                >
                  <span>Run Demo</span>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
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
