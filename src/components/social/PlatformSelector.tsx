import { Facebook, Instagram, Megaphone } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { Platform, platformSpecs } from '@/data/social/templates';

interface PlatformSelectorProps {
  value: Platform;
  onChange: (value: Platform) => void;
  showFbAd?: boolean;
}

export function PlatformSelector({ value, onChange, showFbAd = false }: PlatformSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold text-foreground">Platforma</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v as Platform)}
        className="flex flex-wrap gap-2 sm:gap-3"
      >
        <ToggleGroupItem
          value="facebook"
          className={`
            flex-1 min-w-[100px] flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200
            ${value === 'facebook' 
              ? 'border-[#1877F2] bg-[#1877F2]/10 text-[#1877F2]' 
              : 'border-border bg-card hover:border-[#1877F2]/50'
            }
          `}
        >
          <Facebook className="h-5 w-5" />
          <div className="text-left">
            <p className="font-medium text-sm">Facebook</p>
            <Badge variant="secondary" className="text-[10px] mt-1 hidden sm:inline-flex">
              {platformSpecs.facebook.dimensions}
            </Badge>
          </div>
        </ToggleGroupItem>

        <ToggleGroupItem
          value="instagram"
          className={`
            flex-1 min-w-[100px] flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200
            ${value === 'instagram' 
              ? 'border-[#E4405F] bg-[#E4405F]/10 text-[#E4405F]' 
              : 'border-border bg-card hover:border-[#E4405F]/50'
            }
          `}
        >
          <Instagram className="h-5 w-5" />
          <div className="text-left">
            <p className="font-medium text-sm">Instagram</p>
            <Badge variant="secondary" className="text-[10px] mt-1 hidden sm:inline-flex">
              {platformSpecs.instagram.dimensions}
            </Badge>
          </div>
        </ToggleGroupItem>

        <ToggleGroupItem
          value="both"
          className={`
            flex-1 min-w-[100px] flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200
            ${value === 'both' 
              ? 'border-primary bg-primary/10 text-primary' 
              : 'border-border bg-card hover:border-primary/50'
            }
          `}
        >
          <div className="flex -space-x-1">
            <Facebook className="h-5 w-5 text-[#1877F2]" />
            <Instagram className="h-5 w-5 text-[#E4405F]" />
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">Oboje</p>
            <Badge variant="secondary" className="text-[10px] mt-1 hidden sm:inline-flex">
              FB + IG
            </Badge>
          </div>
        </ToggleGroupItem>

        {showFbAd && (
          <ToggleGroupItem
            value="fb-ad"
            className={`
              flex-1 min-w-[100px] flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all duration-200
              ${value === 'fb-ad' 
                ? 'border-[#1877F2] bg-[#1877F2]/10 text-[#1877F2]' 
                : 'border-border bg-card hover:border-[#1877F2]/50'
              }
            `}
          >
            <Megaphone className="h-5 w-5" />
            <div className="text-left">
              <p className="font-medium text-sm">FB Ad</p>
              <Badge variant="secondary" className="text-[10px] mt-1 hidden sm:inline-flex">
                {platformSpecs['fb-ad'].dimensions}
              </Badge>
            </div>
          </ToggleGroupItem>
        )}
      </ToggleGroup>
    </div>
  );
}
