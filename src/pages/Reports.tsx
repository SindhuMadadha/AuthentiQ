import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';

export const Reports: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title="Operational Reports & Analytics"
          subtitle="System throughput, risk distribution & border fraud metrics"
          actions={
            <button
              onClick={() => alert('Generating aggregated forensic report for current shift...')}
              className="px-4 py-2 bg-primary text-on-primary font-body-sm font-semibold rounded-lg hover:bg-on-background transition-colors text-xs flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              Export Shift Report
            </button>
          }
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px] uppercase">
                Total Monthly Volume
              </span>
              <h3 className="text-display-lg font-display-lg font-bold text-primary mt-2">
                48,920
              </h3>
              <p className="text-body-sm text-secondary font-medium mt-1">
                99.98% System Uptime
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px] uppercase">
                Fraud Detection Rate
              </span>
              <h3 className="text-display-lg font-display-lg font-bold text-error mt-2">
                3.4%
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-1">
                1,663 flagged documents intercepted
              </p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px] uppercase">
                Avg AI Processing Latency
              </span>
              <h3 className="text-display-lg font-display-lg font-bold text-primary mt-2">
                1.42s
              </h3>
              <p className="text-body-sm text-secondary font-medium mt-1">
                Includes OCR + Tampering + Biometrics
              </p>
            </div>
          </div>

          {/* Anomaly Distribution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <h3 className="text-headline-md font-headline-md font-bold text-primary mb-4 border-b border-outline-variant pb-3">
                Detected Fraud Typology
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-body-sm font-semibold mb-1">
                    <span>Photo Substitution & Laminate Tampering</span>
                    <span className="text-error font-mono">42%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-error h-full rounded-full w-[42%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-body-sm font-semibold mb-1">
                    <span>MRZ Checksum & Font Manipulation</span>
                    <span className="text-error font-mono">28%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-error h-full rounded-full w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-body-sm font-semibold mb-1">
                    <span>Expired Document / Overstay Risk</span>
                    <span className="text-warning font-mono">18%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-warning h-full rounded-full w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-body-sm font-semibold mb-1">
                    <span>Watchlist & Sanction Database Hits</span>
                    <span className="text-primary font-mono">12%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full w-[12%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-headline-md font-headline-md font-bold text-primary mb-4 border-b border-outline-variant pb-3">
                  Station Compliance & Audit Log
                </h3>
                <p className="text-body-sm text-on-surface-variant text-xs leading-relaxed mb-4">
                  All automated document screening events are immutably signed using Station Security Key ST-409 with FIPS 140-2 Level 3 hardware security modules.
                </p>
                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant font-mono text-xs text-on-surface space-y-1">
                  <div>[2024-10-24 14:32 UTC] AUDIT_PASS SCR-2024-893X OP_8832</div>
                  <div>[2024-10-24 14:02 UTC] TAMPER_FLAG AQ-9932-B OP_884-X9</div>
                  <div>[2024-10-24 13:45 UTC] EXPIRED_DOC V-773-M-11 OP_8832</div>
                  <div>[2024-10-24 13:10 UTC] AUDIT_PASS P-1100223-SG OP_8942</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-outline-variant flex justify-between items-center text-xs text-on-surface-variant font-label-mono">
                <span>Ledger Sync: Active</span>
                <span className="text-secondary font-bold">100% Verifiable</span>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};
