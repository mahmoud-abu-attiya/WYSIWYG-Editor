
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToolbarProps } from './WYSIWYGEditor';

const DefaultToolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  
  const formatButtons = [
    {
      style: 'BOLD',
      icon: Bold,
      label: 'Bold',
      shortcut: 'Ctrl+B',
    },
    {
      style: 'ITALIC',
      icon: Italic,
      label: 'Italic',
      shortcut: 'Ctrl+I',
    },
    {
      style: 'UNDERLINE',
      icon: Underline,
      label: 'Underline',
      shortcut: 'Ctrl+U',
    },
  ];
  
  return (
    <div className="flex items-center gap-1 p-2 bg-muted/50">
      {formatButtons.map(({ style, icon: Icon, label, shortcut }) => {
        const isActive = currentStyle.has(style);
        
        return (
          <Button
            key={style}
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onToggleInlineStyle(style)}
            title={`${label} (${shortcut})`}
            className={cn(
              "w-8 h-8 p-0",
              isActive && "bg-primary text-primary-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
          </Button>
        );
      })}
    </div>
  );
};

export default DefaultToolbar;
