import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { useScreening } from '../context/ScreeningContext';

export const Settings: React.FC = () => {
  const { officer } = useScreening();

  const [faceThreshold, setFaceThreshold] = useState<number>(85);
  const [tamperSensitivity, setTamperSensitivity] = useState<number>(75);
  const [ocrStrictness, setOcrStrictness] = useState<number>(90);
  const [autoRejectCritical, setAutoRejectCritical] = useState<boolean>(false);
  const [enableLivenessCheck, setEnableLivenessCheck] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title="Terminal Settings & AI Configuration"
          subtitle="Hardware calibration, threshold tuning and security protocol controls"
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          {savedSuccess && (
            <div className="bg-secondary-container text-on-secondary-container p-4 rounded-xl flex items-center justify-between border border-secondary/30 shadow-sm animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                Terminal security parameters and thresholds updated successfully.
              </div>
              <span className="text-label-mono text-xs font-bold">CONFIG: APPLIED</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
            {/* AI Thresholds Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <h3 className="text-headline-md font-headline-md font-bold text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">tune</span>
                AI Heuristic Sensitivity & Confidence Thresholds
              </h3>
              <p className="text-body-sm text-on-surface-variant text-xs mb-6">
                Adjust neural network confidence thresholds for automated flag triggers during live screening.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-body-sm font-semibold mb-2">
                    <label>Biometric Face Match Threshold</label>
                    <span className="font-mono text-secondary font-bold">{faceThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="99"
                    value={faceThreshold}
                    onChange={(e) => setFaceThreshold(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <span className="text-label-mono text-outline text-[11px] mt-1 block">
                    Recommended: 85% for border e-gates.
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-body-sm font-semibold mb-2">
                    <label>Tampering Anomaly Detection Sensitivity</label>
                    <span className="font-mono text-secondary font-bold">{tamperSensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="95"
                    value={tamperSensitivity}
                    onChange={(e) => setTamperSensitivity(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <span className="text-label-mono text-outline text-[11px] mt-1 block">
                    Higher sensitivity flags micro-abrasions and laminate discrepancies.
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-body-sm font-semibold mb-2">
                    <label>OCR & MRZ Checksum Strictness</label>
                    <span className="font-mono text-secondary font-bold">{ocrStrictness}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="99"
                    value={ocrStrictness}
                    onChange={(e) => setOcrStrictness(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
              </div>
            </div>

            {/* Protocol Toggles */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <h3 className="text-headline-md font-headline-md font-bold text-primary mb-4">
                Operational Protocols
              </h3>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableLivenessCheck}
                    onChange={(e) => setEnableLivenessCheck(e.target.checked)}
                    className="rounded border-outline text-primary focus:ring-secondary w-5 h-5 mt-0.5"
                  />
                  <div>
                    <div className="font-bold text-body-sm text-on-surface">
                      Mandatory Anti-Spoof Liveness Detection
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      Requires 3D depth map and micro-movement analysis before biometric clearance.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRejectCritical}
                    onChange={(e) => setAutoRejectCritical(e.target.checked)}
                    className="rounded border-outline text-primary focus:ring-secondary w-5 h-5 mt-0.5"
                  />
                  <div>
                    <div className="font-bold text-body-sm text-on-surface">
                      Automatic Watchlist Rejection
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      Instantly deny documents matching Interpol SLTD or sanctions watchlists.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Station Identity Info */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <h3 className="text-headline-md font-headline-md font-bold text-primary mb-4">
                Terminal Hardware Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 bg-surface border border-outline-variant rounded-lg">
                  <div className="text-outline uppercase text-[10px]">Terminal Identifier</div>
                  <div className="font-bold text-primary text-sm mt-0.5">{officer.stationId}</div>
                </div>
                <div className="p-3 bg-surface border border-outline-variant rounded-lg">
                  <div className="text-outline uppercase text-[10px]">Active Operator</div>
                  <div className="font-bold text-primary text-sm mt-0.5">{officer.id}</div>
                </div>
                <div className="p-3 bg-surface border border-outline-variant rounded-lg">
                  <div className="text-outline uppercase text-[10px]">HSM Module</div>
                  <div className="font-bold text-secondary text-sm mt-0.5">FIPS-140-2 OK</div>
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="bg-primary text-on-primary font-body-md text-body-sm font-semibold px-8 py-3 rounded-lg hover:bg-on-background transition-colors shadow-sm"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

        <Footer />
      </main>
    </div>
  );
};
