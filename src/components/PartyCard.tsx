
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PartyCardProps {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  color?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (id: string) => void;
}

const PartyCard = ({
  id,
  name,
  description,
  logoUrl,
  color = 'bg-accent',
  selected = false,
  disabled = false,
  onSelect,
}: PartyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleSelect = () => {
    if (!disabled) {
      onSelect?.(id);
    }
  };

  // Create a contrasting border color for the selected state
  const borderColor = selected ? color : 'transparent';
  
  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300',
        selected ? 'ring-2 ring-offset-2' : 'hover:shadow-md',
        disabled && 'opacity-60 cursor-not-allowed',
        isHovered && !disabled && !selected && 'transform scale-[1.02]'
      )}
      style={{ 
        borderColor,
        ringColor: selected ? color : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div 
          className="h-24 flex items-center justify-center"
          style={{ background: color }}
        >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={`${name} logo`} 
              className="h-14 w-auto object-contain"
            />
          ) : (
            <div className="text-white font-bold text-2xl">
              {name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-lg">{name}</h3>
            {selected && (
              <div className="bg-green-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            {description}
          </p>
          
          <Button 
            variant={selected ? "default" : "outline"} 
            className="w-full"
            disabled={disabled}
            onClick={handleSelect}
          >
            {selected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartyCard;
