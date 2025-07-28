import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Optimized Button component
export const OptimizedButton = memo(Button);
OptimizedButton.displayName = 'OptimizedButton';

// Optimized Card components
export const OptimizedCard = memo(Card);
OptimizedCard.displayName = 'OptimizedCard';

export const OptimizedCardHeader = memo(CardHeader);
OptimizedCardHeader.displayName = 'OptimizedCardHeader';

export const OptimizedCardTitle = memo(CardTitle);
OptimizedCardTitle.displayName = 'OptimizedCardTitle';

export const OptimizedCardDescription = memo(CardDescription);
OptimizedCardDescription.displayName = 'OptimizedCardDescription';

export const OptimizedCardContent = memo(CardContent);
OptimizedCardContent.displayName = 'OptimizedCardContent';

// Optimized Badge component
export const OptimizedBadge = memo(Badge);
OptimizedBadge.displayName = 'OptimizedBadge';

// Generic wrapper for memoizing any component
export function withMemo<T extends React.ComponentType<any>>(
  Component: T,
  displayName?: string
): React.MemoExoticComponent<T> {
  const MemoizedComponent = memo(Component);
  if (displayName) {
    MemoizedComponent.displayName = displayName;
  }
  return MemoizedComponent;
}