import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopHeader } from '../components/layout/TopHeader';
import { Footer } from '../components/layout/Footer';
import { useScreening } from '../context/ScreeningContext';
import { DEMO_CASES } from '../services/mockData';
import { FinalReportData } from '../types/screening';

export const FinalReport: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { finalReport, resetSession, getReportForDemo } = useScreening();

  const demoQuery = searchParams.get('demo');
  const decisionQuery = searchParams.get('decision');

  // Determine current report data:
  let reportData: FinalReportData = finalReport;
  if (demoQuery && DEMO_CASES[demoQuery]) {
    reportData = getReportForDemo(demoQuery);
  } else if (decisionQuery === 'rejected') {
    reportData = DEMO_CASES['demo-3'];
  }

  const handleFinishAndStartNew = () => {
    resetSession();
    navigate('/dashboard');
  };

  const isLowRisk = reportData.riskLevel === 'LOW';
  const isMedRisk = reportData.riskLevel === 'MEDIUM';
  const isHighRisk = reportData.riskLevel === 'HIGH';

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopHeader
          title="Final Screening Report"
          subtitle={`Report ID: ${reportData.screeningId} • Official Border Audit`}
          badge={{
            text: isLowRisk ? 'PASSED: CLEARED' : isMedRisk ? 'REVIEW: EXPIRED' : 'ALERT: HIGH RISK',
          }}
          actions={
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-outline text-on-surface rounded-lg hover:bg-surface-container-high transition-colors font-label-mono text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                Print
              </button>
              <button
                onClick={() => alert(`Exporting audit dossier for Report #${reportData.screeningId} as secure PDF...`)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-outline text-on-surface rounded-lg hover:bg-surface-container-high transition-colors font-label-mono text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download PDF
              </button>
            </div>
          }
        />

        <div className="p-margin-desktop flex-1 overflow-y-auto space-y-6">
          {/* Demo Case Banner (if running a demo) */}
          {reportData.demoCaseName && (
            <div
              className={`px-4 py-2.5 rounded-lg flex items-center justify-between shadow-sm border ${
                isLowRisk
                  ? 'bg-secondary-container text-on-secondary-container border-secondary/30'
                  : isMedRisk
                  ? 'bg-warning-container text-[#92400e] border-warning/40'
                  : 'bg-error-container text-on-error-container border-error/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  {isLowRisk ? 'verified_user' : 'warning'}
                </span>
                <span className="font-label-mono text-label-mono font-bold uppercase tracking-wider text-xs">
                  {reportData.demoCaseName}
                </span>
              </div>
              <span className="text-label-mono text-[11px] font-semibold opacity-90">
                Confidence: {reportData.confidence}%
              </span>
            </div>
          )}

          {/* Official Decision Banner (Spans Full Width) */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-2 h-full ${
                isLowRisk ? 'bg-secondary' : isMedRisk ? 'bg-warning' : 'bg-error'
              }`}
            />

            <div className="flex items-center gap-6 z-10 w-full md:w-auto">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm shrink-0 ${
                  isLowRisk
                    ? 'bg-secondary-container text-secondary'
                    : isMedRisk
                    ? 'bg-warning-container text-warning'
                    : 'bg-error-container text-error'
                }`}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isLowRisk ? 'check_circle' : isMedRisk ? 'event_busy' : 'dangerous'}
                </span>
              </div>

              <div>
                <p className="text-label-mono font-label-mono text-on-surface-variant uppercase tracking-widest text-[11px] mb-1">
                  Official Decision
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2
                    className={`text-headline-lg font-headline-lg font-bold ${
                      isLowRisk ? 'text-primary' : isMedRisk ? 'text-warning' : 'text-error'
                    }`}
                  >
                    {reportData.decisionTitle}
                  </h2>
                  <span
                    className={`text-label-mono font-label-mono text-[11px] px-2.5 py-1 rounded-full font-bold uppercase border ${
                      isLowRisk
                        ? 'bg-surface-variant text-on-surface-variant border-outline-variant'
                        : isMedRisk
                        ? 'bg-warning text-on-warning border-warning'
                        : 'bg-error text-on-error border-error'
                    }`}
                  >
                    {reportData.riskLevel} RISK
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant text-xs mt-1">
                  Station ID: {reportData.stationId} • Officer: {reportData.officerName} (ID: {reportData.officerId})
                </p>
              </div>
            </div>

            <div className="z-10 w-full md:w-auto flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span className="text-label-mono text-on-surface-variant text-xs">
                  AI Confidence:
                </span>
                <span className="text-headline-md font-bold text-primary">
                  {reportData.confidence}%
                </span>
              </div>
              <button
                onClick={handleFinishAndStartNew}
                className="w-full md:w-auto bg-primary text-on-primary px-8 py-3 rounded-lg hover:bg-on-background transition-colors font-label-mono text-label-mono flex items-center justify-center gap-2 shadow-sm text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">add_task</span>
                Finish & Start New
              </button>
            </div>
          </div>

          {/* Critical Findings Alert if applicable */}
          {reportData.criticalFinding && (
            <div className="bg-error-container/20 border border-error p-5 rounded-xl flex items-start gap-3 shadow-sm">
              <span className="material-symbols-outlined text-error text-[24px] shrink-0 mt-0.5">
                policy
              </span>
              <div>
                <h4 className="text-body-md font-bold text-error text-sm mb-1">
                  Critical Finding Analysis
                </h4>
                <p className="text-body-sm text-on-surface-variant text-xs leading-relaxed">
                  {reportData.criticalFinding}
                </p>
              </div>
            </div>
          )}

          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Passenger Details (5 cols) */}
            <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant">person</span>
                <h3 className="text-headline-md font-headline-md font-bold text-primary text-lg">
                  Passenger Details
                </h3>
              </div>

              <div className="flex flex-col gap-6 flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-24 bg-surface-container-high border border-outline-variant rounded-lg shrink-0 overflow-hidden shadow-inner">
                    <img
                      src={reportData.passenger.photo}
                      alt="Passenger Photo"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full text-xs">
                    <div className="flex justify-between w-full border-b border-surface-container-high pb-1.5">
                      <span className="text-label-mono font-label-mono text-on-surface-variant">
                        Surname
                      </span>
                      <span className="font-bold text-on-surface uppercase font-mono">
                        {reportData.passenger.surname}
                      </span>
                    </div>
                    <div className="flex justify-between w-full border-b border-surface-container-high pb-1.5">
                      <span className="text-label-mono font-label-mono text-on-surface-variant">
                        Given Names
                      </span>
                      <span className="font-bold text-on-surface uppercase font-mono">
                        {reportData.passenger.givenNames}
                      </span>
                    </div>
                    <div className="flex justify-between w-full border-b border-surface-container-high pb-1.5">
                      <span className="text-label-mono font-label-mono text-on-surface-variant">
                        DOB
                      </span>
                      <span className="font-semibold text-on-surface font-mono">
                        {reportData.passenger.dob}
                      </span>
                    </div>
                    <div className="flex justify-between w-full pb-1">
                      <span className="text-label-mono font-label-mono text-on-surface-variant">
                        Nationality
                      </span>
                      <span className="font-bold text-on-surface">
                        {reportData.passenger.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-surface p-3 border border-outline-variant rounded-lg flex flex-col gap-0.5">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px]">
                      Flight
                    </span>
                    <span className="font-bold text-on-surface font-mono text-sm">
                      {reportData.passenger.flight}
                    </span>
                  </div>
                  <div className="bg-surface p-3 border border-outline-variant rounded-lg flex flex-col gap-0.5">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px]">
                      Destination
                    </span>
                    <span className="font-bold text-on-surface font-mono text-sm">
                      {reportData.passenger.destination}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Summary & Verification Checklist (7 cols) */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-outline-variant">
                <span className="material-symbols-outlined text-on-surface-variant">id_card</span>
                <h3 className="text-headline-md font-headline-md font-bold text-primary text-lg">
                  Document Summary
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-surface p-3.5 border border-outline-variant rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px]">
                      Document Type
                    </span>
                    <span className="font-bold text-on-surface text-sm">
                      {reportData.document.type}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[11px]">
                      Document No.
                    </span>
                    <span className="font-bold text-on-surface font-mono text-sm">
                      {reportData.document.documentNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex flex-col gap-0.5 p-2 border-b border-surface-container-highest">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[10px]">
                      Date of Issue
                    </span>
                    <span className="font-mono text-on-surface">{reportData.document.issueDate}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-2 border-b border-surface-container-highest">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[10px]">
                      Date of Expiry
                    </span>
                    <span
                      className={`font-mono ${
                        isMedRisk ? 'text-warning font-bold' : 'text-on-surface'
                      }`}
                    >
                      {reportData.document.expiryDate}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-2 border-b border-surface-container-highest">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[10px]">
                      Issuing Authority
                    </span>
                    <span className="text-on-surface truncate">{reportData.document.issuingAuthority}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 p-2 border-b border-surface-container-highest">
                    <span className="text-label-mono font-label-mono text-on-surface-variant text-[10px]">
                      Chip Status
                    </span>
                    <div className="flex items-center gap-1 text-secondary font-semibold">
                      <span className="material-symbols-outlined text-[15px]">wifi_tethering</span>
                      <span>{reportData.document.chipStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Raw MRZ Box */}
                <div className="mt-1 bg-surface border border-outline-variant rounded-lg p-3 font-mono text-[11px] leading-tight text-on-surface-variant break-all uppercase tracking-wider relative overflow-hidden select-all shadow-inner">
                  {reportData.document.mrz}
                </div>

                {/* Verification Checklist */}
                <div className="mt-3">
                  <h4 className="text-label-mono font-label-mono font-bold text-on-surface-variant uppercase text-[11px] mb-2">
                    Verification Checklist
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(reportData.checklist).map(([key, item]) => (
                      <div
                        key={key}
                        className={`flex justify-between items-center p-2.5 rounded-lg border text-xs ${
                          item.passed
                            ? 'bg-surface border-outline-variant'
                            : 'bg-error-container/20 border-error/30'
                        }`}
                      >
                        <span className="font-medium capitalize text-on-surface">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span
                          className={`font-bold flex items-center gap-1 font-label-mono ${
                            item.passed ? 'text-secondary' : 'text-error'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {item.passed ? 'check_circle' : 'cancel'}
                          </span>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Evidence Section for Demo 4 (Modified Information) */}
          {reportData.visualEvidence && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <h4 className="text-headline-md font-headline-md font-bold text-primary mb-4 border-b border-outline-variant pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">image_search</span>
                Visual Anomaly Diagnostics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative border border-outline-variant p-2 rounded-lg bg-surface-container-low">
                  <div className="absolute inset-0 border-2 border-error/50 z-10 rounded pointer-events-none" />
                  <img
                    src={reportData.visualEvidence.anomalyImage}
                    alt="Visual Zone Anomaly"
                    className="w-full h-48 object-cover rounded opacity-90 sepia-[.2] contrast-125"
                  />
                  <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 px-2.5 py-1 rounded backdrop-blur-sm border border-outline-variant z-20">
                    <span className="font-label-mono text-label-mono text-error font-bold flex items-center gap-1 text-xs">
                      <span className="material-symbols-outlined text-[14px]">error</span>
                      {reportData.visualEvidence.anomalyTitle}
                    </span>
                  </div>
                </div>

                <div className="relative border border-outline-variant p-2 rounded-lg bg-surface-container-low">
                  <div className="absolute inset-0 border-2 border-error/50 z-10 rounded pointer-events-none" />
                  <img
                    src={reportData.visualEvidence.mrzAnomalyImage}
                    alt="MRZ Checksum Failure"
                    className="w-full h-48 object-cover rounded opacity-90 contrast-125"
                  />
                  <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 px-2.5 py-1 rounded backdrop-blur-sm border border-outline-variant z-20">
                    <span className="font-label-mono text-label-mono text-error font-bold flex items-center gap-1 text-xs">
                      <span className="material-symbols-outlined text-[14px]">code_blocks</span>
                      {reportData.visualEvidence.mrzAnomalyTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};
