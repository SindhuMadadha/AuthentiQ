import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { ScreeningStepper } from '../components/screening/ScreeningStepper';
import { useScreening } from '../context/ScreeningContext';
import { ASSETS } from '../services/mockData';

export const FaceVerification: React.FC = () => {
  const navigate = useNavigate();
  const { activeScreeningId, faceData } = useScreening();

  const handleProceed = () => {
    navigate('/screening/assessment');
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title={`Screening ID: #${activeScreeningId}`}
          subtitle="Stage 5: Biometric Face Matching, Live Stream & Anti-Spoof Liveness"
          badge={{ text: 'Stage 5: Face Verification', pulse: true }}
          actions={
            <button
              onClick={handleProceed}
              className="px-5 py-2 bg-primary text-on-primary font-body-sm font-semibold rounded-lg hover:bg-on-background transition-colors shadow-sm text-xs flex items-center gap-1.5"
            >
              <span>Continue to Risk Assessment</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          }
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          <ScreeningStepper currentStep={5} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Left Column: Visual Comparison & Liveness (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-gutter">
              {/* Subject Alignment Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-headline-md font-headline-md font-bold text-primary">
                      Subject Alignment
                    </h3>
                    <p className="text-body-sm text-on-surface-variant text-xs">
                      1:1 Biometric facial geometry comparison with landmark triangulation
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant">
                    <span className="material-symbols-outlined text-secondary text-sm">info</span>
                    <span className="text-label-mono font-label-mono text-on-surface text-[11px] font-semibold">
                      Auto-Alignment Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Document Reference Photo */}
                  <div className="flex flex-col gap-2.5">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border border-outline-variant bg-surface-container-high relative group shadow-sm">
                      <img
                        src={ASSETS.faceDocPhoto}
                        alt="Document Reference Photo"
                        className="w-full h-full object-cover filter contrast-125"
                      />
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary transition-colors pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5 bg-primary-container/85 backdrop-blur-sm text-on-primary-container px-2.5 py-1 rounded text-label-mono font-label-mono border border-on-primary-container/20 text-[11px] font-semibold">
                        REF: DOC_SPECIMEN
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <span className="text-body-sm font-body-sm text-on-surface-variant text-xs font-medium">
                        {faceData.sourceDoc}
                      </span>
                      <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-label-mono font-label-mono border border-outline-variant text-[10px] font-semibold">
                        High Res 300DPI
                      </span>
                    </div>
                  </div>

                  {/* Live Camera Stream Feed */}
                  <div className="flex flex-col gap-2.5">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden border-2 border-secondary bg-surface-container-highest relative shadow-[0_0_12px_rgba(0,93,182,0.15)] group">
                      <img
                        src={ASSETS.faceLivePhoto}
                        alt="Live Camera Feed"
                        className="w-full h-full object-cover"
                      />

                      {/* Scanning Line Animation */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="w-full h-0.5 bg-secondary shadow-[0_0_10px_#005db6] absolute opacity-80 animate-face-scan" />
                        {/* Corner Reticles */}
                        <div className="absolute top-[22%] left-[22%] w-5 h-5 border-t-2 border-l-2 border-secondary" />
                        <div className="absolute top-[22%] right-[22%] w-5 h-5 border-t-2 border-r-2 border-secondary" />
                        <div className="absolute bottom-[28%] left-[22%] w-5 h-5 border-b-2 border-l-2 border-secondary" />
                        <div className="absolute bottom-[28%] right-[22%] w-5 h-5 border-b-2 border-r-2 border-secondary" />
                      </div>

                      {/* Live Stream Status Tag */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded border border-outline-variant">
                        <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
                        <span className="text-label-mono font-label-mono text-on-surface text-[10px] font-bold">
                          LIVE STREAM
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <span className="text-body-sm font-body-sm text-on-surface-variant text-xs font-medium">
                        {faceData.sourceLive}
                      </span>
                      <div className="flex gap-1.5">
                        <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-label-mono font-label-mono border border-outline-variant text-[10px]">
                          30 FPS
                        </span>
                        <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-label-mono font-label-mono border border-outline-variant text-[10px]">
                          1080P
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Liveness Detection Section */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-body-lg font-body-lg text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">vital_signs</span>
                    Anti-Spoofing & Liveness Detection
                  </h3>
                  <span className="bg-secondary/15 text-secondary px-3 py-1 rounded-full text-label-mono font-label-mono border border-secondary/30 text-xs font-bold">
                    PASS • CONFIRMED LIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 border border-outline-variant rounded-lg bg-surface">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Depth Map
                    </p>
                    <p className="text-body-sm font-bold text-on-surface">
                      {faceData.liveness.depthMap}
                    </p>
                  </div>
                  <div className="p-3 border border-outline-variant rounded-lg bg-surface">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Micro-Movement
                    </p>
                    <p className="text-body-sm font-bold text-on-surface">
                      {faceData.liveness.microMovement}
                    </p>
                  </div>
                  <div className="p-3 border border-outline-variant rounded-lg bg-surface">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Texture Analysis
                    </p>
                    <p className="text-body-sm font-bold text-on-surface">
                      {faceData.liveness.textureAnalysis}
                    </p>
                  </div>
                  <div className="p-3 border border-outline-variant rounded-lg bg-surface">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Spoof Probability
                    </p>
                    <p className="text-body-sm font-bold text-secondary">
                      {faceData.liveness.spoofProbability}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Match Score & Vector Breakdown (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Primary Match Score Card */}
              <div className="bg-surface-container-lowest border-2 border-secondary rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
                <h3 className="text-label-mono font-label-mono text-on-surface-variant mb-4 uppercase tracking-wider text-[11px] font-bold">
                  Overall Match Confidence
                </h3>

                {/* Circular Gauge */}
                <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="45" stroke="#e5eeff" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      r="45"
                      stroke="#005db6"
                      strokeDasharray="282.7"
                      strokeDashoffset="5.6"
                      strokeWidth="8"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-display-lg font-display-lg font-bold text-primary leading-none">
                      {faceData.matchScore}
                      <span className="text-headline-md">%</span>
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant flex items-center gap-2 mb-6 shadow-sm">
                  <span
                    className="material-symbols-outlined text-secondary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="text-body-sm font-bold text-on-surface text-xs">
                    Threshold Met (&gt;85%)
                  </span>
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full bg-primary text-on-primary hover:bg-on-background py-3.5 rounded-lg text-body-md font-semibold transition-colors flex justify-center items-center gap-2 shadow-sm"
                >
                  <span>Proceed to Risk Audit</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {/* Detailed Biometric Vectors */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-0 overflow-hidden shadow-sm flex-1 flex flex-col">
                <div className="p-4 border-b border-outline-variant bg-surface">
                  <h4 className="text-body-md font-bold text-primary text-sm">
                    Biometric Vector Breakdown
                  </h4>
                </div>
                <div className="flex flex-col divide-y divide-outline-variant/60 flex-1">
                  {faceData.vectors.map((vec, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 hover:bg-surface-container-low transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-on-surface-variant text-sm">
                          {vec.icon}
                        </span>
                        <span className="text-body-sm font-medium text-on-surface text-xs">
                          {vec.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-16 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                          <div
                            style={{ width: `${vec.matchScore}%` }}
                            className="h-full bg-secondary rounded-full"
                          />
                        </div>
                        <span className="text-label-mono font-label-mono text-on-surface w-8 text-right text-xs font-bold">
                          {vec.matchScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manual Override Action */}
              <button
                onClick={() => alert('Biometric flagged for manual supervisor biometric review.')}
                className="w-full bg-transparent border border-outline-variant text-on-surface-variant hover:bg-surface-container-highest py-2.5 rounded-lg text-body-sm font-semibold transition-colors text-xs"
              >
                Flag for Manual Facial Audit
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};
