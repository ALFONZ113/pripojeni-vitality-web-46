import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface CTAToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function CTAToggle({ value, onChange }: CTAToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
      <div className="space-y-0.5">
        <Label htmlFor="cta-toggle" className="text-sm font-medium">
          CTA tlačítko na obrázku
        </Label>
        <p className="text-xs text-muted-foreground">
          Přidá výzvu k akci přímo do vygenerovaného obrázku
        </p>
      </div>
      <Switch
        id="cta-toggle"
        checked={value}
        onCheckedChange={onChange}
      />
    </div>
  );
}
