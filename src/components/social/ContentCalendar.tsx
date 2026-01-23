import { Calendar, Tag, FileText, Star, Lightbulb, Newspaper, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { contentCalendar, PostType, brandingConfig } from '@/data/social/templates';

const iconMap = {
  promo: Tag,
  blog: FileText,
  review: Star,
  tip: Lightbulb,
  news: Newspaper,
  custom: Edit,
};

const typeColors: Record<PostType, string> = {
  promo: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  blog: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  review: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  tip: 'bg-green-500/20 text-green-400 border-green-500/30',
  news: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  custom: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

interface ContentCalendarProps {
  onSelectType: (type: PostType) => void;
}

export function ContentCalendar({ onSelectType }: ContentCalendarProps) {
  const today = new Date().toLocaleDateString('cs-CZ', { weekday: 'long' });
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="space-y-6">
      {/* Content Calendar */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Content kalendár
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {contentCalendar.map((item) => {
            const Icon = iconMap[item.type];
            const isToday = item.day.toLowerCase() === todayCapitalized.toLowerCase();

            return (
              <Button
                key={item.day}
                variant="ghost"
                onClick={() => onSelectType(item.type)}
                className={`
                  w-full justify-start h-auto py-2 px-3 
                  ${isToday ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'}
                `}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-1.5 rounded ${typeColors[item.type]}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
                      {item.day}
                      {isToday && (
                        <Badge variant="secondary" className="ml-2 text-[10px] py-0">
                          Dnes
                        </Badge>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.suggestion}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Branding Guidelines */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">🎨 Brand farby</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg border border-border"
              style={{ backgroundColor: brandingConfig.colors.noir }}
            />
            <div>
              <p className="text-sm font-medium">Noir</p>
              <p className="text-xs text-muted-foreground">{brandingConfig.colors.noir}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg border border-border"
              style={{ backgroundColor: brandingConfig.colors.gold }}
            />
            <div>
              <p className="text-sm font-medium">Gold</p>
              <p className="text-xs text-muted-foreground">{brandingConfig.colors.gold}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg border border-border"
              style={{ backgroundColor: brandingConfig.colors.cream }}
            />
            <div>
              <p className="text-sm font-medium">Cream</p>
              <p className="text-xs text-muted-foreground">{brandingConfig.colors.cream}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">💡 Tipy</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• FB: Dlhšie texty, viac kontextu</li>
            <li>• IG: Kratšie, viac emoji</li>
            <li>• Pridávaj CTA (výzvu k akci)</li>
            <li>• Používaj 📞 730 431 313</li>
            <li>• Linkuj na popri.cz</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
