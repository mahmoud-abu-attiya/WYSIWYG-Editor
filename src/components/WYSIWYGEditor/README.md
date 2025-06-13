
# WYSIWYG Editor Component

A flexible, reusable WYSIWYG editor built with React, TypeScript, and Draft.js that supports both controlled and uncontrolled modes.

## Features

- ✅ **Controlled & Uncontrolled Modes**: Supports both controlled (with `value` and `onChange`) and uncontrolled (internal state management) modes
- ✅ **TypeScript Support**: Fully typed with comprehensive interfaces
- ✅ **Customizable Toolbar**: Replace or extend the default toolbar using `renderToolbar` prop
- ✅ **Keyboard Shortcuts**: Built-in shortcuts for formatting (Ctrl+B, Ctrl+I, Ctrl+U)
- ✅ **Formatting Options**: Bold, Italic, and Underline styling
- ✅ **Async Operations**: Utilities for loading and saving content asynchronously
- ✅ **Modern React Patterns**: Uses functional components and hooks
- ✅ **Accessible**: Proper ARIA attributes and keyboard navigation

## Installation

```bash
npm install draft-js @types/draft-js
```

## Usage Examples

### Controlled Mode

```tsx
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { WYSIWYGEditor } from './components/WYSIWYGEditor';

const ControlledExample = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <WYSIWYGEditor
      value={editorState}
      onChange={setEditorState}
      placeholder="Start typing..."
    />
  );
};
```

### Uncontrolled Mode

```tsx
import React from 'react';
import { WYSIWYGEditor } from './components/WYSIWYGEditor';
import { createEditorStateFromText } from './components/WYSIWYGEditor/utils';

const UncontrolledExample = () => {
  return (
    <>
      {/* With default value */}
      <WYSIWYGEditor
        defaultValue={createEditorStateFromText("Default content")}
        placeholder="Edit this text..."
      />
      
      {/* Empty editor */}
      <WYSIWYGEditor placeholder="Start typing..." />
    </>
  );
};
```

### Custom Toolbar

```tsx
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { WYSIWYGEditor, ToolbarProps } from './components/WYSIWYGEditor';

const CustomToolbarExample = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const renderCustomToolbar = ({ editorState, onToggleInlineStyle }: ToolbarProps) => (
    <div className="custom-toolbar">
      <button onClick={() => onToggleInlineStyle('BOLD')}>
        Make Bold
      </button>
      <button onClick={() => onToggleInlineStyle('ITALIC')}>
        Make Italic
      </button>
    </div>
  );

  return (
    <WYSIWYGEditor
      value={editorState}
      onChange={setEditorState}
      renderToolbar={renderCustomToolbar}
    />
  );
};
```

### Async Operations

```tsx
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { WYSIWYGEditor } from './components/WYSIWYGEditor';
import { 
  fakeLoadContent, 
  fakeSaveContent, 
  createEditorStateFromRaw,
  getContentAsRaw 
} from './components/WYSIWYGEditor/utils';

const AsyncExample = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const loadContent = async () => {
    const content = await fakeLoadContent();
    const newEditorState = createEditorStateFromRaw(content);
    setEditorState(newEditorState);
  };

  const saveContent = async () => {
    const content = getContentAsRaw(editorState);
    await fakeSaveContent(content);
  };

  return (
    <div>
      <button onClick={loadContent}>Load Content</button>
      <button onClick={saveContent}>Save Content</button>
      <WYSIWYGEditor
        value={editorState}
        onChange={setEditorState}
      />
    </div>
  );
};
```

## API Reference

### WYSIWYGEditorProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `EditorState` | - | Editor state for controlled mode |
| `onChange` | `(editorState: EditorState) => void` | - | Change handler for controlled mode |
| `defaultValue` | `EditorState` | `EditorState.createEmpty()` | Default value for uncontrolled mode |
| `className` | `string` | - | Custom CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `renderToolbar` | `(props: ToolbarProps) => React.ReactNode` | - | Custom toolbar renderer |
| `showToolbar` | `boolean` | `true` | Show/hide toolbar |
| `placeholder` | `string` | `"Start typing..."` | Placeholder text |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `onBlur` | `() => void` | - | Blur event handler |
| `onFocus` | `() => void` | - | Focus event handler |

### ToolbarProps

| Prop | Type | Description |
|------|------|-------------|
| `editorState` | `EditorState` | Current editor state |
| `onToggleInlineStyle` | `(style: string) => void` | Toggle inline style function |
| `onToggleBlockType` | `(blockType: string) => void` | Toggle block type function |

## Utility Functions

### `createEditorStateFromText(text: string): EditorState`
Creates an editor state from plain text.

### `getPlainText(editorState: EditorState): string`
Extracts plain text from editor state.

### `getContentAsRaw(editorState: EditorState)`
Converts editor state to raw content format.

### `createEditorStateFromRaw(rawContent: any): EditorState`
Creates editor state from raw content.

### `isEmpty(editorState: EditorState): boolean`
Checks if editor state is empty.

### `fakeLoadContent(): Promise<any>`
Simulates loading content from an API (bonus feature).

### `fakeSaveContent(content: any): Promise<boolean>`
Simulates saving content to an API (bonus feature).

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Toggle Bold |
| `Ctrl+I` | Toggle Italic |
| `Ctrl+U` | Toggle Underline |

## Development

### Project Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Architecture

- **WYSIWYGEditor.tsx**: Main component with controlled/uncontrolled logic
- **DefaultToolbar.tsx**: Default toolbar implementation
- **utils.ts**: Utility functions for editor operations
- **Examples.tsx**: Comprehensive examples and documentation

### Dependencies

- **draft-js**: Core editor functionality
- **@types/draft-js**: TypeScript definitions
- **React 18+**: Modern React with hooks
- **TypeScript**: Type safety and better developer experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
6. Submit a pull request

## License

MIT License - see LICENSE file for details.
