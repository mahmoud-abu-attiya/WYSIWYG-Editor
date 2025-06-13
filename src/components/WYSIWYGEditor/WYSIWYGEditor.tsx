
import React, { useState, useCallback, useRef } from 'react';
import { 
  Editor as DraftEditor, 
  EditorState, 
  RichUtils, 
  getDefaultKeyBinding,
  KeyBindingUtil
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { cn } from '@/lib/utils';
import DefaultToolbar from './DefaultToolbar';

export interface WYSIWYGEditorProps {
  // Controlled mode props
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  
  // Uncontrolled mode props
  defaultValue?: EditorState;
  
  // Styling props
  className?: string;
  style?: React.CSSProperties;
  
  // Toolbar customization
  renderToolbar?: (props: ToolbarProps) => React.ReactNode;
  showToolbar?: boolean;
  
  // Editor props
  placeholder?: string;
  readOnly?: boolean;
  
  // Callbacks
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface ToolbarProps {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
  onToggleBlockType: (blockType: string) => void;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
  value,
  onChange,
  defaultValue,
  className,
  style,
  renderToolbar,
  showToolbar = true,
  placeholder = "Start typing...",
  readOnly = false,
  onBlur,
  onFocus,
}) => {
  // Determine if component is controlled
  const isControlled = value !== undefined && onChange !== undefined;
  
  // Internal state for uncontrolled mode
  const [internalEditorState, setInternalEditorState] = useState<EditorState>(
    () => defaultValue || EditorState.createEmpty()
  );
  
  // Get current editor state
  const editorState = isControlled ? value : internalEditorState;
  
  // Editor ref
  const editorRef = useRef<DraftEditor | null>(null);
  
  // Handle editor state changes
  const handleEditorChange = useCallback((newEditorState: EditorState) => {
    if (isControlled) {
      onChange(newEditorState);
    } else {
      setInternalEditorState(newEditorState);
    }
  }, [isControlled, onChange]);
  
  // Handle inline style toggle
  const handleToggleInlineStyle = useCallback((style: string) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
    handleEditorChange(newEditorState);
  }, [editorState, handleEditorChange]);
  
  // Handle block type toggle
  const handleToggleBlockType = useCallback((blockType: string) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, blockType);
    handleEditorChange(newEditorState);
  }, [editorState, handleEditorChange]);
  
  // Key binding function
  const keyBindingFn = useCallback((e: React.KeyboardEvent) => {
    if (KeyBindingUtil.hasCommandModifier(e)) {
      switch (e.key.toLowerCase()) {
        case 'b': // B
          return 'bold';
        case 'i': // I
          return 'italic';
        case 'u': // U
          return 'underline';
      }
    }
    return getDefaultKeyBinding(e);
  }, []);
  
  // Handle key commands
  const handleKeyCommand = useCallback((command: string, editorState: EditorState) => {
    let newState;
    
    switch (command) {
      case 'bold':
        newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
        break;
      case 'italic':
        newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
        break;
      case 'underline':
        newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
        break;
      default:
        newState = RichUtils.handleKeyCommand(editorState, command);
    }
    
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    
    return 'not-handled';
  }, [handleEditorChange]);
  
  // Focus editor
  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);
  
  // Toolbar props
  const toolbarProps: ToolbarProps = {
    editorState,
    onToggleInlineStyle: handleToggleInlineStyle,
    onToggleBlockType: handleToggleBlockType,
  };
  
  return (
    <div 
      className={cn(
        "wysiwyg-editor border border-border rounded-md overflow-hidden bg-background",
        className
      )}
      style={style}
    >
      {showToolbar && (
        <div className="border-b border-border">
          {renderToolbar ? renderToolbar(toolbarProps) : <DefaultToolbar {...toolbarProps} />}
        </div>
      )}
      
      <div 
        className="p-4 min-h-[200px] cursor-text"
        onClick={focusEditor}
      >
        <DraftEditor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          placeholder={placeholder}
          readOnly={readOnly}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};

export default WYSIWYGEditor;
