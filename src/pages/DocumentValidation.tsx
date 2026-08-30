import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { ScreeningStepper } from '../components/screening/ScreeningStepper';
import { useScreening } from '../context/ScreeningContext';
import { ASSETS } from '../services/mockData';

export const DocumentValidation: React.FC = () => {
  const navigate = useNavigate();
  const { activeScreeningId, validationData } = useScreening();

  const [activeModalFeature, setActiveModalFeature] = useState<string | null>(null);

  const handleProceed = () => {
    navigate('/screening/tampering');
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title={`Screening ID: #${activeScreeningId}`}
          subtitle="Stage 3: Security Features, Checksums & Database Cross-Reference"
          badge={{ text: 'Stage 3: Document Validation', pulse: true }}
          actions={
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-surface-container text-on-surface-variant font-body-sm border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors text-xs"
              >
                Suspend Audit
              </button>
              <button
                onClick={handleProceed}
                className="px-5 py-2 bg-primary text-on-primary font-body-sm font-semibold rounded-lg hover:bg-on-background transition-colors shadow-sm text-xs flex items-center gap-1.5"
              >
                <span>Proceed to Tampering</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          }
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          <ScreeningStepper currentStep={3} />

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Left Column: Primary Document & Security Analysis (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-gutter">
              {/* Primary Document Scan Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-body-lg font-body-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">contact_page</span>
                    Primary Document Scan
                  </h3>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-highest text-secondary font-label-mono text-label-mono rounded-full border border-secondary/20 text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                    Hi-Res Capture (600 DPI)
                  </span>
                </div>

                <div className="relative w-full aspect-[1.6/1] bg-surface-container border border-outline-variant rounded-lg mb-6 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Highlight boxes indicating extracted fields */}
                  <div className="absolute top-[20%] left-[30%] w-[40%] h-[10%] border-2 border-secondary bg-secondary/15 z-20 rounded-sm" />
                  <div className="absolute top-[40%] left-[5%] w-[25%] h-[40%] border-2 border-secondary bg-secondary/15 z-20 rounded-sm" />
                  <img
                    src={ASSETS.passportScanValidation}
                    alt="Passport Forensic View"
                    className="object-cover w-full h-full opacity-90"
                  />
                </div>

                {/* Extracted Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-surface border border-outline-variant rounded-lg">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Document Type
                    </p>
                    <p className="text-body-sm font-body-sm font-bold text-on-surface">
                      {validationData.documentType}
                    </p>
                  </div>
                  <div className="p-3 bg-surface border border-outline-variant rounded-lg">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Issuing State
                    </p>
                    <p className="text-body-sm font-body-sm font-bold text-on-surface">
                      {validationData.issuingState}
                    </p>
                  </div>
                  <div className="p-3 bg-surface border border-outline-variant rounded-lg">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Document No.
                    </p>
                    <p className="text-body-sm font-body-sm font-bold text-on-surface font-mono">
                      {validationData.documentNumber}
                    </p>
                  </div>
                  <div className="p-3 bg-surface border border-outline-variant rounded-lg">
                    <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mb-1">
                      Date of Birth
                    </p>
                    <p className="text-body-sm font-body-sm font-bold text-on-surface font-mono">
                      {validationData.dateOfBirth}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Features Verification */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-body-lg font-body-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">fingerprint</span>
                    Forensic Security Feature Analysis
                  </h3>
                  <span className="text-label-mono font-label-mono text-outline text-[11px] uppercase">
                    3 Optical Vectors Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {validationData.securityFeatures.map((feature, idx) => (
                    <div key={idx} className="flex flex-col group">
                      <div
                        onClick={() => setActiveModalFeature(feature.name)}
                        className="relative aspect-video bg-surface-container border border-outline-variant rounded-lg mb-3 overflow-hidden group cursor-pointer shadow-sm"
                      >
                        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <span className="material-symbols-outlined text-white text-3xl">pageview</span>
                        </div>
                        <img
                          src={feature.image}
                          alt={feature.name}
                          className="object-cover w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all"
                        />
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-body-sm font-bold text-on-surface">{feature.name}</p>
                          <p className="text-label-mono font-label-mono text-secondary text-[11px]">
                            Match Confidence: {feature.confidence}%
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-[#166534] bg-[#dcfce7] rounded-full p-1 text-[16px]">
                          check
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Status, Checklist & Databases (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-gutter">
              {/* Overall Status Radial Gauge */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <h3 className="text-body-lg font-body-lg font-bold text-on-surface mb-6 w-full text-left">
                  Validation Status
                </h3>
                {/* Radial Gauge */}
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="3"
                    />
                    <path
                      className="text-[#166534] stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeDasharray="100, 100"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#166534] text-3xl mb-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                    <span className="text-body-sm font-bold text-[#166534] tracking-wider">
                      CLEARED
                    </span>
                  </div>
                </div>
                <p className="text-body-sm text-on-surface-variant text-xs">
                  No critical anomalies detected across 14 security vectors.
                </p>
              </div>

              {/* Audit Checklist */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex-1">
                <h3 className="text-body-lg font-body-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant">fact_check</span>
                  Audit Checklist
                </h3>
                <div className="flex flex-col gap-3">
                  {/* Item 1: Valid */}
                  <div className="flex items-start gap-3 p-3 bg-surface border border-outline-variant rounded-lg">
                    <div className="mt-0.5">
                      <span className="material-symbols-outlined text-[#166534] text-[20px]">
                        check_circle
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-body-sm font-semibold text-on-surface">Document Validity</p>
                      <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mt-0.5">
                        {validationData.checklist.documentValidity.message}
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Expiry Check */}
                  <div className="flex items-start gap-3 p-3 bg-surface border border-outline-variant rounded-lg">
                    <div className="mt-0.5">
                      <span className="material-symbols-outlined text-[#166534] text-[20px]">
                        check_circle
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-body-sm font-semibold text-on-surface">Expiry Check</p>
                      <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px] mt-0.5">
                        {validationData.checklist.expiryCheck.message}
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Warning/Review */}
                  <div className="flex items-start gap-3 p-3 bg-[#fffbeb] border border-[#fef3c7] rounded-lg relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f59e0b]" />
                    <div className="mt-0.5 pl-1">
                      <span className="material-symbols-outlined text-[#b45309] text-[20px]">
                        warning
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-body-sm font-semibold text-[#92400e]">Visa Requirements</p>
                      <p className="text-label-mono font-label-mono text-[#b45309] text-[11px] mt-0.5">
                        {validationData.checklist.visaRequirements.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database Cross-Reference Table */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
                <h3 className="text-body-lg font-body-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">database</span>
                  Database Cross-Reference
                </h3>
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-outline-variant/60">
                    {validationData.databaseHits.map((hit, idx) => (
                      <tr key={idx} className="hover:bg-surface transition-colors">
                        <td className="py-2.5 text-body-sm font-medium text-on-surface">
                          {hit.database}
                        </td>
                        <td className="py-2.5 text-right">
                          <span className="inline-flex items-center gap-1 text-[#166534] text-label-mono font-label-mono text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            {hit.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};
