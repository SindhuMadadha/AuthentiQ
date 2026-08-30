export type DocumentType = 
  | 'Passport'
  | 'Visa'
  | 'National ID'
  | 'Driving License'
  | 'Permit'
  | 'Other';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type ScreeningStatus = 'GENUINE' | 'EXPIRED' | 'SUSPECTED TAMPERING' | 'INFORMATION MISMATCH' | 'CLEARED' | 'SUSPICIOUS' | 'UNDER_REVIEW';

export type DemoCaseId = 'demo-1' | 'demo-2' | 'demo-3' | 'demo-4';

export interface OcrField {
  label: string;
  value: string;
  confidence: number;
  isError?: boolean;
  errorMessage?: string;
}

export interface OcrData {
  surname: OcrField;
  givenNames: OcrField;
  dateOfBirth: OcrField;
  nationality: OcrField;
  documentNumber: OcrField;
  dateOfExpiry: OcrField;
  dateOfIssue?: OcrField;
  sex?: OcrField;
  issuingAuthority?: OcrField;
  mrzRaw: string;
  mrzChecksumValid: boolean;
  overallConfidence: number;
  documentImage: string;
}

export interface SecurityFeatureCheck {
  name: string;
  confidence: number;
  passed: boolean;
  image: string;
  description?: string;
}

export interface DatabaseCheck {
  database: string;
  result: 'NO HIT' | 'MATCH' | 'WARNING';
  passed: boolean;
}

export interface ValidationData {
  documentType: string;
  issuingState: string;
  documentNumber: string;
  dateOfBirth: string;
  dateOfExpiry: string;
  isExpired: boolean;
  documentStatus: 'CLEARED' | 'WARNING' | 'FAILED';
  securityFeatures: SecurityFeatureCheck[];
  databaseHits: DatabaseCheck[];
  checklist: {
    documentValidity: { passed: boolean; message: string };
    expiryCheck: { passed: boolean; message: string };
    visaRequirements: { passed: boolean; warning: boolean; message: string };
  };
}

export interface TamperingVector {
  id: string;
  title: string;
  status: 'passed' | 'warning' | 'failed';
  description: string;
  icon: string;
}

export interface TamperingData {
  probability: number;
  riskLevel: RiskLevel;
  scanImage: string;
  findings: TamperingVector[];
  hasAnomalyBox: boolean;
}

export interface BiometricVector {
  name: string;
  matchScore: number;
  icon: string;
}

export interface FaceVerificationData {
  documentPhoto: string;
  livePhoto: string;
  matchScore: number;
  thresholdMet: boolean;
  sourceDoc: string;
  sourceLive: string;
  liveness: {
    depthMap: string;
    microMovement: string;
    textureAnalysis: string;
    spoofProbability: number;
    passed: boolean;
  };
  vectors: BiometricVector[];
}

export interface RiskFactor {
  id: string;
  type: 'positive' | 'warning' | 'critical';
  title: string;
  description: string;
  logAction?: string;
}

export interface RiskAssessmentData {
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  recommendation: 'Approved' | 'Review Required' | 'Rejected';
  aiModelVersion: string;
  factors: RiskFactor[];
}

export interface FinalReportData {
  screeningId: string;
  reportDate: string;
  stationId: string;
  officerName: string;
  officerId: string;
  decisionTitle: string;
  riskLevel: RiskLevel;
  confidence: number;
  overallStatus: ScreeningStatus;
  passenger: {
    surname: string;
    givenNames: string;
    dob: string;
    nationality: string;
    flight: string;
    destination: string;
    photo: string;
  };
  document: {
    type: string;
    documentNumber: string;
    issueDate: string;
    expiryDate: string;
    issuingAuthority: string;
    issuingCountry: string;
    chipStatus: string;
    mrz: string;
    scanImage: string;
  };
  checklist: {
    ocrCheck: { status: string; passed: boolean; detail?: string };
    documentValidation: { status: string; passed: boolean; detail?: string };
    tamperingDetection: { status: string; passed: boolean; detail?: string };
    faceVerification: { status: string; passed: boolean; detail?: string };
    documentStatus: { status: string; passed: boolean; detail?: string };
  };
  criticalFinding?: string;
  visualEvidence?: {
    anomalyTitle: string;
    anomalyImage: string;
    mrzAnomalyTitle: string;
    mrzAnomalyImage: string;
  };
  demoCaseName?: string;
}

export interface HistoryRecord {
  id: string;
  dateTime: string;
  passengerName: string;
  documentId: string;
  documentType: DocumentType;
  aiRiskScore: number;
  riskLevel: RiskLevel;
  status: 'Approved' | 'Denied' | 'Review';
  officerId: string;
}
