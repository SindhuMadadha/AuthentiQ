import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useScreening } from '../../context/ScreeningContext';
import { ASSETS } from '../../services/mockData';

export const Sidebar: React.FC = () => {
  const { officer, resetSession, logout } = useScreening();
  const navigate = useNavigate();

  const handleNewScreeningClick = () => {
    resetSession('Passport');
    navigate('/new-screening');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'New Screening', path: '/new-screening', icon: 'document_scanner' },
    { label: 'History', path: '/history', icon: 'history' },
    { label: 'Reports', path: '/reports', icon: 'analytics' },
    { label: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <nav className="bg-surface-container-lowest border-r border-outline-variant fixed left-0 top-0 h-full flex flex-col py-6 w-64 z-30 select-none">
      {/* Brand Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
        </div>
        <div>
          <h1 className="text-headline-md font-headline-md font-bold text-primary tracking-tight leading-tight">
            AuthentiQ
          </h1>
          <p className="text-label-mono font-label-mono text-outline text-[11px] uppercase tracking-wider">
            Vigilant AI Screening
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="px-4 mb-6">
        <button
          onClick={handleNewScreeningClick}
          className="w-full bg-primary text-on-primary rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-on-background transition-colors shadow-sm font-medium group"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">
            add
          </span>
          <span className="font-body-md font-medium">New Screening</span>
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-r-lg border-l-4 transition-all duration-200 text-label-mono font-label-mono ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container border-secondary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-[20px] ${isActive ? 'text-secondary' : ''}`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bottom Officer Profile & Logout */}
      <div className="mt-auto px-6 border-t border-outline-variant pt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={officer.avatar || ASSETS.officerVance}
            alt="Officer Profile Avatar"
            className="w-9 h-9 rounded-full object-cover border border-outline-variant shrink-0"
          />
          <div className="overflow-hidden">
            <p className="text-body-sm font-semibold text-primary truncate leading-tight">
              {officer.name}
            </p>
            <p className="text-label-mono font-label-mono text-on-surface-variant text-[11px]">
              ID: {officer.id}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          title="Sign Out"
          className="text-outline hover:text-error transition-colors p-1.5 rounded hover:bg-surface-container-low"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
    </nav>
  );
};
