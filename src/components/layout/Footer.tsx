import React from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center w-full px-margin-desktop py-4 mt-auto text-on-surface-variant text-body-sm select-none ${className}`}>
      <div className="font-label-mono text-primary text-label-mono opacity-85 hover:opacity-100 transition-opacity mb-2 sm:mb-0">
        © 2024 AuthentiQ Security. All rights reserved. • ISO 27001 Certified
      </div>
      <div className="flex gap-6 text-label-mono text-[11px]">
        <button className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
          Privacy Policy
        </button>
        <button className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
          Terms of Service
        </button>
        <button className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
          Security Protocols
        </button>
      </div>
    </footer>
  );
};
