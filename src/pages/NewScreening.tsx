import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { ScreeningStepper } from '../components/screening/ScreeningStepper';
import { useScreening } from '../context/ScreeningContext';
import { DocumentType } from '../types/screening';
import { ASSETS } from '../services/mockData';

export const NewScreening: React.FC = () => {
  const navigate = useNavigate();
  const { activeScreeningId, selectedDocType, setSelectedDocType, resetSession } = useScreening();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(ASSETS.passportScanOcr);
  const [isLiveFeed, setIsLiveFeed] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const docTypes: { type: DocumentType; label: string; icon: string; desc: string }[] = [
    { type: 'Passport', label: 'Passports', icon: 'flight_takeoff', desc: 'ePassports, MRZ compliant' },
    { type: 'Visa', label: 'Visas', icon: 'airplane_ticket', desc: 'Schengen, US, UK formats' },
    { type: 'National ID', label: 'National IDs', icon: 'badge', desc: 'Supported standard regions' },
    { type: 'Driving License', label: "Driver's Licenses", icon: 'directions_car', desc: 'US, EU standard formats' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsLiveFeed(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsLiveFeed(false);
    }
  };

  const handleStartScreening = () => {
    navigate('/screening/ocr');
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title="New Screening Session"
          subtitle={`Session ID: #${activeScreeningId}`}
          badge={{ text: 'Stage 1: Document Intake', pulse: true }}
          actions={
            <button
              onClick={() => resetSession(selectedDocType)}
              className="text-body-sm text-on-surface-variant hover:text-primary px-3 py-1.5 rounded border border-outline-variant hover:bg-surface-container-low transition-colors font-label-mono text-[12px]"
            >
              Reset Session
            </button>
          }
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Stepper */}
            <ScreeningStepper currentStep={1} />

            {/* Document Type Selector Banner */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="text-label-mono font-label-mono text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">
                  Select Document Category
                </label>
                <span className="text-label-mono font-label-mono text-secondary text-[11px]">
                  Format Standard: ICAO 9303 Compliant
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {docTypes.map((d) => (
                  <button
                    key={d.type}
                    type="button"
                    onClick={() => setSelectedDocType(d.type)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      selectedDocType === d.type
                        ? 'border-secondary bg-secondary-container/20 text-primary ring-1 ring-secondary'
                        : 'border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[22px] ${
                        selectedDocType === d.type ? 'text-secondary' : 'text-outline'
                      }`}
                    >
                      {d.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-body-sm text-primary">{d.label}</div>
                      <div className="text-[11px] text-outline truncate">{d.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Upload Bento Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Drag & Drop Zone */}
              <div className="col-span-12 md:col-span-8">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`bg-surface-container-lowest border-2 rounded-xl p-8 h-[440px] flex flex-col items-center justify-center border-dashed transition-all relative overflow-hidden group shadow-sm ${
                    isDragging
                      ? 'border-secondary bg-surface-container-low'
                      : 'border-outline-variant hover:border-secondary hover:bg-surface-container-low/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {isLiveFeed ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={ASSETS.passportScanOcr}
                        alt="Live Scanner Stream"
                        className="w-full h-full object-contain filter contrast-125"
                      />
                      <div className="absolute top-3 left-3 bg-error text-on-error px-2.5 py-1 rounded text-label-mono text-[11px] font-bold flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        LIVE SCANNER ACTIVE
                      </div>
                      <div className="absolute inset-x-0 top-0 h-1 bg-secondary animate-scan opacity-75" />
                    </div>
                  ) : previewUrl ? (
                    <div className="flex flex-col items-center justify-center w-full h-full relative">
                      <div className="w-full h-56 rounded border border-outline-variant overflow-hidden bg-surface-container mb-4 flex items-center justify-center relative shadow-inner">
                        <img
                          src={previewUrl}
                          alt="Loaded Document"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute bottom-2 right-2 bg-primary-container/90 text-on-primary-container px-2 py-0.5 rounded text-label-mono text-[10px]">
                          {selectedFile ? selectedFile.name : 'Reference Specimen Loaded'}
                        </div>
                      </div>

                      <h3 className="text-body-lg font-bold text-primary mb-1">
                        Document Ready for Forensic Ingestion
                      </h3>
                      <p className="text-body-sm text-on-surface-variant mb-4">
                        {selectedDocType} • High Resolution Scan (300 DPI)
                      </p>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-surface-container-lowest border border-outline-variant text-primary rounded-lg py-2.5 px-5 text-label-mono font-label-mono hover:bg-surface-container-low transition-colors flex items-center gap-2 text-body-sm"
                        >
                          <span className="material-symbols-outlined text-[18px]">folder_open</span>
                          Change File
                        </button>
                        <button
                          type="button"
                          onClick={handleStartScreening}
                          className="bg-primary text-on-primary rounded-lg py-2.5 px-7 text-label-mono font-label-mono hover:bg-on-background transition-colors flex items-center gap-2 text-body-sm font-semibold shadow-sm group"
                        >
                          <span>Begin Screening</span>
                          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-primary">
                        <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                      </div>
                      <h3 className="text-headline-md font-headline-md text-primary mb-2 text-center font-semibold">
                        Place document on scanner or upload high-res image
                      </h3>
                      <p className="text-body-md font-body-md text-on-surface-variant text-center mb-6">
                        Drag and drop file here or click to browse.
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-primary text-on-primary rounded-xl py-3 px-6 text-label-mono font-label-mono hover:bg-surface-tint transition-colors flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">folder_open</span>
                          Browse Files
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsLiveFeed(true)}
                          className="bg-surface-container-lowest border border-outline-variant text-primary rounded-xl py-3 px-6 text-label-mono font-label-mono hover:bg-surface-container-low transition-colors flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                          Live Feed
                        </button>
                      </div>
                      <p className="text-label-mono font-label-mono text-outline mt-4 text-[11px]">
                        Supported formats: JPG, PNG, PDF (Max 20MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Supported Documents Sidebar (4 cols) */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
                {/* Supported Documents List */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex-1 shadow-sm">
                  <h4 className="text-label-mono font-label-mono text-outline mb-4 uppercase tracking-wider text-[11px] font-bold">
                    Screening Protocols Supported
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/50">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        flight_takeoff
                      </span>
                      <div>
                        <p className="text-body-md font-semibold text-primary text-sm">Passports</p>
                        <p className="text-body-sm text-on-surface-variant text-xs">
                          ePassports, MRZ compliant (ICAO 9303)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/50">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        airplane_ticket
                      </span>
                      <div>
                        <p className="text-body-md font-semibold text-primary text-sm">Visas</p>
                        <p className="text-body-sm text-on-surface-variant text-xs">
                          Schengen, US, UK, Global sticker formats
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/50">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        badge
                      </span>
                      <div>
                        <p className="text-body-md font-semibold text-primary text-sm">National IDs</p>
                        <p className="text-body-sm text-on-surface-variant text-xs">
                          EU, ASEAN, and biometric identity cards
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/50">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        directions_car
                      </span>
                      <div>
                        <p className="text-body-md font-semibold text-primary text-sm">
                          Driver's Licenses
                        </p>
                        <p className="text-body-sm text-on-surface-variant text-xs">
                          AAMVA & ISO/IEC 18013 standard licenses
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Diagnostic overlay hint */}
                <div className="bg-surface-container-high rounded-xl p-4 flex items-start gap-3 border border-outline-variant shadow-sm">
                  <span className="material-symbols-outlined text-secondary shrink-0 text-[20px]">
                    info
                  </span>
                  <p className="text-body-sm font-body-sm text-on-surface-variant text-xs leading-relaxed">
                    For optimal OCR extraction and forensic tampering detection, ensure the document is flat, well-lit, and all four corners are visible within the capture boundary.
                  </p>
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
