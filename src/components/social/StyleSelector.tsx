import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sparkles, Moon, Zap, Camera, Palette, Cpu, Sun, Clock } from 'lucide-react';

export type VisualStyle = 
  | 'luxury-gold' 
  | 'photo-realistic' 
  | 'modern-noir' 
  | 'minimalist'
  | 'gradient-modern'
  | 'tech-blue'
  | 'bright-bold'
  | 'vintage-retro';

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
    value: 'photo-realistic',
    label: 'Foto realistický',
    description: 'Realistické fotky, domácí atmosféra',
    icon: <Camera className="h-4 w-4 text-emerald-500" />,
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
  {
    value: 'gradient-modern',
    label: 'Gradient Modern',
    description: 'Živé barevné přechody',
    icon: <Palette className="h-4 w-4 text-violet-500" />,
  },
  {
    value: 'tech-blue',
    label: 'Tech Blue',
    description: 'Profesionální modrá, tech styl',
    icon: <Cpu className="h-4 w-4 text-blue-500" />,
  },
  {
    value: 'bright-bold',
    label: 'Bright & Bold',
    description: 'Výrazné barvy, promo styl',
    icon: <Sun className="h-4 w-4 text-orange-500" />,
  },
  {
    value: 'vintage-retro',
    label: 'Vintage Retro',
    description: 'Nostalgický, teplé odstíny',
    icon: <Clock className="h-4 w-4 text-amber-600" />,
  },
];

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Vizuální styl obrázku</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as VisualStyle)}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
      >
        {styles.map((style) => (
          <Label
            key={style.value}
            htmlFor={style.value}
            className={`
              flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-all min-h-[88px]
              ${value === style.value 
                ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                : 'border-border bg-muted/30 hover:bg-muted/50'}
            `}
          >
            <RadioGroupItem value={style.value} id={style.value} className="sr-only" />
            {style.icon}
            <span className="font-medium text-xs text-center">{style.label}</span>
            <span className="text-[11px] sm:text-xs text-muted-foreground text-center leading-tight">{style.description}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
