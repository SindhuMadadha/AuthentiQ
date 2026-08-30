import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { ScreeningStepper } from '../components/screening/ScreeningStepper';
import { useScreening } from '../context/ScreeningContext';

export const RiskAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { activeScreeningId, riskData } = useScreening();

  const handleDecision = (decision: 'APPROVE' | 'FLAG' | 'REJECT') => {
    if (decision === 'REJECT') {
      if (window.confirm('Confirm rejection of entry for this passenger?')) {
        navigate('/screening/report?decision=rejected');
      }
    } else if (decision === 'FLAG') {
      alert('Case flagged and escalated to Border Supervisor.');
      navigate('/screening/report?decision=flagged');
    } else {
      navigate('/screening/report');
    }
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title="Assessment Results"
          subtitle={`Case #${activeScreeningId} • Comprehensive AI Risk Scoring`}
          badge={{ text: 'AI MODEL: AQ-V4.2 ACTIVE', color: 'emerald' }}
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          <ScreeningStepper currentStep={6} />

          {/* Legal / Policy Decision Support Banner */}
          <div className="bg-surface-container-high border border-outline-variant rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <span className="material-symbols-outlined text-secondary shrink-0 text-[22px] mt-0.5">
              gavel
            </span>
            <div className="text-body-sm text-on-surface-variant text-xs leading-relaxed">
              <strong className="text-primary font-semibold">Decision-Support Notice: </strong>
              AI results are decision-support information for authorized border and security officers and do not constitute an automated legal verdict. Authorized officers retain full discretion and ultimate responsibility for clearance decisions.
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: Consolidated Risk Score (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[420px]">
                {/* Ambient background glow */}
                <div className="absolute inset-0 bg-emerald-50/40 pointer-events-none" />

                <h3 className="text-headline-md font-headline-md font-bold text-primary w-full text-left mb-6 z-10">
                  Consolidated Risk Score
                </h3>

                {/* Custom SVG Risk Gauge */}
                <div className="relative w-60 h-60 flex items-center justify-center z-10 my-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="45"
                      stroke="#e5eeff"
                      strokeDasharray="282.7"
                      strokeDashoffset="0"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="45"
                      stroke="#005db6"
                      strokeDasharray="282.7"
                      strokeDashoffset="240"
                      strokeWidth="8"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-[52px] font-display-lg font-bold text-secondary leading-none">
                      {riskData.riskScore}
                    </span>
                    <span className="text-label-mono font-label-mono text-on-surface-variant mt-1.5 tracking-widest uppercase text-[11px]">
                      / 100 RISK INDEX
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center z-10 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg border border-outline-variant w-full shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span
                      className="material-symbols-outlined text-emerald-600 text-[22px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                    <span className="text-headline-md font-headline-md font-bold text-emerald-700">
                      {riskData.riskLevel} RISK
                    </span>
                  </div>
                  <p className="text-body-sm font-medium text-on-surface-variant text-xs">
                    Automated heuristic recommendation: Clearance Approved.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Risk Factors & Action Panel (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              {/* Risk Factors Analysis */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm flex-1">
                <h3 className="text-headline-md font-headline-md font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">memory</span>
                  Risk Factors Analysis
                </h3>

                <div className="space-y-4">
                  {/* Factor 1: Positive */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container-low transition-colors group">
                    <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                      <span className="material-symbols-outlined text-emerald-700 text-sm">check</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body-md font-bold text-on-surface text-sm">
                        Document authenticity confirmed
                      </h4>
                      <p className="text-body-sm text-on-surface-variant text-xs mt-0.5 leading-relaxed">
                        Holographic, fluorophore UV, and micro-printing markers match issuer database templates with 99.8% confidence.
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-secondary hover:underline text-label-mono font-label-mono text-[11px]">
                        VIEW LOG
                      </button>
                    </div>
                  </div>

                  {/* Factor 2: Warning */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-50/40 border border-amber-200/60 hover:bg-amber-50/60 transition-colors group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
                    <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200 ml-1">
                      <span className="material-symbols-outlined text-amber-700 text-sm">warning</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body-md font-bold text-[#92400e] text-sm">
                        Minor MRZ spacing anomaly
                      </h4>
                      <p className="text-body-sm text-on-surface-variant text-xs mt-0.5 leading-relaxed">
                        Checksum validation passed, but minor font character spacing anomaly detected on line 2. Classified as non-critical.
                      </p>
                    </div>
                  </div>

                  {/* Factor 3: Positive */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container-low transition-colors group">
                    <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                      <span className="material-symbols-outlined text-emerald-700 text-sm">face</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-body-md font-bold text-on-surface text-sm">
                        Biometric face match verified
                      </h4>
                      <p className="text-body-sm text-on-surface-variant text-xs mt-0.5 leading-relaxed">
                        Live stream capture biometrics match document reference photograph. Anti-spoof liveness test passed (1.2% spoof rate).
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-secondary hover:underline text-label-mono font-label-mono text-[11px]">
                        VIEW SCAN
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Officer Action Panel */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-body-lg font-bold text-primary">Required Action</h3>
                    <p className="text-body-sm text-on-surface-variant text-xs">
                      Select official determination to finalize report and record in border ledger.
                    </p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleDecision('REJECT')}
                      className="flex-1 sm:flex-none px-5 py-3 rounded-lg border border-error text-error hover:bg-error-container/30 transition-colors text-label-mono font-label-mono font-bold tracking-wider text-xs flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                      REJECT
                    </button>
                    <button
                      onClick={() => handleDecision('FLAG')}
                      className="flex-1 sm:flex-none px-5 py-3 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors text-label-mono font-label-mono font-bold tracking-wider text-xs flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">flag</span>
                      FLAG
                    </button>
                    <button
                      onClick={() => handleDecision('APPROVE')}
                      className="flex-1 sm:flex-none px-7 py-3 rounded-lg bg-primary text-on-primary hover:bg-on-background transition-colors text-label-mono font-label-mono font-bold tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      APPROVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};
