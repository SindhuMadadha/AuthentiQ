import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { ScreeningStepper } from '../components/screening/ScreeningStepper';
import { useScreening } from '../context/ScreeningContext';
import { ASSETS } from '../services/mockData';

export const TamperingDetection: React.FC = () => {
  const navigate = useNavigate();
  const { activeScreeningId, tamperingData } = useScreening();

  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);

  const handleProceed = () => {
    navigate('/screening/face');
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title={`Screening ID: #${activeScreeningId}`}
          subtitle="Stage 4: Deep Forensics, Heatmap Anomaly & Tampering Detection"
          badge={{ text: 'Stage 4: Tampering Detection', pulse: true }}
          actions={
            <div className="flex gap-3">
              <button
                onClick={() => alert('Document has been flagged for supervisor review in the audit queue.')}
                className="px-4 py-2 bg-error-container text-on-error-container border border-error/40 font-body-sm font-semibold rounded-lg hover:bg-error-container/80 transition-colors text-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">flag</span>
                Flag for Audit
              </button>
              <button
                onClick={handleProceed}
                className="px-5 py-2 bg-primary text-on-primary font-body-sm font-semibold rounded-lg hover:bg-on-background transition-colors shadow-sm text-xs flex items-center gap-1.5"
              >
                <span>Continue to Face Match</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          }
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          <ScreeningStepper currentStep={4} />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Left Column: Document Viewer & Heatmap Overlay (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-gutter">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col relative">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-headline-md font-headline-md font-bold text-primary">
                      Document Scan Analysis
                    </h2>
                    <p className="text-body-sm text-on-surface-variant text-xs">
                      Pixel-level spectral consistency & compression anomaly detection
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-error-container text-on-error-container text-label-mono font-label-mono border border-error text-xs font-bold">
                      <span className="material-symbols-outlined text-[15px] mr-1">warning</span>
                      High Risk Anomaly
                    </span>
                  </div>
                </div>

                {/* Main Scan Viewer with Interactive Layer Toggles */}
                <div className="relative flex-1 bg-surface-container-high rounded-lg border border-outline-variant overflow-hidden min-h-[440px] flex items-center justify-center shadow-inner">
                  <div className="relative max-w-full max-h-full p-4 flex items-center justify-center">
                    <img
                      src={ASSETS.tamperingScan}
                      alt="Tampering Forensic Scan"
                      className="object-contain max-h-[500px] rounded"
                    />

                    {/* Heatmap Overlay */}
                    {showHeatmap && (
                      <div className="absolute inset-0 heatmap-overlay pointer-events-none rounded m-4" />
                    )}

                    {/* AI Bounding Boxes */}
                    {showBoundingBoxes && (
                      <>
                        <div
                          title="Photo edge blending anomaly"
                          className="absolute top-[20%] right-[19%] w-[16%] h-[22%] border-2 border-error rounded-sm shadow-[0_0_12px_rgba(186,26,26,0.6)] animate-pulse pointer-events-none"
                        />
                        <div
                          title="Font kerning discrepancy"
                          className="absolute bottom-[28%] left-[28%] w-[26%] h-[8%] border-2 border-[#ff6b00] rounded-sm pointer-events-none"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Layer Toggle Controls */}
                <div className="mt-4 flex gap-6 text-label-mono font-label-mono text-on-surface-variant text-xs pt-3 border-t border-outline-variant/60">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showHeatmap}
                      onChange={(e) => setShowHeatmap(e.target.checked)}
                      className="rounded border-outline-variant text-primary focus:ring-secondary w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-on-surface">Show Heatmap Overlay</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showBoundingBoxes}
                      onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                      className="rounded border-outline-variant text-primary focus:ring-secondary w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-on-surface">Show Bounding Boxes</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Findings Log & Analysis (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Overall Score Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <h3 className="text-body-lg font-body-lg font-bold text-primary mb-4 border-b border-outline-variant pb-2">
                  Tampering Probability
                </h3>
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-error bg-error-container/20 shrink-0">
                    <span className="text-headline-md font-headline-md text-error font-bold">
                      {tamperingData.probability}%
                    </span>
                  </div>
                  <div>
                    <p className="text-body-md font-bold text-on-surface mb-1">
                      Critical Anomalies Found
                    </p>
                    <p className="text-body-sm text-on-surface-variant text-xs leading-relaxed">
                      Manual forensic inspection recommended before passenger clearance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Analysis Vectors List */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex-1 flex flex-col">
                <h3 className="text-body-lg font-body-lg font-bold text-primary mb-4 border-b border-outline-variant pb-2">
                  Analysis Vectors (4 Vectors)
                </h3>
                <ul className="space-y-3.5 flex-1">
                  {tamperingData.findings.map((item) => {
                    const isFailed = item.status === 'failed';
                    return (
                      <li
                        key={item.id}
                        className={`rounded-lg p-3.5 border transition-colors ${
                          isFailed
                            ? 'bg-error-container/25 border-error/40'
                            : 'bg-surface-container-low border-outline-variant/60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`material-symbols-outlined mt-0.5 text-[20px] ${
                              isFailed ? 'text-error' : 'text-secondary'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <div>
                            <h4
                              className={`text-body-sm font-bold ${
                                isFailed ? 'text-error' : 'text-primary'
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-body-sm text-on-surface-variant text-xs mt-0.5 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Override Actions */}
                <div className="mt-6 pt-4 border-t border-outline-variant flex gap-3">
                  <button
                    onClick={() => alert('Document flagged for forensic supervisory review.')}
                    className="flex-1 bg-surface-container-high border border-outline-variant text-primary py-2.5 rounded-lg text-label-mono font-label-mono text-xs font-semibold hover:bg-surface-container transition-colors"
                  >
                    Flag for Review
                  </button>
                  <button
                    onClick={handleProceed}
                    className="flex-1 bg-primary text-on-primary py-2.5 rounded-lg text-label-mono font-label-mono text-xs font-semibold hover:bg-on-background transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Override & Continue</span>
                  </button>
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
