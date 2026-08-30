import React from 'react';
import { useScreening } from '../../context/ScreeningContext';
import { ASSETS } from '../../services/mockData';

interface TopHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: {
    text: string;
    pulse?: boolean;
    color?: string;
  };
  actions?: React.ReactNode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ title = 'Overview', subtitle, badge, actions }) => {
  const { officer } = useScreening();

  return (
    <header className="bg-surface border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop h-16 sticky top-0 z-20 shrink-0 select-none">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-headline-md font-headline-md font-bold text-primary leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body-sm font-body-sm text-on-surface-variant text-[13px]">
              {subtitle}
            </p>
          )}
        </div>

        {badge && (
          <div className="bg-surface-container-highest text-on-primary-fixed-variant px-3 py-1 rounded-full text-label-mono font-label-mono flex items-center gap-1.5 text-[12px] border border-outline-variant">
            {badge.pulse && <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />}
            {badge.text}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {actions && <div className="flex items-center gap-3">{actions}</div>}

        <div className="flex gap-2 border-l border-outline-variant pl-4">
          <button
            className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center relative"
            title="System Alerts (3 Active)"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error" />
          </button>
          <button
            className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center"
            title="Operational Help"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 pl-2">
          <div className="h-8 w-8 rounded-full bg-surface-variant border border-outline-variant overflow-hidden shrink-0">
            <img
              src={officer.avatar || ASSETS.officerVance}
              alt="Officer Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block text-left">
            <span className="text-label-mono font-label-mono text-primary font-semibold block text-[11px] leading-tight">
              STATION: {officer.stationId}
            </span>
            <span className="text-label-mono font-label-mono text-outline text-[10px]">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
