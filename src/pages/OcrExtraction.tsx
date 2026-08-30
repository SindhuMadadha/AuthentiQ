import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { ScreeningStepper } from '../components/screening/ScreeningStepper';
import { useScreening } from '../context/ScreeningContext';

export const OcrExtraction: React.FC = () => {
  const navigate = useNavigate();
  const { activeScreeningId, ocrData, updateOcrField } = useScreening();

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [highContrast, setHighContrast] = useState<boolean>(false);

  const handleProceed = () => {
    navigate('/screening/validation');
  };

  const handleReject = () => {
    if (window.confirm('Are you sure you want to reject this document at the OCR stage?')) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title={`Screening ID: #${activeScreeningId}`}
          subtitle="Stage 2: Optical Character Recognition & MRZ Decoding"
          badge={{ text: 'Stage 2: OCR Extraction', pulse: true }}
          actions={
            <div className="flex items-center gap-2 text-label-mono text-outline text-[11px] uppercase tracking-wider hidden sm:flex">
              <span className="text-secondary font-bold">1. Upload</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-primary font-bold border-b-2 border-primary pb-0.5">2. Extraction</span>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-outline">3. Validation</span>
            </div>
          }
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto flex flex-col">
          <ScreeningStepper currentStep={2} />

          {/* Split Screen 2-Column Forensic View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1">
            {/* LEFT PANEL: Source Document Scan (6 cols) */}
            <div className="lg:col-span-6 flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-headline-md font-headline-md font-bold text-primary">
                    Source Document
                  </h2>
                  <p className="text-body-sm text-on-surface-variant text-xs">
                    Optical inspection with AI zone bounding overlays
                  </p>
                </div>
                <div className="flex gap-1.5 bg-surface-container p-1 rounded-lg border border-outline-variant">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 20, 160))}
                    title="Zoom In"
                    className="p-1.5 rounded hover:bg-surface text-on-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(z - 20, 80))}
                    title="Zoom Out"
                    className="p-1.5 rounded hover:bg-surface text-on-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">zoom_out</span>
                  </button>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    title="Toggle High Contrast"
                    className={`p-1.5 rounded transition-colors ${
                      highContrast ? 'bg-primary text-on-primary' : 'hover:bg-surface text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">contrast</span>
                  </button>
                </div>
              </div>

              {/* Document Viewer Canvas */}
              <div className="relative flex-1 bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden flex items-center justify-center min-h-[420px] p-4 shadow-inner">
                {/* Document Container */}
                <div
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                  className={`relative w-full max-w-lg aspect-[1.4/1] bg-white border-2 border-outline-variant rounded shadow-sm overflow-hidden transition-transform duration-200 ${
                    highContrast ? 'contrast-150 grayscale' : ''
                  }`}
                >
                  <img
                    src={ocrData.documentImage}
                    alt="Passport Scan"
                    className="w-full h-full object-cover"
                  />

                  {/* Highlight Boxes over extracted zones */}
                  <div
                    title="Visual Name Zone"
                    className="absolute top-[20%] left-[34%] w-[42%] h-[9%] border-2 border-secondary bg-secondary/15 rounded cursor-pointer hover:bg-secondary/30 transition-all"
                  />
                  <div
                    title="Passport Number Zone"
                    className="absolute top-[32%] right-[8%] w-[24%] h-[9%] border-2 border-error bg-error/15 rounded cursor-pointer hover:bg-error/30 transition-all"
                  />
                  <div
                    title="MRZ Machine Readable Zone"
                    className="absolute bottom-[5%] left-[5%] w-[90%] h-[18%] border-2 border-secondary bg-secondary/15 rounded cursor-pointer hover:bg-secondary/30 transition-all"
                  />
                </div>

                {/* Animated scan line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-60 animate-scan pointer-events-none shadow-[0_0_8px_#005db6]" />
              </div>

              {/* Document Metadata Bar */}
              <div className="mt-4 flex flex-wrap justify-between items-center gap-4 text-label-mono font-label-mono text-on-surface-variant text-xs pt-3 border-t border-outline-variant/60">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
                  Doc Type: Standard Machine Readable (P)
                </span>
                <span className="flex items-center gap-1.5 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">memory</span>
                  RFID Chip: Decrypted & Verified
                </span>
              </div>
            </div>

            {/* RIGHT PANEL: Extracted Form Fields (6 cols) */}
            <div className="lg:col-span-6 flex flex-col bg-surface p-2 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-headline-md font-headline-md font-bold text-primary">
                    Extracted Data
                  </h2>
                  <p className="text-body-sm text-on-surface-variant text-xs mt-0.5">
                    Review parsed visual & MRZ data fields. Click any value to correct misreads.
                  </p>
                </div>

                {/* Overall Confidence Score Gauge */}
                <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 px-4 rounded-xl border border-outline-variant shadow-sm">
                  <div className="text-right">
                    <div className="text-label-mono font-label-mono text-outline uppercase text-[10px]">
                      Extraction Confidence
                    </div>
                    <div className="text-headline-md font-headline-md font-bold text-primary">
                      {ocrData.overallConfidence}%
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-4 border-surface-container-high border-t-secondary border-r-secondary border-b-secondary relative flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                  </div>
                </div>
              </div>

              {/* Form Fields Container */}
              <div className="space-y-5 flex-1">
                {/* Personal Identity Details */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
                  <h3 className="text-label-mono font-label-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-bold mb-4 border-b border-surface-container-high pb-2">
                    Identity Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Surname */}
                    <div className="col-span-2">
                      <div className="flex justify-between mb-1.5">
                        <label className="text-label-mono font-label-mono text-primary font-bold text-xs">
                          {ocrData.surname.label}
                        </label>
                        <span className="text-label-mono font-label-mono text-secondary flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {ocrData.surname.confidence}% Confidence
                        </span>
                      </div>
                      <input
                        type="text"
                        value={ocrData.surname.value}
                        onChange={(e) => updateOcrField('surname', e.target.value)}
                        className="bg-surface-container-lowest border border-outline rounded px-3.5 py-2.5 w-full text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-mono uppercase"
                      />
                    </div>

                    {/* Given Names */}
                    <div className="col-span-2">
                      <div className="flex justify-between mb-1.5">
                        <label className="text-label-mono font-label-mono text-primary font-bold text-xs">
                          {ocrData.givenNames.label}
                        </label>
                        <span className="text-label-mono font-label-mono text-secondary flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {ocrData.givenNames.confidence}% Confidence
                        </span>
                      </div>
                      <input
                        type="text"
                        value={ocrData.givenNames.value}
                        onChange={(e) => updateOcrField('givenNames', e.target.value)}
                        className="bg-surface-container-lowest border border-outline rounded px-3.5 py-2.5 w-full text-body-md font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-mono uppercase"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-label-mono font-label-mono text-primary font-bold text-xs">
                          {ocrData.dateOfBirth.label}
                        </label>
                        <span className="text-label-mono font-label-mono text-secondary flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {ocrData.dateOfBirth.confidence}%
                        </span>
                      </div>
                      <input
                        type="text"
                        value={ocrData.dateOfBirth.value}
                        onChange={(e) => updateOcrField('dateOfBirth', e.target.value)}
                        className="bg-surface-container-lowest border border-outline rounded px-3.5 py-2.5 w-full text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-mono"
                      />
                    </div>

                    {/* Nationality */}
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-label-mono font-label-mono text-primary font-bold text-xs">
                          {ocrData.nationality.label}
                        </label>
                        <span className="text-label-mono font-label-mono text-secondary flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {ocrData.nationality.confidence}%
                        </span>
                      </div>
                      <input
                        type="text"
                        value={ocrData.nationality.value}
                        onChange={(e) => updateOcrField('nationality', e.target.value)}
                        className="bg-surface-container-lowest border border-outline rounded px-3.5 py-2.5 w-full text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Document Metrics & Error State Demo */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
                  <h3 className="text-label-mono font-label-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-bold mb-4 border-b border-surface-container-high pb-2">
                    Document Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Passport No. Field with Error Highlight */}
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label
                          className={`text-label-mono font-label-mono font-bold text-xs flex items-center gap-1 ${
                            ocrData.documentNumber.isError ? 'text-error' : 'text-primary'
                          }`}
                        >
                          {ocrData.documentNumber.isError && (
                            <span className="material-symbols-outlined text-[14px]">error</span>
                          )}
                          {ocrData.documentNumber.label}
                        </label>
                        <span
                          className={`text-label-mono font-label-mono flex items-center gap-1 text-[11px] ${
                            ocrData.documentNumber.isError ? 'text-error font-semibold' : 'text-secondary'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              ocrData.documentNumber.isError ? 'bg-error' : 'bg-secondary'
                            }`}
                          />
                          {ocrData.documentNumber.confidence}%
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={ocrData.documentNumber.value}
                          onChange={(e) => updateOcrField('documentNumber', e.target.value)}
                          className={`bg-surface-container-lowest border rounded px-3.5 py-2.5 w-full text-body-sm font-mono focus:outline-none transition-colors ${
                            ocrData.documentNumber.isError
                              ? 'border-error focus:ring-2 focus:ring-error bg-error-container/20 text-error font-bold'
                              : 'border-outline text-on-surface focus:ring-2 focus:ring-secondary'
                          }`}
                        />
                        {ocrData.documentNumber.isError && (
                          <div className="text-[10px] text-error mt-1 font-label-mono">
                            {ocrData.documentNumber.errorMessage}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expiry Date */}
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="text-label-mono font-label-mono text-primary font-bold text-xs">
                          {ocrData.dateOfExpiry.label}
                        </label>
                        <span className="text-label-mono font-label-mono text-secondary flex items-center gap-1 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          {ocrData.dateOfExpiry.confidence}%
                        </span>
                      </div>
                      <input
                        type="text"
                        value={ocrData.dateOfExpiry.value}
                        onChange={(e) => updateOcrField('dateOfExpiry', e.target.value)}
                        className="bg-surface-container-lowest border border-outline rounded px-3.5 py-2.5 w-full text-body-sm font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Machine Readable Zone (MRZ) Box */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3 border-b border-surface-container-high pb-2">
                    <h3 className="text-label-mono font-label-mono text-on-surface-variant uppercase tracking-widest text-[11px] font-bold">
                      Machine Readable Zone (MRZ)
                    </h3>
                    <span className="text-label-mono font-label-mono text-secondary flex items-center gap-1 text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      Checksum Valid
                    </span>
                  </div>
                  <div className="font-mono text-body-sm tracking-widest bg-surface-container-low p-4 border border-outline-variant rounded-lg break-all whitespace-pre-wrap leading-relaxed text-on-surface font-semibold select-all">
                    {ocrData.mrzRaw}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end gap-4 border-t border-outline-variant pt-5 pb-2">
                <button
                  type="button"
                  onClick={handleReject}
                  className="px-6 py-2.5 border border-outline text-on-surface font-body-md text-body-sm rounded-lg hover:bg-surface-container transition-colors"
                >
                  Reject Document
                </button>
                <button
                  type="button"
                  onClick={handleProceed}
                  className="px-8 py-2.5 bg-primary text-on-primary font-body-md text-body-sm rounded-lg hover:bg-on-background transition-colors shadow-sm flex items-center gap-2 font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                  Confirm & Proceed
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
