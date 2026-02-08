import { useCallback, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Upload, X, User, Palette, Pencil, Film, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PersonRenderStyle = 'realistic' | 'caricature' | 'illustration' | 'cartoon';

interface PersonUploaderProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
  renderStyle: PersonRenderStyle;
  onRenderStyleChange: (style: PersonRenderStyle) => void;
}

const styleOptions: { value: PersonRenderStyle; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'realistic',
    label: 'Realistický',
    description: 'Fotorealistická úprava osoby v scéně',
    icon: <User className="h-4 w-4" />,
  },
  {
    value: 'caricature',
    label: 'Karikatúra',
    description: 'Humorná, preexponovaná karikatúra',
    icon: <Palette className="h-4 w-4" />,
  },
  {
    value: 'illustration',
    label: 'Ilustrácia',
    description: 'Moderná digitálna ilustrácia',
    icon: <Pencil className="h-4 w-4" />,
  },
  {
    value: 'cartoon',
    label: 'Kreslený',
    description: 'Štýl Pixar/Disney animovaných filmov',
    icon: <Film className="h-4 w-4" />,
  },
];

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function PersonUploader({ 
  image, 
  onImageChange, 
  renderStyle, 
  onRenderStyleChange 
}: PersonUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Podporované formáty: JPG, PNG, WebP');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Maximálna veľkosť súboru je 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.onerror = () => {
      setError('Chyba pri načítaní súboru');
    };
    reader.readAsDataURL(file);
  }, [onImageChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onImageChange(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onImageChange]);

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlertTriangle className="h-4 w-4" />
        <span>Nahraná fotografia sa spracováva cez AI a nezostáva trvalo uložená.</span>
      </div>

      {/* Upload area */}
      <div className="space-y-2">
        <Label>Fotografia osoby</Label>
        {image ? (
          <div className="relative w-full max-w-[200px] aspect-square rounded-lg overflow-hidden border border-border">
            <img 
              src={image} 
              alt="Nahraná fotografia" 
              className="w-full h-full object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragging 
                ? "border-primary bg-primary/10" 
                : "border-border bg-muted/50 hover:border-primary/50 hover:bg-muted"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Přetáhněte fotku sem nebo <span className="text-primary">klikněte pro výběr</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, PNG, WebP (max 4MB)
            </p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleInputChange}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* Style selection */}
      <div className="space-y-2">
        <Label>Štýl zobrazenia</Label>
        <RadioGroup
          value={renderStyle}
          onValueChange={(v) => onRenderStyleChange(v as PersonRenderStyle)}
          className="grid grid-cols-2 gap-2"
        >
          {styleOptions.map((option) => (
            <Label
              key={option.value}
              htmlFor={`style-${option.value}`}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-lg border cursor-pointer transition-all",
                renderStyle === option.value
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-border bg-background hover:bg-muted/50"
              )}
            >
              <RadioGroupItem 
                value={option.value} 
                id={`style-${option.value}`} 
                className="sr-only" 
              />
              <div className={cn(
                "p-2 rounded-full",
                renderStyle === option.value ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {option.icon}
              </div>
              <span className="font-medium text-sm text-center">{option.label}</span>
              <span className="text-xs text-muted-foreground text-center line-clamp-2">
                {option.description}
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
