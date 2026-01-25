import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { User, Image } from 'lucide-react';

export type IncludePerson = 'with-person' | 'without-person';

interface PersonToggleProps {
  value: IncludePerson;
  onChange: (value: IncludePerson) => void;
}

const options: { value: IncludePerson; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'with-person',
    label: 'S osobou',
    description: 'Realistické fotky s lidmi v autentických situacích',
    icon: <User className="h-4 w-4 text-primary" />,
  },
  {
    value: 'without-person',
    label: 'Bez osob',
    description: 'Pouze objekty, zařízení a prostředí bez lidí',
    icon: <Image className="h-4 w-4 text-muted-foreground" />,
  },
];

export function PersonToggle({ value, onChange }: PersonToggleProps) {
  return (
    <div className="space-y-3">
      <Label>Lidé na obrázku</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as IncludePerson)}
        className="grid grid-cols-2 gap-3"
      >
        {options.map((option) => (
          <Label
            key={option.value}
            htmlFor={option.value}
            className={`
              flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-all
              ${value === option.value 
                ? 'border-primary bg-primary/10 ring-1 ring-primary' 
                : 'border-border bg-muted/30 hover:bg-muted/50'}
            `}
          >
            <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
            {option.icon}
            <span className="font-medium text-sm">{option.label}</span>
            <span className="text-xs text-muted-foreground text-center">{option.description}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
