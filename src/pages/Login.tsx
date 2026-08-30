import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScreening } from '../context/ScreeningContext';
import { ASSETS } from '../services/mockData';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useScreening();

  const [badgeId, setBadgeId] = useState('AQ-9482');
  const [password, setPassword] = useState('••••••••');
  const [stationId] = useState('ST-409');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(badgeId, password, stationId);
    navigate('/dashboard');
  };

  const handleBypass = () => {
    login('OP-BYPASS-01', 'bypass', stationId);
    navigate('/dashboard');
  };

  return (
    <div className="bg-background text-on-background min-h-screen w-full flex items-center justify-center overflow-hidden relative selection:bg-secondary-container">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center absolute inset-0"
          style={{ backgroundImage: `url('${ASSETS.loginBg}')` }}
        />
        {/* Overlay to ensure contrast */}
        <div className="absolute inset-0 bg-surface/85 backdrop-blur-sm" />
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0 my-8">
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center mb-4 border border-outline-variant shadow-[0_4px_12px_rgba(0,10,30,0.12)]">
            <span
              className="material-symbols-outlined text-on-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_lock
            </span>
          </div>
          <h1 className="text-display-lg font-display-lg font-bold text-primary tracking-tight">
            AuthentiQ
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-2 font-medium">
            AI-Powered Identity & Document Screening
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-8 shadow-[0_8px_24px_rgba(0,10,30,0.06)]">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-6 border-b border-outline-variant pb-4 font-semibold">
            Terminal Authentication
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Badge ID / Username */}
            <div>
              <label
                className="block text-label-mono font-label-mono text-on-surface-variant mb-2 uppercase"
                htmlFor="badge-id"
              >
                Badge ID / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline-variant">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <input
                  id="badge-id"
                  name="badge-id"
                  type="text"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  placeholder="Enter Operator ID"
                  className="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded bg-surface-container-low text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-label-mono font-label-mono text-on-surface-variant mb-2 uppercase"
                htmlFor="password"
              >
                Security Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline-variant">
                  <span className="material-symbols-outlined text-[20px]">key</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded bg-surface-container-low text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Station ID */}
            <div>
              <label
                className="block text-label-mono font-label-mono text-on-surface-variant mb-2 uppercase"
                htmlFor="station-id"
              >
                Station Identifier
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline-variant">
                  <span className="material-symbols-outlined text-[20px]">desktop_windows</span>
                </div>
                <input
                  id="station-id"
                  name="station-id"
                  type="text"
                  value={stationId}
                  readOnly
                  className="block w-full pl-10 pr-10 py-3 border border-outline-variant rounded bg-surface-container-lowest text-body-md font-body-md text-on-surface font-mono"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span
                    className="material-symbols-outlined text-secondary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              </div>
              <p className="text-label-mono font-label-mono text-outline mt-1 text-[11px]">
                Auto-detected • Terminal ST-409 Alpha
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded bg-primary text-on-primary text-body-lg font-body-lg font-semibold hover:bg-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm group"
              >
                <span className="material-symbols-outlined mr-2 group-hover:translate-x-1 transition-transform text-[20px]">
                  login
                </span>
                Secure Login
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleBypass}
              type="button"
              className="text-label-mono font-label-mono text-secondary hover:text-on-surface-variant transition-colors underline decoration-secondary/30 hover:decoration-on-surface-variant text-[12px]"
            >
              Emergency Bypass Protocol (Quick Access)
            </button>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="mt-8 text-center flex items-center justify-center space-x-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
          </span>
          <span className="text-label-mono font-label-mono text-on-surface-variant uppercase tracking-widest text-[11px]">
            System Online • Core v4.2.1 • Encryption TLS 1.3
          </span>
        </div>
      </div>
    </div>
  );
};
