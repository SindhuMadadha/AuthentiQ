import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScreeningProvider, useScreening } from './context/ScreeningContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { NewScreening } from './pages/NewScreening';
import { OcrExtraction } from './pages/OcrExtraction';
import { DocumentValidation } from './pages/DocumentValidation';
import { TamperingDetection } from './pages/TamperingDetection';
import { FaceVerification } from './pages/FaceVerification';
import { RiskAssessment } from './pages/RiskAssessment';
import { FinalReport } from './pages/FinalReport';
import { ScreeningHistory } from './pages/ScreeningHistory';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

// Router wrapper that uses HashRouter for robust file:// and static server routing
const RouterComponent = HashRouter;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useScreening();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Main App Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-screening"
        element={
          <ProtectedRoute>
            <NewScreening />
          </ProtectedRoute>
        }
      />
      <Route
        path="/screening/ocr"
        element={
          <ProtectedRoute>
            <OcrExtraction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/screening/validation"
        element={
          <ProtectedRoute>
            <DocumentValidation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/screening/tampering"
        element={
          <ProtectedRoute>
            <TamperingDetection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/screening/face"
        element={
          <ProtectedRoute>
            <FaceVerification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/screening/assessment"
        element={
          <ProtectedRoute>
            <RiskAssessment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/screening/report"
        element={
          <ProtectedRoute>
            <FinalReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <ScreeningHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <ScreeningProvider>
      <RouterComponent>
        <AppRoutes />
      </RouterComponent>
    </ScreeningProvider>
  );
};

export default App;
