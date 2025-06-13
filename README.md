# Custom WYSIWYG Editor Component

A flexible, reusable WYSIWYG editor component built with React, TypeScript, and native contentEditable - no external dependencies required!

## Features

- ✅ **Controlled/Uncontrolled modes**: Supports both controlled and uncontrolled behavior
- ✅ **Rich text formatting**: Bold, italic, underline support
- ✅ **Keyboard shortcuts**: Ctrl+B, Ctrl+I, Ctrl+U for formatting
- ✅ **Customizable toolbar**: Replace or extend the default toolbar
- ✅ **Async operations**: Load and save content asynchronously
- ✅ **TypeScript**: Full type safety and IntelliSense support
- ✅ **Accessibility**: ARIA attributes and keyboard navigation
- ✅ **Responsive design**: Works on desktop and mobile
- ✅ **No dependencies**: Built with native contentEditable and React

## Installation

No external dependencies required! Just copy the component files to your project.

## Quick Start

### Controlled Mode
```tsx
import { useState } from 'react'
import { WYSIWYGEditor, EditorState } from './components/wysiwyg-editor'

function App() {
  const [editorState, setEditorState] = useState<EditorState>({
    content: '',
    selection: { start: 0, end: 0 }
  })

  return (
    <WYSIWYGEditor
      value={editorState}
      onChange={setEditorState}
      placeholder="Start typing..."
    />
  )
}
```

### Uncontrolled Mode
```tsx
import { WYSIWYGEditor, EditorState } from './components/wysiwyg-editor'

function App() {
  const defaultValue: EditorState = {
    content: 'Default <strong>content</strong>',
    selection: { start: 0, end: 0 }
  }

  return (
    <WYSIWYGEditor
      defaultValue={defaultValue}
      placeholder="Start typing..."
    />
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `EditorState` | - | Editor state for controlled mode |
| `defaultValue` | `EditorState` | `{ content: '', selection: { start: 0, end: 0 } }` | Initial editor state for uncontrolled mode |
| `onChange` | `(editorState: EditorState) => void` | - | Change handler for controlled mode |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `React.CSSProperties` | - | Inline styles |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `renderToolbar` | `(props: ToolbarProps) => ReactNode` | - | Custom toolbar renderer |
| `onAsyncLoad` | `() => Promise<any>` | - | Async content loader |
| `onAsyncSave` | `(content: any) => Promise<void>` | - | Async content saver |

### Types

```tsx
interface EditorState {
  content: string
  selection?: { start: number; end: number }
}

interface ToolbarProps {
  editorState: EditorState
  onToggleInlineStyle: (style: string) => void
  onToggleBlockType: (blockType: string) => void
}
```

## Advanced Usage

### Custom Toolbar

```tsx
const CustomToolbar = ({ editorState, onToggleInlineStyle }) => {
  return (
    <div className="custom-toolbar">
      <button onClick={() => onToggleInlineStyle('BOLD')}>
        Bold
      </button>
      <button onClick={() => onToggleInlineStyle('ITALIC')}>
        Italic
      </button>
    </div>
  )
}

<WYSIWYGEditor
  renderToolbar={(props) => <CustomToolbar {...props} />}
/>
```

### Async Operations

```tsx
const loadContent = async () => {
  const response = await fetch('/api/content')
  return response.json()
}

const saveContent = async (content) => {
  await fetch('/api/content', {
    method: 'POST',
    body: JSON.stringify(content)
  })
}

<WYSIWYGEditor
  onAsyncLoad={loadContent}
  onAsyncSave={saveContent}
/>
```

## Keyboard Shortcuts

- **Ctrl+B** (or Cmd+B): Toggle bold formatting
- **Ctrl+I** (or Cmd+I): Toggle italic formatting  
- **Ctrl+U** (or Cmd+U): Toggle underline formatting

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Implementation Details

This editor is built using:
- **contentEditable**: Native browser editing capabilities
- **HTML formatting**: Uses standard HTML tags for formatting
- **Selection API**: Browser's native selection handling
- **React Hooks**: Modern React patterns for state management
