import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sparkles, Moon, Zap } from 'lucide-react';

export type VisualStyle = 'luxury-gold' | 'modern-noir' | 'minimalist';

interface StyleSelectorProps {
  value: VisualStyle;
  onChange: (value: VisualStyle) => void;
}

const styles: { value: VisualStyle; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'luxury-gold',
    label: 'Luxury Gold',
    description: 'Zlaté akcenty, luxusní vzhled',
    icon: <Sparkles className="h-4 w-4 text-primary" />,
  },
  {
    value: 'modern-noir',
    label: 'Moderní Noir',
    description: 'Tmavý, profesionální styl',
    icon: <Moon className="h-4 w-4 text-muted-foreground" />,
  },
  {
    value: 'minimalist',
    label: 'Minimalistický',
    description: 'Čistý, jednoduchý design',
    icon: <Zap className="h-4 w-4 text-foreground" />,
  },
];

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Vizuální styl obrázku</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as VisualStyle)}
        className="grid grid-cols-3 gap-3"
      >
        {styles.map((style) => (
          <Label
            key={style.value}
            htmlFor={style.value}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-all
              ${value === style.value 
                ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                : 'border-border bg-muted/30 hover:bg-muted/50'}
            `}
          >
            <RadioGroupItem value={style.value} id={style.value} className="sr-only" />
            {style.icon}
            <span className="font-medium text-sm">{style.label}</span>
            <span className="text-xs text-muted-foreground text-center">{style.description}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
