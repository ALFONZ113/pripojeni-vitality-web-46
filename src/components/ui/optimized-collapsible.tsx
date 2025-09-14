/**
 * Optimized collapsible component that prevents forced reflows
 * Uses CSS-only animations with minimal JavaScript layout reads
 */
import React, { useState, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedCollapsibleProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

interface OptimizedCollapsibleTriggerProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface OptimizedCollapsibleContentProps {
  children: ReactNode;
  className?: string;
}

// Create context for sharing state
const CollapsibleContext = React.createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({
  isOpen: false,
  toggle: () => {}
});

export const OptimizedCollapsible: React.FC<OptimizedCollapsibleProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  className
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggle = () => {
    const newState = !isOpen;
    if (isControlled && onOpenChange) {
      onOpenChange(newState);
    } else {
      setInternalOpen(newState);
    }
  };

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      <div className={cn('collapsible-root', className)}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
};

export const OptimizedCollapsibleTrigger: React.FC<OptimizedCollapsibleTriggerProps> = ({
  children,
  className,
  onClick
}) => {
  const { toggle } = React.useContext(CollapsibleContext);

  const handleClick = () => {
    // Prevent layout reads by deferring the toggle
    requestAnimationFrame(() => {
      toggle();
      onClick?.();
    });
  };

  return (
    <button
      type="button"
      className={cn('collapsible-trigger', className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const OptimizedCollapsibleContent: React.FC<OptimizedCollapsibleContentProps> = ({
  children,
  className
}) => {
  const { isOpen } = React.useContext(CollapsibleContext);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={contentRef}
      className={cn(
        'collapsible-content',
        'overflow-hidden transition-[max-height] duration-300 ease-in-out',
        isOpen ? 'max-h-[200px]' : 'max-h-0', // Use fixed max-height to avoid measuring
        className
      )}
      style={{
        // Use CSS containment to prevent layout propagation
        contain: 'layout style paint',
        contentVisibility: isOpen ? 'visible' : 'hidden'
      }}
    >
      <div className="p-0">
        {children}
      </div>
    </div>
  );
};