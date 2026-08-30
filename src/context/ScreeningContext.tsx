import React, { createContext, useContext, useState } from 'react';
import { 
  DocumentType, 
  DemoCaseId, 
  OcrData, 
  ValidationData, 
  TamperingData, 
  FaceVerificationData, 
  RiskAssessmentData, 
  FinalReportData, 
  HistoryRecord 
} from '../types/screening';
import { 
  DEFAULT_OCR_DATA, 
  DEFAULT_VALIDATION_DATA, 
  DEFAULT_TAMPERING_DATA, 
  DEFAULT_FACE_DATA, 
  DEFAULT_RISK_ASSESSMENT_DATA, 
  DEMO_CASES, 
  INITIAL_HISTORY,
  ASSETS 
} from '../services/mockData';

interface OfficerProfile {
  name: string;
  id: string;
  stationId: string;
  role: string;
  avatar: string;
}

interface ScreeningContextType {
  isAuthenticated: boolean;
  officer: OfficerProfile;
  login: (badgeId: string, key: string, station: string) => void;
  logout: () => void;
  activeScreeningId: string;
  selectedDocType: DocumentType;
  setSelectedDocType: (type: DocumentType) => void;
  activeDemoCase: DemoCaseId | null;
  ocrData: OcrData;
  updateOcrField: (fieldName: keyof OcrData, value: string) => void;
  validationData: ValidationData;
  tamperingData: TamperingData;
  faceData: FaceVerificationData;
  riskData: RiskAssessmentData;
  finalReport: FinalReportData;
  history: HistoryRecord[];
  runDemo: (demoId: DemoCaseId) => FinalReportData;
  resetSession: (newDocType?: DocumentType) => void;
  getReportForDemo: (demoId: string) => FinalReportData;
}

const ScreeningContext = createContext<ScreeningContextType | undefined>(undefined);

export const ScreeningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [officer, setOfficer] = useState<OfficerProfile>({
    name: 'Officer K. Vance',
    id: '884-X9',
    stationId: 'ST-409',
    role: 'Senior Inspection Officer',
    avatar: ASSETS.officerVance,
  });

  const [activeScreeningId, setActiveScreeningId] = useState<string>('AQ-784-X92');
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>('Passport');
  const [activeDemoCase, setActiveDemoCase] = useState<DemoCaseId | null>(null);

  const [ocrData, setOcrData] = useState<OcrData>(DEFAULT_OCR_DATA);
  const [validationData, setValidationData] = useState<ValidationData>(DEFAULT_VALIDATION_DATA);
  const [tamperingData, setTamperingData] = useState<TamperingData>(DEFAULT_TAMPERING_DATA);
  const [faceData, setFaceData] = useState<FaceVerificationData>(DEFAULT_FACE_DATA);
  const [riskData, setRiskData] = useState<RiskAssessmentData>(DEFAULT_RISK_ASSESSMENT_DATA);
  const [finalReport, setFinalReport] = useState<FinalReportData>(DEMO_CASES['demo-1']);
  const [history, setHistory] = useState<HistoryRecord[]>(INITIAL_HISTORY);

  const login = (badgeId: string, _key: string, station: string) => {
    setIsAuthenticated(true);
    setOfficer(prev => ({
      ...prev,
      id: badgeId || prev.id,
      stationId: station || prev.stationId,
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateOcrField = (fieldName: keyof OcrData, value: string) => {
    setOcrData(prev => {
      const field = prev[fieldName];
      if (typeof field === 'object' && 'value' in field) {
        return {
          ...prev,
          [fieldName]: {
            ...field,
            value,
            isError: false,
          },
        };
      }
      return prev;
    });
  };

  const resetSession = (newDocType: DocumentType = 'Passport') => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = `AQ-${randomSuffix}-X${Math.floor(10 + Math.random() * 90)}`;
    setActiveScreeningId(newId);
    setSelectedDocType(newDocType);
    setActiveDemoCase(null);
    setOcrData(DEFAULT_OCR_DATA);
    setValidationData(DEFAULT_VALIDATION_DATA);
    setTamperingData(DEFAULT_TAMPERING_DATA);
    setFaceData(DEFAULT_FACE_DATA);
    setRiskData(DEFAULT_RISK_ASSESSMENT_DATA);
  };

  const runDemo = (demoId: DemoCaseId): FinalReportData => {
    setActiveDemoCase(demoId);
    const report = DEMO_CASES[demoId] || DEMO_CASES['demo-1'];
    setFinalReport(report);
    return report;
  };

  const getReportForDemo = (demoId: string): FinalReportData => {
    return DEMO_CASES[demoId] || DEMO_CASES['demo-1'];
  };

  return (
    <ScreeningContext.Provider
      value={{
        isAuthenticated,
        officer,
        login,
        logout,
        activeScreeningId,
        selectedDocType,
        setSelectedDocType,
        activeDemoCase,
        ocrData,
        updateOcrField,
        validationData,
        tamperingData,
        faceData,
        riskData,
        finalReport,
        history,
        runDemo,
        resetSession,
        getReportForDemo,
      }}
    >
      {children}
    </ScreeningContext.Provider>
  );
};

export const useScreening = () => {
  const context = useContext(ScreeningContext);
  if (!context) {
    throw new Error('useScreening must be used within a ScreeningProvider');
  }
  return context;
};
