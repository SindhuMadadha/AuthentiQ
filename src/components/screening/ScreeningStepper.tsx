import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface StepItem {
  number: number;
  label: string;
  path: string;
}

const STEPS: StepItem[] = [
  { number: 1, label: 'Upload', path: '/new-screening' },
  { number: 2, label: 'Extraction', path: '/screening/ocr' },
  { number: 3, label: 'Validation', path: '/screening/validation' },
  { number: 4, label: 'Detection', path: '/screening/tampering' },
  { number: 5, label: 'Face', path: '/screening/face' },
  { number: 6, label: 'Assessment', path: '/screening/assessment' },
];

interface ScreeningStepperProps {
  currentStep: number; // 1 to 6
}

export const ScreeningStepper: React.FC<ScreeningStepperProps> = ({ currentStep }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-8 shadow-sm">
      <div className="flex items-center justify-between relative max-w-4xl mx-auto">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-surface-container-highest -z-0 -translate-y-1/2" />

        {/* Steps */}
        {STEPS.map((step) => {
          const isCurrent = step.number === currentStep;
          const isPassed = step.number < currentStep;

          return (
            <div
              key={step.number}
              onClick={() => {
                // allow navigating to previous or current steps
                if (step.number <= currentStep + 1) {
                  navigate(step.path);
                }
              }}
              className={`flex flex-col items-center gap-1.5 bg-surface-container-lowest px-2 relative z-10 cursor-pointer group transition-transform ${
                step.number <= currentStep + 1 ? 'hover:scale-105' : 'cursor-not-allowed opacity-75'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-label-mono font-label-mono transition-all ${
                  isCurrent
                    ? 'bg-secondary text-on-secondary border-2 border-secondary font-bold shadow-md ring-4 ring-secondary/20'
                    : isPassed
                    ? 'bg-secondary/15 text-secondary border-2 border-secondary font-semibold'
                    : 'bg-surface-container text-outline border-2 border-outline-variant'
                }`}
              >
                {isPassed ? (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={`text-label-mono font-label-mono text-[11px] uppercase tracking-wider ${
                  isCurrent
                    ? 'text-secondary font-bold'
                    : isPassed
                    ? 'text-primary font-medium'
                    : 'text-outline'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
