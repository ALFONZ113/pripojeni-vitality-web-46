import { Tag, FileText, Star, Lightbulb, Newspaper, Edit } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PostType, postTemplates } from '@/data/social/templates';

const iconMap = {
  Tag,
  FileText,
  Star,
  Lightbulb,
  Newspaper,
  Edit,
};

interface PostTypeSelectorProps {
  value: PostType;
  onChange: (value: PostType) => void;
}

export function PostTypeSelector({ value, onChange }: PostTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold text-foreground">Typ príspevku</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as PostType)}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {(Object.keys(postTemplates) as PostType[]).map((type) => {
          const template = postTemplates[type];
          const Icon = iconMap[template.icon as keyof typeof iconMap];
          const isSelected = value === type;

          return (
            <Label
              key={type}
              htmlFor={type}
              className={`
                flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                  : 'border-border bg-card hover:border-primary/50 hover:bg-card/80'
                }
              `}
            >
              <RadioGroupItem value={type} id={type} className="sr-only" />
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {template.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
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
