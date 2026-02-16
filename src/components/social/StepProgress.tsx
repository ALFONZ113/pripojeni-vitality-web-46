import { Check } from 'lucide-react';
import { WIZARD_STEPS, WIZARD_STEP_LABELS, WizardStep } from '@/data/social/templates';

interface StepProgressProps {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  onStepClick: (step: WizardStep) => void;
}

export function StepProgress({ currentStep, completedSteps, onStepClick }: StepProgressProps) {
  const currentIndex = WIZARD_STEPS.indexOf(currentStep);

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {WIZARD_STEPS.map((step, index) => {
        const isCompleted = completedSteps.includes(step);
        const isCurrent = step === currentStep;
        const isClickable = isCompleted || index <= currentIndex;

        return (
          <div key={step} className="flex items-center">
            <button
              onClick={() => isClickable && onStepClick(step)}
              disabled={!isClickable}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap
                ${isCurrent
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : isCompleted
                    ? 'bg-primary/20 text-primary cursor-pointer hover:bg-primary/30'
                    : 'bg-muted text-muted-foreground cursor-default'
                }
              `}
            >
              {isCompleted && !isCurrent ? (
                <Check className="h-3 w-3" />
              ) : (
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-current/20 text-[10px]">
                  {index + 1}
                </span>
              )}
              {WIZARD_STEP_LABELS[step]}
            </button>
            {index < WIZARD_STEPS.length - 1 && (
              <div className={`w-4 h-px mx-0.5 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
