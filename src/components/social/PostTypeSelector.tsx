import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PostType, postTemplates } from '@/data/social/templates';

interface PostTypeSelectorProps {
  value: PostType;
  onChange: (value: PostType) => void;
}

export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold text-foreground">Typ příspěvku</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as PostType)}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        {(Object.keys(postTemplates) as PostType[]).map((type) => {
          const template = postTemplates[type];
          const isSelected = value === type;

          return (
            <Label
              key={type}
              htmlFor={`post-type-${type}`}
              className={`
                flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                  : 'border-border bg-card hover:border-primary/50 hover:bg-card/80'
                }
              `}
            >
              <RadioGroupItem value={type} id={`post-type-${type}`} className="sr-only" />
              <span className="text-lg">{template.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-xs ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {template.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {template.description}
                </p>
              </div>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
